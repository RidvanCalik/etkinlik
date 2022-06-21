<script setup>
import SwitchToogle from '@/components/MiniComponents/SwitchToogle.vue';
import Activities from '@/components/Activities.vue';
import store from '../store';
import { onMounted, ref, watch } from 'vue';
import axios from "axios";
import FilterArea from '@/components/FilterArea.vue';
import { useRoute } from 'vue-router'
import dateFormat from "dateformat";
import { Carousel, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';


var myRouter = useRoute();
var activities = ref([]);
var searchValum = ref();

watch(myRouter, (newVal) => {
    searchValum.value = newVal.params.val;
    filterBySearch(searchValum.value);
})
onMounted(() => {

    //component kurulduğunda güncel aktiviteleri getiriyoruz
    var now = new Date();
    axios.get(store.state.hostUrl + 'filterByParam/?dateScale=["' + dateFormat(now, "yyyy-mm-dd") + '"]').then((e) => { filterByCurrent(e.data) })

})

//tüm aktiviteleri getiren fonksiyon
function getAllActivities() {
    axios.get(store.state.hostUrl + "activities/").then(res => { activities.value = [...res.data] });
}
//Filtre ayarlarının Toogle fonksiyonu
var filterİsOpen = ref(false);
function ToogleModal() {
    if (filterİsOpen.value) {
        document.getElementById("app").style.overflow = "auto";
        document.getElementById("FilterArea").classList.value = "";
    } else {
        document.getElementById("app").style.overflow = "hidden";
        document.getElementById("FilterArea").classList.value = "toogleFilter";
    }
    filterİsOpen.value = !filterİsOpen.value;
}

//filtreleme fonksiyonları
function filterByCurrent(e) {
    activities.value = [...e]
}
function filterByParams(e) {
    activities.value = [...e]
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

        <button @click="ToogleModal" id="FilterButton">
            <fa icon="filter"></fa>
        </button>
        <h2 style="text-align:left">Popüler Etkinlikler</h2>
        <Carousel :autoplay="2000" :wrap-around="false">
            <Slide v-for="act in activities" :key="act">
                <div class="carousel__item">
                    <Activities :id="act.activityID" :imgSrc="store.state.hostUrl + 'images' + act.activityIMGS[0]"
                        :title="act.title" :description="act.description" :dateScale="act.dateScale"
                        :activityCategory="act.activityCategory" />
                </div>
            </Slide>

            <template #addons>
                <Pagination />
            </template>
        </Carousel>

        <div id="SwitchArea">
            <SwitchToogle title1="Güncel Etkinlikler" title2="Geçmiş Etkinlikler" id="SwitchToogle"
                @filterByCurrent="(e) => filterByCurrent(e)" />
        </div>
        <div id="ActivityhArea">
            <Activities v-for="act in activities" :key="act.activityID" :id="act.activityID"
                :imgSrc="store.state.hostUrl + 'images' + act.activityIMGS[0]" :title="act.title"
                :description="act.description" :dateScale="act.dateScale" :activityCategory="act.activityCategory" />

        </div>
    </div>
    <FilterArea @ToogleModal="ToogleModal" @filterByParams="(n) => filterByParams(n)" />

</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";


.carousel__item {
    margin-top: 40px;
    height: 190px !important;
}



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



    #SwitchArea {
        width: 100%;
        padding: 10px 0px;

        #SwitchToogle {
            margin: 0 auto;

            width: 50%;
            height: 60px;
        }

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

    .carousel__item {
        font-size: .7em !important;
    }

}
</style>
