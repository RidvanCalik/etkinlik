<script setup>
import Activities from '@/components/Activities.vue';
import store from '../store';
import { onMounted, ref, watch } from 'vue';
import axios from "axios";
import { useRoute } from 'vue-router'


var myRouter = useRoute();
var activities = ref([]);
watch(myRouter, (newV) => {
    filterBySearch(newV.params.val);
})
onMounted(() => {
    if (myRouter.params.val) {
        filterBySearch(myRouter.params.val);
    } else {
        getAllActivities();
    }
})

function getAllActivities() {
    axios.get(store.state.hostUrl + "activities/").then(res => { activities.value = [...res.data] });
}

function filterBySearch(e) {

    if (e) {
        axios.get(store.state.hostUrl + "filterByVal/" + e).then((e) => {
            activities.value = [...e.data];
        });
    } else {

        getAllActivities();
    }


}







</script>

<template>

    <div id="main">

        <div id="ActivityhArea">
            <Activities v-for="act in activities" :key="act.activityID" :id="act.activityID"
                :imgSrc="store.state.hostUrl + 'images' + act.activityIMGS[0]" :title="act.title"
                :description="act.description" :dateScale="act.dateScale" :activityCategory="act.activityCategory" />

        </div>
    </div>

</template>

<style lang="scss">
@import "@/assets/variables.scss";




.toogleFilter {

    transform: translateX(0%) !important;
}

#main {
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;

    #FilterButton {
        cursor: pointer;
        width: 50px;
        height: 50px;
        border: 1px solid $black-mute;
        top: 80px;
        right: 20px;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 500px;
        z-index: 4;
    }





    #ActivityhArea {
        padding: 0px 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;

    }
}



@media screen and (max-width: $tablet) {
    #SwitchToogle {
        width: 65% !important;
    }

}

@media screen and (max-width: $mobile1) {
    #SwitchToogle {
        width: 80% !important;
    }


}
</style>
