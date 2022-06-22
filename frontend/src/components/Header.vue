<template>
  <div class="Header">
    <div class="mainpagerouter">
      <router-link :to="{
        name: 'Main'
      }">Anasayfa</router-link>
    </div>
    <input placeholder="Etkinlik, Sanatçı veya Grup ara " v-model="searchVal" @keyup.enter="sendVal" />
    <div></div>
  </div>
</template>


<script setup>
import axios from "axios"
import store from "@/store"
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
var myRouter = useRouter();
var searchVal = ref();
function sendVal() {
  myRouter.push({ name: "search", params: { val: searchVal.value } });
  searchVal.value = null;
}

</script>


<style scoped lang="scss">
@import "@/assets/variables.scss";

.mainpagerouter {
  display: flex;
  justify-content: center;

  a {
    color: $black-soft;
    text-decoration: none;
  }
}


.Header {

  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid $text-light-2;


  input {
    flex: 5;
    width: 40%;
    height: 65%;
    border-radius: 6px;
    border: 2px solid $text-light-2;
    padding-left: 20px;

  }

  div {
    flex: 4;
  }
}

@media screen and (max-width: $tablet) {
  input {
    width: 60% !important;
  }
}

@media screen and (max-width: $mobile1) {
  input {
    width: 80% !important;
  }
}
</style>
