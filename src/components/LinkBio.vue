<template>
  <div class="mx-auto items-center justify-center p-4 lg:px-20">
    <div v-if="loading" class="text-center text-gray-100">
      Carregando...
    </div>
    <div v-else-if="profile" class="text-center">
      <div class="flex flex-col items-center justify-center">
        <img :src="profile.image" alt="Profile" class="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto mb-2">
        <div class="flex items-center justify-center">
          <h1 class="text-gray-100 text-2xl md:text-3xl font-semibold italic">
            {{ profile.name }}
          </h1>
          <img :src="profile.icon" alt="Profile Icon" class="w-5 h-5 md:w-5 md:h-5 mt-3 ml-1">
        </div>
      </div>
      <p class="text-center text-gray-100 mt-1 md:mt-1">{{ profile.bio }}</p>
      <div class="mt-4 space-y-2 text-gray-100 sm:flex sm:flex-col sm:items-center sm:w-full">
        <a
          v-for="link in profile.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block py-5 md:py-4 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium text-sm md:text-base text-center
                 w-full sm:w-64"
        >
          {{ link.name }}
          <img v-if="link.icon" :src="link.icon" alt="Link Icon" class="w-4 h-4 inline ml-1">
        </a>
      </div>
      <div class="social-icons flex justify-center mt-4">
        <a
          v-for="social in profile.socialmedia"
          :key="social.url"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="mx-2"
        >
          <img :src="social.icon" alt="Social Icon" class="w-8 h-8 rounded-full">
        </a>
      </div>
      <!-- Ajuste do hr -->
      <hr class="inline-block w-full sm:w-64 my-2">
      <div class="social-icons flex justify-center">
        <a
          v-for="corp in profile.oliveiracorp"
          :key="corp.url"
          :href="corp.url"
          target="_blank"
          rel="noopener noreferrer"
          class="mx-2"
        >
          <img :src="corp.icon" alt="Corporate Icon" class="w-18 h-4">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LinkBio',
  data() {
    return {
      profile: null,
      loading: false,
      error: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const [profileResponse, linksResponse, socialMediaResponse, oliveiraCorpResponse] = await Promise.all([
          axios.get('http://localhost:3000/informações'),
          axios.get('http://localhost:3000/links'),
          axios.get('http://localhost:3000/socialmedia'),
          axios.get('http://localhost:3000/oliveiracorp')
        ]);

        if (profileResponse.data && linksResponse.data && socialMediaResponse.data && oliveiraCorpResponse.data) {
          this.profile = profileResponse.data;
          this.profile.links = linksResponse.data;
          this.profile.socialmedia = socialMediaResponse.data;
          this.profile.oliveiracorp = oliveiraCorpResponse.data;
        } else {
          throw new Error('Dados inválidos retornados da API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
