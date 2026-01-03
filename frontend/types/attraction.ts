export interface Attraction {
  id: string;
  name: string;
  description: string;
  type: 'museum' | 'experience';
  address: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  price?: string;
  latitude?: number;
  longitude?: number;
  autostradeExit?: string;
  distanceFromExit?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface DistanceInfo {
  distance: number;
  duration: number;
}
