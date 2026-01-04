<template>
  <div class="pb-20 md:pb-0">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">{{ $t('submissions.title') }}</h1>
      
      <p class="text-gray-600 dark:text-gray-400 mb-6">{{ $t('submissions.description') }}</p>

      <!-- Offline notice -->
      <div v-if="!isOnline" class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
        </svg>
        <span>{{ $t('offline.submissionNote') }}</span>
      </div>

      <div v-if="successMessage" :class="[
        'px-4 py-3 rounded-lg mb-4',
        pendingOffline 
          ? 'bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-400' 
          : 'bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400'
      ]">
        <div class="flex items-center">
          <svg v-if="pendingOffline" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ successMessage }}
        </div>
      </div>

      <div v-if="errorMessage" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('form.name') }} <span class="text-red-500">*</span>
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="$t('form.name_placeholder')"
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('form.description') }} <span class="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            v-model="form.description"
            required
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="$t('form.description_placeholder')"
          />
        </div>

        <!-- Type -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('form.type') }} <span class="text-red-500">*</span>
          </label>
          <select
            id="type"
            v-model="form.type"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="museum">{{ $t('form.museum') }}</option>
            <option value="experience">{{ $t('form.experience') }}</option>
          </select>
        </div>

        <!-- Address -->
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('form.address') }} <span class="text-red-500">*</span>
          </label>
          <input
            id="address"
            v-model="form.address"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="$t('form.address_placeholder')"
          />
        </div>

        <!-- Phone -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('form.phone') }}
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="$t('form.phone_placeholder')"
          />
        </div>

        <!-- Website -->
        <div>
          <label for="website" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('form.website') }}
          </label>
          <input
            id="website"
            v-model="form.website"
            type="url"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="$t('form.website_placeholder')"
          />
        </div>

        <!-- Opening Hours -->
        <div>
          <label for="openingHours" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('form.opening_hours') }}
          </label>
          <input
            id="openingHours"
            v-model="form.openingHours"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="$t('form.opening_hours_placeholder')"
          />
        </div>

        <!-- Price -->
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('form.price') }}
          </label>
          <input
            id="price"
            v-model="form.price"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :placeholder="$t('form.price_placeholder')"
          />
        </div>

        <!-- Location & Highway Info Section -->
        <div class="pt-4 border-t border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('form.locationInfo') }}</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Latitude -->
            <div>
              <label for="latitude" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('form.latitude') }}
              </label>
              <input
                id="latitude"
                v-model.number="form.latitude"
                type="number"
                step="0.000001"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="46.0679"
              />
            </div>
            
            <!-- Longitude -->
            <div>
              <label for="longitude" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('form.longitude') }}
              </label>
              <input
                id="longitude"
                v-model.number="form.longitude"
                type="number"
                step="0.000001"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="11.1211"
              />
            </div>
          </div>

          <!-- Highway Exit -->
          <div class="mt-4">
            <label for="autostradeExit" class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('form.autostradeExit') }}
            </label>
            <input
              id="autostradeExit"
              v-model="form.autostradeExit"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('form.autostradeExitPlaceholder')"
            />
          </div>

          <!-- Distance from Exit -->
          <div class="mt-4">
            <label for="distanceFromExit" class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('form.distanceFromExit') }}
            </label>
            <input
              id="distanceFromExit"
              v-model.number="form.distanceFromExit"
              type="number"
              step="0.1"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('form.distanceFromExitPlaceholder')"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4">
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Saving...' : $t('form.save') }}
          </button>
          <NuxtLink
            to="/"
            class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-center"
          >
            {{ $t('form.cancel') }}
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { submitAttraction, submitting } = useSubmissions();
const { isOnline } = useOnlineStatus();
const { t } = useI18n();
const router = useRouter();

const form = reactive({
  name: '',
  description: '',
  type: 'museum' as 'museum' | 'experience',
  address: '',
  phone: '',
  website: '',
  openingHours: '',
  price: '',
  latitude: undefined as number | undefined,
  longitude: undefined as number | undefined,
  autostradeExit: '',
  distanceFromExit: undefined as number | undefined,
  submitterEmail: '',
  submitterName: ''
});

const successMessage = ref('');
const errorMessage = ref('');
const pendingOffline = ref(false);

const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  pendingOffline.value = false;

  const result = await submitAttraction({
    name: form.name,
    description: form.description,
    type: form.type,
    address: form.address,
    phone: form.phone || undefined,
    website: form.website || undefined,
    openingHours: form.openingHours || undefined,
    price: form.price || undefined,
    latitude: form.latitude,
    longitude: form.longitude,
    autostradeExit: form.autostradeExit || undefined,
    distanceFromExit: form.distanceFromExit,
    submitterEmail: form.submitterEmail || undefined,
    submitterName: form.submitterName || undefined
  });

  if (result.success) {
    successMessage.value = result.message;
    pendingOffline.value = result.pendingOffline || false;
    
    // Reset form
    form.name = '';
    form.description = '';
    form.type = 'museum';
    form.address = '';
    form.phone = '';
    form.website = '';
    form.openingHours = '';
    form.price = '';
    form.latitude = undefined;
    form.longitude = undefined;
    form.autostradeExit = '';
    form.distanceFromExit = undefined;
    form.submitterEmail = '';
    form.submitterName = '';

    // Redirect to home after delay (longer if offline to let user read message)
    setTimeout(() => {
      router.push('/');
    }, result.pendingOffline ? 3000 : 1500);
  } else {
    errorMessage.value = result.message;
  }
};

// Computed for loading state
const loading = computed(() => submitting.value);
</script>
