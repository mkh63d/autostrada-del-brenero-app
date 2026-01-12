import localforage from 'localforage';

const DB_NAME = 'autostrada-submissions-db';
const STORE_NAME = 'pending-submissions';

// Store for offline submissions queue
const pendingDb = localforage.createInstance({
  name: DB_NAME,
  storeName: STORE_NAME
});

export interface SubmissionData {
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
  submitterEmail?: string;
  submitterName?: string;
}

export interface SubmissionResult {
  success: boolean;
  submissionId?: number;
  message: string;
  pendingOffline?: boolean;
}

export interface PendingSubmission {
  id: string;
  data: SubmissionData;
  createdAt: string;
  retryCount: number;
}

export const useSubmissions = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl || 'http://localhost:8000/api';
  
  const submitting = useState<boolean>('submitting', () => false);
  const pendingCount = useState<number>('pendingSubmissions', () => 0);

  /**
   * Submit attraction to backend API
   */
  const submitAttraction = async (data: SubmissionData): Promise<SubmissionResult> => {
    submitting.value = true;

    try {
      if (!navigator.onLine) {
        // Offline: queue for later
        await queueOfflineSubmission(data);
        return {
          success: true,
          message: 'Submission saved offline. It will be sent when you\'re back online.',
          pendingOffline: true,
        };
      }

      // Online: submit to API
      const response = await fetch(`${apiUrl}/submissions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          type: data.type,
          address: data.address,
          phone: data.phone || null,
          website: data.website || null,
          opening_hours: data.openingHours || null,
          price: data.price || null,
          latitude: data.latitude || null,
          longitude: data.longitude || null,
          autostrade_exit: data.autostradeExit || null,
          distance_from_exit: data.distanceFromExit || null,
          submitter_email: data.submitterEmail || null,
          submitter_name: data.submitterName || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Submission failed: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        submissionId: result.submission_id,
        message: 'Attraction submitted successfully! It will be reviewed by our team.',
      };
    } catch (error) {
      console.error('Submission error:', error);
      
      // If network error, queue offline
      if (error instanceof TypeError && error.message.includes('fetch')) {
        await queueOfflineSubmission(data);
        return {
          success: true,
          message: 'Submission saved offline. It will be sent when you\'re back online.',
          pendingOffline: true,
        };
      }
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit attraction',
      };
    } finally {
      submitting.value = false;
    }
  };

  /**
   * Queue submission for later (when offline)
   */
  const queueOfflineSubmission = async (data: SubmissionData) => {
    const pending: PendingSubmission = {
      id: `pending_${Date.now()}`,
      data,
      createdAt: new Date().toISOString(),
      retryCount: 0,
    };
    
    await pendingDb.setItem(pending.id, pending);
    await updatePendingCount();
    console.log('📴 Submission queued for offline sync:', pending.id);
  };

  /**
   * Sync all pending offline submissions
   */
  const syncPendingSubmissions = async (): Promise<number> => {
    if (!navigator.onLine) return 0;

    const keys = await pendingDb.keys();
    let synced = 0;

    for (const key of keys) {
      const pending = await pendingDb.getItem<PendingSubmission>(key);
      if (!pending) continue;

      try {
        const result = await submitAttraction(pending.data);
        if (result.success && !result.pendingOffline) {
          await pendingDb.removeItem(key);
          synced++;
          console.log('✓ Synced pending submission:', key);
        }
      } catch (error) {
        console.warn('Failed to sync pending submission:', key, error);
        // Update retry count
        pending.retryCount++;
        await pendingDb.setItem(key, pending);
      }
    }

    await updatePendingCount();
    return synced;
  };

  /**
   * Get count of pending offline submissions
   */
  const updatePendingCount = async () => {
    const keys = await pendingDb.keys();
    pendingCount.value = keys.length;
  };

  /**
   * Check submission status
   */
  const checkSubmissionStatus = async (submissionId: number): Promise<any> => {
    const response = await fetch(`${apiUrl}/submissions/${submissionId}/status/`);
    if (!response.ok) {
      throw new Error('Failed to check submission status');
    }
    return await response.json();
  };

  // Initialize pending count
  if (import.meta.client) {
    updatePendingCount();
  }

  return {
    submitting: readonly(submitting),
    pendingCount: readonly(pendingCount),
    submitAttraction,
    syncPendingSubmissions,
    checkSubmissionStatus,
    updatePendingCount,
  };
};
