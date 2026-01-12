import type { UserLocation, DistanceInfo } from '~/types/attraction';

export const useGeolocation = () => {
  const userLocation = useState<UserLocation | null>('userLocation', () => null);
  const isLoading = useState<boolean>('geoLoading', () => false);
  const error = useState<string | null>('geoError', () => null);

  // Oblicz odległość między dwoma punktami (wzór Haversine)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Promień Ziemi w km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Zaokrąglij do 1 miejsca po przecinku
  };

  const toRad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  // Oszacuj czas podróży (średnia prędkość: autostrada 90km/h, drogi lokalne 50km/h)
  const estimateDuration = (distance: number, fromHighway: boolean = false): number => {
    const avgSpeed = fromHighway ? 50 : 70; // km/h
    const hours = distance / avgSpeed;
    return Math.round(hours * 60); // w minutach
  };

  // Pobierz lokalizację użytkownika
  const getUserLocation = (): Promise<UserLocation> => {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        error.value = 'Geolocation not supported';
        reject(new Error('Geolocation not supported'));
        return;
      }

      isLoading.value = true;
      error.value = null;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: UserLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          userLocation.value = location;
          isLoading.value = false;
          resolve(location);
        },
        (err) => {
          isLoading.value = false;
          error.value = err.message;
          reject(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // Cache przez 5 minut
        }
      );
    });
  };

  // Oblicz odległość i czas do atrakcji
  const getDistanceToAttraction = async (
    attractionLat?: number,
    attractionLon?: number
  ): Promise<DistanceInfo | null> => {
    if (!attractionLat || !attractionLon) {
      return null;
    }

    try {
      let location = userLocation.value;
      
      if (!location) {
        location = await getUserLocation();
      }

      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        attractionLat,
        attractionLon
      );

      const duration = estimateDuration(distance);

      return {
        distance,
        duration,
      };
    } catch (err) {
      console.error('Error calculating distance:', err);
      return null;
    }
  };

  // Format odległości (km lub m)
  const formatDistance = (km: number): string => {
    if (km < 1) {
      return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(1)} km`;
  };

  // Format czasu (minuty lub godziny)
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  return {
    userLocation: readonly(userLocation),
    isLoading: readonly(isLoading),
    error: readonly(error),
    getUserLocation,
    getDistanceToAttraction,
    calculateDistance,
    formatDistance,
    formatDuration,
  };
};
