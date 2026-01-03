<template>
  <div class="pb-20 md:pb-0">
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>

    <div v-else-if="!attraction" class="text-center py-12">
      <p class="text-xl text-gray-600 dark:text-gray-400">{{ $t('attractions.notFound') }}</p>
      <NuxtLink to="/" class="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
        {{ $t('attractions.back') }}
      </NuxtLink>
    </div>

    <div v-else class="max-w-4xl mx-auto">
      <div class="mb-6">
        <NuxtLink to="/" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>{{ $t('attractions.back') }}</span>
        </NuxtLink>
      </div>

      <div v-if="successMessage" class="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded mb-4">
        {{ successMessage }}
      </div>

      <div v-if="errorMessage" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
        {{ errorMessage }}
      </div>

      <div v-if="!isEditing" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ attraction.name }}</h1>
              <span 
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="attraction.type === 'museum' ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300' : 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'"
              >
                {{ $t(`form.${attraction.type}`) }}
              </span>
            </div>
            <div class="flex space-x-2">
              <button
                @click="isEditing = true"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {{ $t('attractions.edit') }}
              </button>
              <button
                @click="confirmDelete"
                class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                {{ $t('attractions.delete') }}
              </button>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Distance and Navigation Info -->
            <div v-if="distanceInfo" class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ $t('location.howToGet') }}</h3>
              <div class="space-y-3">
                <div class="flex items-center text-gray-700 dark:text-gray-300">
                  <span class="text-2xl mr-3">🚗</span>
                  <div>
                    <p class="font-semibold text-lg">{{ formatDistance(distanceInfo.distance) }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ $t('location.estimatedTime') }}: {{ formatDuration(distanceInfo.duration) }}</p>
                  </div>
                </div>
                
                <div v-if="attraction.autostradeExit" class="pt-3 border-t border-blue-200 dark:border-blue-700">
                  <div class="flex items-start">
                    <span class="text-xl mr-3">🛣️</span>
                    <div class="flex-1">
                      <p class="font-semibold text-gray-900 dark:text-white mb-1">{{ $t('location.highwayExit') }}:</p>
                      <p class="text-gray-700 dark:text-gray-300">{{ attraction.autostradeExit }}</p>
                      <p v-if="attraction.distanceFromExit" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {{ $t('location.additionalDistance') }}: {{ attraction.distanceFromExit }} km {{ $t('location.fromExit') }}
                        ({{ $t('location.approx') }} {{ Math.round(attraction.distanceFromExit / 50 * 60) }} min)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Route Map Section -->
            <div v-if="distanceInfo && attraction.latitude && attraction.longitude" class="mt-6">
              <button
                @click="showRouteMap = !showRouteMap"
                class="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {{ showRouteMap ? $t('location.hideRoute') : $t('location.showRoute') }}
              </button>
              
              <div v-if="showRouteMap" class="mt-4">
                <ClientOnly>
                  <RouteMap 
                    :attraction="attraction" 
                    :distanceInfo="distanceInfo"
                    :userLocation="userLocation"
                  />
                </ClientOnly>
              </div>
            </div>
            
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $t('form.description') }}</h2>
              <p class="text-gray-600 dark:text-gray-400">{{ attraction.description }}</p>
            </div>

            <div v-if="attraction.address">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $t('form.address') }}</h2>
              <p class="text-gray-600 dark:text-gray-400 flex items-start">
                <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ attraction.address }}
              </p>
            </div>

            <div v-if="attraction.phone">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $t('form.phone') }}</h2>
              <p class="text-gray-600 dark:text-gray-400 flex items-center">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a :href="`tel:${attraction.phone}`" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">{{ attraction.phone }}</a>
              </p>
            </div>

            <div v-if="attraction.website">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $t('form.website') }}</h2>
              <p class="text-gray-600 dark:text-gray-400 flex items-center">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a :href="attraction.website" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">{{ attraction.website }}</a>
              </p>
            </div>

            <div v-if="attraction.openingHours">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $t('form.opening_hours') }}</h2>
              <p class="text-gray-600 dark:text-gray-400 flex items-center">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ attraction.openingHours }}
              </p>
            </div>

            <div v-if="attraction.price">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $t('form.price') }}</h2>
              <p class="text-gray-600 dark:text-gray-400 flex items-center">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ attraction.price }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Form -->
      <form v-else @submit.prevent="handleUpdate" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ $t('attractions.edit') }}</h2>

        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('form.name') }} <span class="text-red-500">*</span>
          </label>
          <input
            id="name"
            v-model="editForm.name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            :placeholder="$t('form.name_placeholder')"
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('form.description') }} <span class="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            v-model="editForm.description"
            required
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            :placeholder="$t('form.description_placeholder')"
          />
        </div>

        <!-- Type -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('form.type') }} <span class="text-red-500">*</span>
          </label>
          <select
            id="type"
            v-model="editForm.type"
            required
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="museum">{{ $t('form.museum') }}</option>
            <option value="experience">{{ $t('form.experience') }}</option>
          </select>
        </div>

        <!-- Address -->
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('form.address') }} <span class="text-red-500">*</span>
          </label>
          <input
            id="address"
            v-model="editForm.address"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            :placeholder="$t('form.address_placeholder')"
          />
        </div>

        <!-- Phone -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('form.phone') }}
          </label>
          <input
            id="phone"
            v-model="editForm.phone"
            type="tel"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            :placeholder="$t('form.phone_placeholder')"
          />
        </div>

        <!-- Website -->
        <div>
          <label for="website" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('form.website') }}
          </label>
          <input
            id="website"
            v-model="editForm.website"
            type="url"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            :placeholder="$t('form.website_placeholder')"
          />
        </div>

        <!-- Opening Hours -->
        <div>
          <label for="openingHours" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('form.opening_hours') }}
          </label>
          <input
            id="openingHours"
            v-model="editForm.openingHours"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            :placeholder="$t('form.opening_hours_placeholder')"
          />
        </div>

        <!-- Price -->
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('form.price') }}
          </label>
          <input
            id="price"
            v-model="editForm.price"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            :placeholder="$t('form.price_placeholder')"
          />
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
          <button
            type="button"
            @click="cancelEdit"
            class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {{ $t('form.cancel') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Attraction } from '~/types/attraction';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { getAttraction, updateAttraction, deleteAttraction, loading } = useAttractions();
const { getDistanceToAttraction, formatDistance, formatDuration, getUserLocation, userLocation } = useGeolocation();

const attraction = ref<Attraction | null>(null);
const isEditing = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const distanceInfo = ref<{ distance: number; duration: number } | null>(null);
const showRouteMap = ref(false);

const editForm = reactive({
  name: '',
  description: '',
  type: 'museum' as 'museum' | 'experience',
  address: '',
  phone: '',
  website: '',
  openingHours: '',
  price: ''
});

const loadAttraction = async () => {
  const id = route.params.id as string;
  attraction.value = await getAttraction(id);
  
  if (attraction.value) {
    editForm.name = attraction.value.name;
    editForm.description = attraction.value.description;
    editForm.type = attraction.value.type;
    editForm.address = attraction.value.address;
    editForm.phone = attraction.value.phone || '';
    editForm.website = attraction.value.website || '';
    editForm.openingHours = attraction.value.openingHours || '';
    editForm.price = attraction.value.price || '';
    
    // Calculate distance
    if (attraction.value.latitude && attraction.value.longitude) {
      try {
        await getUserLocation();
        distanceInfo.value = await getDistanceToAttraction(
          attraction.value.latitude,
          attraction.value.longitude
        );
      } catch (error) {
        console.log('Geolocation not available');
      }
    }
  }
};

const handleUpdate = async () => {
  if (!attraction.value) return;
  
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const updated = await updateAttraction(attraction.value.id, {
      name: editForm.name,
      description: editForm.description,
      type: editForm.type,
      address: editForm.address,
      phone: editForm.phone || undefined,
      website: editForm.website || undefined,
      openingHours: editForm.openingHours || undefined,
      price: editForm.price || undefined
    });

    attraction.value = updated;
    isEditing.value = false;
    successMessage.value = t('messages.updated');
  } catch (error) {
    errorMessage.value = t('messages.error');
  }
};

const cancelEdit = () => {
  if (attraction.value) {
    editForm.name = attraction.value.name;
    editForm.description = attraction.value.description;
    editForm.type = attraction.value.type;
    editForm.address = attraction.value.address;
    editForm.phone = attraction.value.phone || '';
    editForm.website = attraction.value.website || '';
    editForm.openingHours = attraction.value.openingHours || '';
    editForm.price = attraction.value.price || '';
  }
  isEditing.value = false;
  errorMessage.value = '';
};

const confirmDelete = () => {
  if (confirm(t('attractions.confirm_delete'))) {
    handleDelete();
  }
};

const handleDelete = async () => {
  if (!attraction.value) return;

  try {
    await deleteAttraction(attraction.value.id);
    router.push('/');
  } catch (error) {
    errorMessage.value = t('messages.error');
  }
};

onMounted(() => {
  loadAttraction();
});
</script>
