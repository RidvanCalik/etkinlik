<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import store from '../../store';
import dateFormat from "dateformat";


const props = defineProps(['title1', 'title2']);
const emit = defineEmits(['filterByCurrent']);
var isCurrent = ref(true);
function changeCurrent(val) {
    isCurrent.value = val;
    if (val) {
        var now = new Date();
        axios.get(store.state.hostUrl + 'filterByParam/?dateScale=["' + dateFormat(now, "yyyy-mm-dd") + '"]').then((e) => { emit("filterByCurrent", e.data) })
    } else {
        var now = new Date();
        axios.get(store.state.hostUrl + 'filterByParam/?dateScale=["2000-01-01","' + dateFormat(now, "yyyy-mm-dd") + '"]').then((e) => { emit("filterByCurrent", e.data) })
    }
}

</script>

<template>

    <label class="toggle">
        <h3 @click="changeCurrent(true)" :class="{ active: isCurrent }">{{ props.title1 }}</h3>
        <h3 @click="changeCurrent(false)" :class="{ active: !isCurrent }">{{ props.title2 }}</h3>
    </label>

</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    border-radius: 6px;
    padding: 6px;

    h3 {
        user-select: none;
        cursor: pointer;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border-radius: 6px;
        color: $text-light-1;

    }
}

.active {
    background-color: $white-soft;
}
</style>
