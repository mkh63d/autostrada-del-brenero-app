/**
 * Composable for tracking online/offline status
 */
export const useOnlineStatus = () => {
  const isOnline = useState<boolean>('isOnline', () => true);
  const wasOffline = useState<boolean>('wasOffline', () => false);
  const lastSyncTime = useState<Date | null>('lastSyncTime', () => null);

  const updateOnlineStatus = () => {
    const online = navigator.onLine;
    
    // Track if we were offline (to show "back online" message)
    if (!isOnline.value && online) {
      wasOffline.value = true;
      // Reset wasOffline after 5 seconds
      setTimeout(() => {
        wasOffline.value = false;
      }, 5000);
    }
    
    isOnline.value = online;
  };

  const setLastSyncTime = (time: Date) => {
    lastSyncTime.value = time;
  };

  // Initialize listeners on client side
  if (import.meta.client) {
    onMounted(() => {
      updateOnlineStatus();
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    });

    onUnmounted(() => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    });
  }

  return {
    isOnline: readonly(isOnline),
    wasOffline: readonly(wasOffline),
    lastSyncTime: readonly(lastSyncTime),
    setLastSyncTime,
  };
};

export default useOnlineStatus;
