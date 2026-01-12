export default defineNuxtPlugin(async () => {
  if (import.meta.client) {
    const { syncAttractions, forceRefresh } = useAttractions();
    const { syncPendingSubmissions } = useSubmissions();
    
    // Initial sync from API to IndexedDB
    console.log('🚀 Initializing app data...');
    await syncAttractions();
    
    // Sync any pending offline submissions
    if (navigator.onLine) {
      const synced = await syncPendingSubmissions();
      if (synced > 0) {
        console.log(`✓ Synced ${synced} pending submissions`);
      }
    }
    
    // Listen for online event to re-sync
    window.addEventListener('online', async () => {
      console.log('🌐 Back online - syncing data...');
      await forceRefresh();
      await syncPendingSubmissions();
    });
  }
});
