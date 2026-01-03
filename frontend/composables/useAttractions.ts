import localforage from 'localforage';
import type { Attraction } from '~/types/attraction';

const DB_NAME = 'trento-attractions-db';
const STORE_NAME = 'attractions';

// Configure localforage
const db = localforage.createInstance({
  name: DB_NAME,
  storeName: STORE_NAME
});

export const useAttractions = () => {
  const attractions = useState<Attraction[]>('attractions', () => []);
  const loading = useState<boolean>('loading', () => false);
  const error = useState<string | null>('error', () => null);

  // Load all attractions from IndexedDB
  const loadAttractions = async () => {
    loading.value = true;
    error.value = null;
    try {
      const keys = await db.keys();
      const loadedAttractions: Attraction[] = [];
      
      for (const key of keys) {
        const attraction = await db.getItem<Attraction>(key);
        if (attraction) {
          loadedAttractions.push(attraction);
        }
      }
      
      // Sort by creation date (newest first)
      attractions.value = loadedAttractions.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (e) {
      error.value = 'Failed to load attractions';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  // Get single attraction by ID
  const getAttraction = async (id: string): Promise<Attraction | null> => {
    try {
      const attraction = await db.getItem<Attraction>(id);
      return attraction;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  // Add new attraction
  const addAttraction = async (attraction: Omit<Attraction, 'id' | 'createdAt' | 'updatedAt'>) => {
    loading.value = true;
    error.value = null;
    try {
      const newAttraction: Attraction = {
        ...attraction,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await db.setItem(newAttraction.id, newAttraction);
      attractions.value = [newAttraction, ...attractions.value];
      return newAttraction;
    } catch (e) {
      error.value = 'Failed to add attraction';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // Update existing attraction
  const updateAttraction = async (id: string, updates: Partial<Omit<Attraction, 'id' | 'createdAt'>>) => {
    loading.value = true;
    error.value = null;
    try {
      const existing = await db.getItem<Attraction>(id);
      if (!existing) {
        throw new Error('Attraction not found');
      }

      const updated: Attraction = {
        ...existing,
        ...updates,
        updatedAt: new Date()
      };

      await db.setItem(id, updated);
      
      const index = attractions.value.findIndex(a => a.id === id);
      if (index !== -1) {
        attractions.value[index] = updated;
      }
      
      return updated;
    } catch (e) {
      error.value = 'Failed to update attraction';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // Delete attraction
  const deleteAttraction = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await db.removeItem(id);
      attractions.value = attractions.value.filter(a => a.id !== id);
    } catch (e) {
      error.value = 'Failed to delete attraction';
      console.error(e);
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    attractions: readonly(attractions),
    loading: readonly(loading),
    error: readonly(error),
    loadAttractions,
    getAttraction,
    addAttraction,
    updateAttraction,
    deleteAttraction
  };
};
