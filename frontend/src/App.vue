<script setup>
//import { RouterLink, RouterView } from 'vue-router'

import Header from '@/components/Header.vue';



</script>

<template>
  <Header></Header>

  <router-view></router-view>

</template>

<style lang="scss">
@import '@/assets/base.scss';

#app {
  margin: 0 auto;
  height: 100vh;
  max-width: 1660px;
  font-weight: normal;
}
</style>
