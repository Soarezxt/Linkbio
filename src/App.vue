<template>
  <div id="app">
    <div></div>
    <LinkBio />
  </div>
</template>

<script>
import LinkBio from './components/LinkBio.vue'

export default {
  name: 'App',
  components: {
    LinkBio,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

body {
  font-family: 'Inter', sans-serif;
}


</style>
