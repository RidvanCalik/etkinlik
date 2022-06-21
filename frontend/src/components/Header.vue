<template>
  <div class="Header">
    <input placeholder="Etkinlik, Sanatçı veya Grup ara " v-model="searchVal" @keyup.enter="sendVal" />
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

}

</script>


<style scoped lang="scss">
@import "@/assets/variables.scss";

.Header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid $text-light-2;


  input {
    width: 40%;
    height: 65%;
    border-radius: 6px;
    border: 2px solid $text-light-2;
    padding-left: 20px;

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
