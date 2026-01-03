<template>
  <div class="pb-20 md:pb-0">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ $t('attractions.title') }}</h1>
      <NuxtLink 
        to="/add" 
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>{{ $t('attractions.add') }}</span>
      </NuxtLink>
    </div>

    <!-- Filter and Sort Controls -->
    <div class="mb-6 space-y-4">
      <!-- Search -->
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('attractions.search_placeholder')"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
      
      <!-- Filter and Sort Row -->
      <div class="flex flex-col sm:flex-row gap-3">
        <!-- Type Filter -->
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600 dark:text-gray-400">{{ $t('attractions.filter_type') }}:</span>
          <div class="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <button
              @click="filterType = 'all'"
              class="px-3 py-1.5 text-sm font-medium transition-colors"
              :class="filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              {{ $t('attractions.all') }}
            </button>
            <button
              @click="filterType = 'museum'"
              class="px-3 py-1.5 text-sm font-medium transition-colors border-l border-gray-300 dark:border-gray-600"
              :class="filterType === 'museum' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              {{ $t('form.museum') }}
            </button>
            <button
              @click="filterType = 'experience'"
              class="px-3 py-1.5 text-sm font-medium transition-colors border-l border-gray-300 dark:border-gray-600"
              :class="filterType === 'experience' ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            >
              {{ $t('form.experience') }}
            </button>
          </div>
        </div>
        
        <!-- Sort -->
        <div class="flex items-center space-x-2 sm:ml-auto">
          <span class="text-sm text-gray-600 dark:text-gray-400">{{ $t('attractions.sort_by') }}:</span>
          <select
            v-model="sortBy"
            class="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name-asc">{{ $t('attractions.sort_name_asc') }}</option>
            <option value="name-desc">{{ $t('attractions.sort_name_desc') }}</option>
            <option value="distance-asc">{{ $t('attractions.sort_distance_asc') }}</option>
            <option value="distance-desc">{{ $t('attractions.sort_distance_desc') }}</option>
          </select>
        </div>
      </div>
      
      <!-- Results count -->
      <p v-if="!loading && filteredAttractions.length > 0" class="text-sm text-gray-500 dark:text-gray-400">
        {{ $t('attractions.showing_results', { count: filteredAttractions.length, total: attractions.length }) }}
      </p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else-if="attractions.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">{{ $t('attractions.no_attractions') }}</p>
      <NuxtLink 
        to="/add" 
        class="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {{ $t('attractions.add') }}
      </NuxtLink>
    </div>

    <!-- No results after filtering -->
    <div v-else-if="filteredAttractions.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">{{ $t('attractions.no_results') }}</p>
      <button 
        @click="clearFilters"
        class="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
      >
        {{ $t('attractions.clear_filters') }}
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="attraction in filteredAttractions"
        :key="attraction.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ attraction.name }}</h2>
            <span 
              class="px-3 py-1 rounded-full text-xs font-medium"
              :class="attraction.type === 'museum' ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300' : 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'"
            >
              {{ $t(`form.${attraction.type}`) }}
            </span>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ attraction.description }}</p>
          
          <!-- Distance and Highway Info -->
          <div v-if="getAttractionDistance(attraction.id)" class="mb-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
            <div class="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-1">
              <span class="mr-2">📍</span>
              <span class="font-semibold">{{ formatDistance(getAttractionDistance(attraction.id)!.distance) }}</span>
              <span class="mx-2">•</span>
              <span class="text-gray-600 dark:text-gray-400">{{ formatDuration(getAttractionDistance(attraction.id)!.duration) }}</span>
            </div>
            <div v-if="attraction.autostradeExit" class="text-xs text-gray-600 dark:text-gray-400 mt-1">
              <span class="mr-1">🛣️</span>
              <span class="font-medium">{{ $t('location.exit') }}:</span> {{ attraction.autostradeExit }}
              <span v-if="attraction.distanceFromExit" class="ml-2">
                (+{{ attraction.distanceFromExit }} km {{ $t('location.fromExit') }})
              </span>
            </div>
          </div>
          
          <div class="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div v-if="attraction.address" class="flex items-start">
              <svg class="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ attraction.address }}</span>
            </div>
            
            <div v-if="attraction.phone" class="flex items-center">
              <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{{ attraction.phone }}</span>
            </div>
            
            <div v-if="attraction.price" class="flex items-center">
              <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ attraction.price }}</span>
            </div>
          </div>
          
          <NuxtLink 
            :to="`/attraction/${attraction.id}`"
            class="block w-full text-center bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            {{ $t('attractions.view_details') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { attractions, loading, error, loadAttractions } = useAttractions();
const { getUserLocation, getDistanceToAttraction, formatDistance, formatDuration, userLocation } = useGeolocation();

const attractionDistances = ref<Map<string, { distance: number; duration: number }>>(new Map());

// Filter and sort state
const searchQuery = ref('');
const filterType = ref<'all' | 'museum' | 'experience'>('all');
const sortBy = ref<'name-asc' | 'name-desc' | 'distance-asc' | 'distance-desc'>('name-asc');

onMounted(async () => {
  await loadAttractions();
  try {
    await getUserLocation();
    for (const attraction of attractions.value) {
      if (attraction.id && attraction.latitude && attraction.longitude) {
        const distanceInfo = await getDistanceToAttraction(attraction.latitude, attraction.longitude);
        if (distanceInfo) {
          attractionDistances.value.set(attraction.id, distanceInfo);
        }
      }
    }
  } catch (error) {
    console.log('Geolocation not available');
  }
});

const getAttractionDistance = (attractionId: string) => {
  return attractionDistances.value.get(attractionId);
};

// Filtered and sorted attractions
const filteredAttractions = computed(() => {
  let result = [...attractions.value];
  
  // Text search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(a => 
      a.name.toLowerCase().includes(query) ||
      a.description?.toLowerCase().includes(query) ||
      a.address?.toLowerCase().includes(query)
    );
  }
  
  // Type filter
  if (filterType.value !== 'all') {
    result = result.filter(a => a.type === filterType.value);
  }
  
  // Sorting
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'distance-asc': {
        const distA = getAttractionDistance(a.id!)?.distance ?? Infinity;
        const distB = getAttractionDistance(b.id!)?.distance ?? Infinity;
        return distA - distB;
      }
      case 'distance-desc': {
        const distA = getAttractionDistance(a.id!)?.distance ?? -Infinity;
        const distB = getAttractionDistance(b.id!)?.distance ?? -Infinity;
        return distB - distA;
      }
      default:
        return 0;
    }
  });
  
  return result;
});

// Clear all filters
const clearFilters = () => {
  searchQuery.value = '';
  filterType.value = 'all';
  sortBy.value = 'name-asc';
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
