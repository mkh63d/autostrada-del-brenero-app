import localforage from 'localforage';
import type { Attraction } from '~/types/attraction';

const DB_NAME = 'autostrada-attractions-db';
const STORE_NAME = 'attractions';
const SYNC_META_KEY = '__sync_metadata__';

// Configure localforage for attractions cache
const db = localforage.createInstance({
  name: DB_NAME,
  storeName: STORE_NAME
});

interface SyncMetadata {
  lastSyncTime: string;
  syncedFromApi: boolean;
}

export const useAttractions = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl || 'http://localhost:8000/api';
  
  const attractions = useState<Attraction[]>('attractions', () => []);
  const loading = useState<boolean>('attractionsLoading', () => false);
  const error = useState<string | null>('attractionsError', () => null);
  const isSynced = useState<boolean>('isSynced', () => false);

  /**
   * Fetch attractions from the backend API
   */
  const fetchFromApi = async (): Promise<Attraction[]> => {
    const response = await fetch(`${apiUrl}/attractions/`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    
    // Handle paginated or direct array response
    const results = data.results || data;
    
    // Map API response to frontend Attraction type
    return results.map((item: any) => ({
      id: String(item.id),
      name: item.name,
      description: item.description,
      type: item.type,
      address: item.address,
      phone: item.phone || undefined,
      website: item.website || undefined,
      openingHours: item.opening_hours || undefined,
      price: item.price || undefined,
      latitude: item.latitude ? parseFloat(item.latitude) : undefined,
      longitude: item.longitude ? parseFloat(item.longitude) : undefined,
      autostradeExit: item.autostrade_exit || undefined,
      distanceFromExit: item.distance_from_exit ? parseFloat(item.distance_from_exit) : undefined,
      featured: item.featured || false,
      createdAt: new Date(item.created_at),
      updatedAt: new Date(item.updated_at),
    }));
  };

  /**
   * Save attractions to IndexedDB for offline use
   */
  const saveToLocalDb = async (attractionsList: Attraction[]) => {
    // Clear existing data
    await db.clear();
    
    // Save each attraction
    for (const attraction of attractionsList) {
      await db.setItem(attraction.id, attraction);
    }
    
    // Save sync metadata
    const metadata: SyncMetadata = {
      lastSyncTime: new Date().toISOString(),
      syncedFromApi: true,
    };
    await db.setItem(SYNC_META_KEY, metadata);
  };

  /**
   * Load attractions from IndexedDB (offline fallback)
   */
  const loadFromLocalDb = async (): Promise<Attraction[]> => {
    const keys = await db.keys();
    const loadedAttractions: Attraction[] = [];
    
    for (const key of keys) {
      if (key === SYNC_META_KEY) continue;
      const attraction = await db.getItem<Attraction>(key);
      if (attraction) {
        loadedAttractions.push(attraction);
      }
    }
    
    return loadedAttractions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  /**
   * Get sync metadata
   */
  const getSyncMetadata = async (): Promise<SyncMetadata | null> => {
    return await db.getItem<SyncMetadata>(SYNC_META_KEY);
  };

  /**
   * Sync attractions from API to local IndexedDB
   * Falls back to local data if offline
   */
  const syncAttractions = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (navigator.onLine) {
        // Online: fetch from API and cache locally
        console.log('🌐 Syncing attractions from API...');
        const apiAttractions = await fetchFromApi();
        await saveToLocalDb(apiAttractions);
        attractions.value = apiAttractions;
        isSynced.value = true;
        console.log(`✓ Synced ${apiAttractions.length} attractions from API`);
      } else {
        // Offline: load from local cache
        console.log('📴 Offline - loading from local cache...');
        const localAttractions = await loadFromLocalDb();
        attractions.value = localAttractions;
        isSynced.value = false;
        console.log(`✓ Loaded ${localAttractions.length} attractions from cache`);
      }
    } catch (e) {
      console.warn('API sync failed, falling back to local cache:', e);
      
      // Fallback to local cache on API error
      try {
        const localAttractions = await loadFromLocalDb();
        attractions.value = localAttractions;
        isSynced.value = false;
        
        if (localAttractions.length === 0) {
          error.value = 'Unable to load attractions. Please check your connection.';
        }
      } catch (localError) {
        error.value = 'Failed to load attractions';
        console.error(localError);
      }
    } finally {
      loading.value = false;
    }
  };

  /**
   * Get single attraction by ID (from local state or IndexedDB)
   */
  const getAttraction = async (id: string): Promise<Attraction | null> => {
    // First check in-memory state
    const found = attractions.value.find(a => a.id === id);
    if (found) return found;
    
    // Fallback to IndexedDB
    try {
      const attraction = await db.getItem<Attraction>(id);
      return attraction;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  /**
   * Force refresh from API (when back online)
   */
  const forceRefresh = async () => {
    if (navigator.onLine) {
      await syncAttractions();
    }
  };

  return {
    attractions: readonly(attractions),
    loading: readonly(loading),
    error: readonly(error),
    isSynced: readonly(isSynced),
    syncAttractions,
    getAttraction,
    getSyncMetadata,
    forceRefresh,
  };
};
