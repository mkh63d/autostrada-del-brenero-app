<template>
  <div class="pb-20 md:pb-0">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ $t('attractions.add') }}</h1>

      <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        {{ successMessage }}
      </div>

      <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-6 space-y-6">
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
const { addAttraction, loading } = useAttractions();
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
  distanceFromExit: undefined as number | undefined
});

const successMessage = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await addAttraction({
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
      distanceFromExit: form.distanceFromExit
    });

    successMessage.value = t('messages.added');
    
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

    // Redirect to home after 1.5 seconds
    setTimeout(() => {
      router.push('/');
    }, 1500);
  } catch (error) {
    errorMessage.value = t('messages.error');
  }
};
</script>
