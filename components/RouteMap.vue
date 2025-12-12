<template>
  <div class="route-map-container">
    <div v-if="!userLocation" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <p class="text-sm text-yellow-800">{{ $t('location.enableLocation') }}</p>
      <button
        @click="requestLocation"
        class="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
      >
        {{ $t('location.allowLocation') }}
      </button>
    </div>

    <div v-else class="space-y-4">
      <!-- Route Info Card -->
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-900">{{ $t('location.yourRoute') }}</h3>
          <span class="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
            {{ formatDistance(distanceInfo.distance) }}
          </span>
        </div>
        
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-gray-600 mb-1">{{ $t('location.estimatedTime') }}:</p>
            <p class="font-semibold text-gray-900">{{ formatDuration(distanceInfo.duration) }}</p>
          </div>
          <div v-if="attraction.autostradeExit">
            <p class="text-gray-600 mb-1">{{ $t('location.highwayExit') }}:</p>
            <p class="font-semibold text-gray-900 text-xs">{{ attraction.autostradeExit }}</p>
          </div>
        </div>
      </div>

      <!-- Map Container -->
      <div class="relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200" style="height: 400px;">
        <iframe
          :src="mapUrl"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full h-full"
        ></iframe>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <a
          :href="googleMapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          {{ $t('location.openInGoogleMaps') }}
        </a>
        
        <a
          :href="wazeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          {{ $t('location.openInWaze') }}
        </a>
      </div>

      <!-- Route Instructions -->
      <div class="bg-white rounded-lg border border-gray-200 p-4">
        <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ $t('location.directions') }}
        </h4>
        <ol class="space-y-2 text-sm text-gray-700">
          <li class="flex items-start">
            <span class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</span>
            <span>{{ $t('location.step1') }}</span>
          </li>
          <li v-if="attraction.autostradeExit" class="flex items-start">
            <span class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</span>
            <span>{{ $t('location.step2', { exit: attraction.autostradeExit }) }}</span>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">{{ attraction.autostradeExit ? '3' : '2' }}</span>
            <span>{{ $t('location.step3', { address: attraction.address }) }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Attraction } from '~/types/attraction';
import type { DistanceInfo } from '~/types/attraction';

interface Props {
  attraction: Attraction;
  distanceInfo: DistanceInfo;
  userLocation: { latitude: number; longitude: number } | null;
}

const props = defineProps<Props>();
const { getUserLocation, formatDistance, formatDuration } = useGeolocation();

const mapUrl = computed(() => {
  if (!props.userLocation || !props.attraction.latitude || !props.attraction.longitude) {
    return '';
  }
  
  const origin = `${props.userLocation.latitude},${props.userLocation.longitude}`;
  const destination = `${props.attraction.latitude},${props.attraction.longitude}`;
  
  return `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${origin}&destination=${destination}&mode=driving`;
});

const googleMapsUrl = computed(() => {
  if (!props.userLocation || !props.attraction.latitude || !props.attraction.longitude) {
    return '';
  }
  
  const origin = `${props.userLocation.latitude},${props.userLocation.longitude}`;
  const destination = `${props.attraction.latitude},${props.attraction.longitude}`;
  
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
});

const wazeUrl = computed(() => {
  if (!props.attraction.latitude || !props.attraction.longitude) {
    return '';
  }
  
  return `https://www.waze.com/ul?ll=${props.attraction.latitude}%2C${props.attraction.longitude}&navigate=yes&zoom=17`;
});

const requestLocation = async () => {
  try {
    await getUserLocation();
  } catch (error) {
    console.error('Error getting location:', error);
  }
};
</script>

<style scoped>
.route-map-container {
  width: 100%;
}
</style>
