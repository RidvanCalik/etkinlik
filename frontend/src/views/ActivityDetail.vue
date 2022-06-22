<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import store from '../store';

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
var myRouter = useRoute();
var activityDetail = ref({ "activityID": false, "activityCategory": false, "activitySponsors": [], "title": "", "description": "", "dateScale": [], "beginingTime": "", "currentProvinces": [], "chairPrices": [], "activityIMGS": ["/base.jpg"] });
var actPlaces = [];
var placeWithMap = ref([]);
var fullUrl = window.location.href;
onMounted(() => {

    axios.get(store.state.hostUrl + "activities/" + myRouter.params.val).then((act) => {
        activityDetail.value = act.data[0];
        actPlaces.push(...act.data[0].currentProvinces);
    }).then(() => {
        var AllPlaceWithMap = [];
        axios.get(store.state.hostUrl + "provinces/").then((x) => {
            AllPlaceWithMap = x.data;
        }).then(() => {
            actPlaces.forEach((actPlace) => {
                placeWithMap.value.push(AllPlaceWithMap[Object.keys(actPlace)][Object.values(actPlace)]);
            })
        })

    });


})
</script>

<template>
    <div id="Activiy">

        <Carousel :itemsToScroll="2" :autoplay="5000">
            <Slide v-for="slide in activityDetail.activityIMGS" :key="slide">
                <div class="carousel__item">
                    <img :src="store.state.hostUrl + 'images' + slide" />
                </div>
            </Slide>

            <template #addons>
                <Pagination />
            </template>
        </Carousel>
        <div id="ActivityContent">
            <div id="ActivityHeadArea">
                <div>
                    <h1>{{ activityDetail.title }}</h1>
                    <div class="share_group">
                        paylaş:

                        <a :href="'https://www.facebook.com/sharer/sharer.php?u=#' + fullUrl" target="_blank">
                            <fa icon="fa-brands fa-facebook-square"></fa>
                        </a>&nbsp;
                        <a :href="'http://twitter.com/share?text=' + fullUrl" target="_blank">
                            <fa icon="fa-brands fa-twitter-square"></fa>
                        </a>&nbsp;
                        <a :href="'whatsapp://send?text=' + fullUrl" target="_blank">
                            <fa icon="fa-brands fa-whatsapp-square"></fa>
                        </a>&nbsp;

                    </div>
                </div>

                <h4>
                    Başlangıç :{{ new Date(activityDetail.dateScale[0]).toLocaleDateString() }} <br />
                    Bitiş :{{ new Date(activityDetail.dateScale.at(-1)).toLocaleDateString() }}<br />
                    Başlangıç Saati: {{ activityDetail.beginingTime }}
                </h4>
            </div>
            <div id="ActivityDetailArea">
                <fieldset>
                    <legend>{{ activityDetail.activityCategory }}</legend>
                    <p>
                        {{ activityDetail.description }}
                    </p>
                </fieldset>

            </div>

            <div id="ActivityFooterArea">
                <fieldset>
                    <legend>Sponsorlar</legend>
                    {{ activityDetail.activitySponsors.length == 0 ? "Sponsor henüz yok gibi" : null }}
                    {{ activityDetail.activitySponsors.toString() }}
                </fieldset>

                <fieldset>
                    <legend>Koltuk Seçimi</legend>
                    {{ activityDetail.chairPrices.length == 0 ? "Katılım Ücretsiz" : null }}
                    <dl v-for="el in activityDetail.chairPrices">
                        <dt>{{ Object.keys(el).toString() }}</dt>
                        <dd>- {{ Object.values(el).toString() }} TL</dd>
                    </dl>
                </fieldset>

                <fieldset>
                    <legend>Şehir / Mekan</legend>
                    <div v-for="(el, index) in activityDetail.currentProvinces">
                        <dl>
                            <h3>{{ Object.keys(el).toString() }}</h3>
                            <h4>{{ Object.values(el).toString() }}</h4>
                        </dl>
                        <div class="mapouter">
                            <div class="gmap_canvas"><iframe id="gmap_canvas" :src="placeWithMap[index]" frameborder="0"
                                    scrolling="no" marginheight="0" marginwidth="0"></iframe><a
                                    href="https://123movies-to.org"></a><br>
                            </div>
                        </div>
                    </div>

                </fieldset>
            </div>

        </div>
    </div>

</template>

<style lang="scss">
@import "@/assets/variables.scss";

.share_group {
    font-size: 1.5em;

    a {
        color: $black-mute
    }
}

.mapouter {
    position: relative;
    text-align: right;
    width: 100%;
    height: 100%;
}

.gmap_canvas {
    overflow: hidden;
    background: none !important;
    width: 100%;

    iframe {
        width: 100%;
    }


}

#Activiy {
    padding: 0 40px;

    #ActivityContent {
        display: flex;
        flex-direction: column;

        #ActivityHeadArea {
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
        }

        #ActivityDetailArea {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        #ActivityFooterArea {
            display: grid;
            gap: 7px;
            grid-template-columns: 50% 50%;
            grid-template-rows: auto auto;

            fieldset:nth-last-child(1) {
                grid-column-start: 1;
                grid-column-end: 3;


                div {
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 5px;
                    justify-content: space-between;
                    align-items: center;

                    dl {
                        flex: 1;
                    }

                    .mapouter {
                        flex: 2;
                    }
                }
            }


        }
    }
}

.carousel__item {
    height: 300px;
    user-select: none;
    width: 90%;
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

@media screen and (max-width: $tablet) {
    #Activiy {
        padding: 0 20px;
    }
}

@media screen and (max-width: $mobile1) {
    #Activiy {
        padding: 0 10px;

        #ActivityHeadArea {
            h1 {
                font-size: 1.3em;
            }

            h4 {
                font-size: 0.7em;
            }
        }

        #ActivityFooterArea {
            grid-template-columns: 100% !important;
            grid-template-rows: auto auto auto !important;

            fieldset:nth-last-child(2) {
                grid-row: 1/3;
                grid-column: 1/3;
            }

            fieldset:nth-last-child(1) {
                div {
                    flex-direction: column !important;
                    align-items: start !important;
                }
            }
        }

    }
}
</style>
