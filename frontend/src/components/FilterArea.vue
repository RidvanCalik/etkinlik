<template>
    <div id="FilterArea">
        <div id="FilterCloseArea" @click="emit('ToogleModal');"></div>
        <div id="FilterContent">
            <h2>Filtrele</h2>
            <fieldset>
                <legend>Tarih Aralığı Seç</legend>
                <div class="inputGrup2">
                    <div>
                        <div class="inputContent">Başlangıç</div>
                        <input type="date" v-model="beginingDate" />
                    </div>
                    <div>
                        <div class="inputContent">Bitiş</div>
                        <input type="date" v-model="endDate" />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>Kategori</legend>
                <div class="inputGrup">
                    <div v-for="category in categories">
                        <input type="checkbox" :id="category" :value="category" v-model="selectedCategories">
                        <label :for="category">{{ category }}</label>
                    </div>

                </div>
            </fieldset>
            <fieldset>
                <legend>Şehir</legend>
                <div class="inputGrup">
                    <div v-for="prov in Object.keys(provinces)">
                        <input type="checkbox" :id="prov" :value="prov" v-model="selectedProvinces">
                        <label :for="prov">{{ prov }}</label>
                    </div>

                </div>
            </fieldset>
            <fieldset>
                <legend>Mekan</legend>
                <div class="inputGrup">
                    <div v-for="el in place">
                        <input type="checkbox" :id="el" :value="el" ref="placesRef">
                        <label :for="el">{{ el }}</label>
                    </div>
                </div>
            </fieldset>
            <button @click="sendFilter">Filtrele</button>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import store from '@/store';
import dateFormat from "dateformat";

onMounted(() => {
    axios.get(store.state.hostUrl + 'provinces').then((el) => {
        provinces.value = el.data;
    });
    axios.get(store.state.hostUrl + 'categories').then((el) => {
        categories.value.push(...el.data);
    })
})
const emit = defineEmits(['filterByParams', 'ToogleModal'])
var now = new Date();
var beginingDate = ref();
var endDate = ref();
var placesRef = ref(placesRef);
var selectedProvinces = ref([]);
var selectedCategories = ref([]);
var place = ref([]);
var provinces = ref({});
var categories = ref([]);

watch(selectedProvinces, (newP, oldP) => {//seçilen şehirlerin mekanlarını dizmek için seçilen şehirleri izliyoruz

    place.value = [];
    newP.forEach((el) => {
        place.value.push(...Object.keys(provinces.value[el]));
    })


})

function sendFilter() {
    var filterUrl = [];// filtrelemek için bir url hazırlıcam. Örneğin seçilmeyen bir özellik varsa onu bu urlye dahil etmicem
    var selectedPlaces = []; //mekan seçili ise bunları ayıklıyorum
    if (placesRef.value != undefined) {
        placesRef.value.forEach((e) => {

            if (e.checked) {
                selectedPlaces.push(e.value);
            }

        })
    }
    //burdada: eğer bir seçenek seçmemiş ise yani boş bıraktıysa false gönderiyorum ki herhenagi bir filtreleme işlemi yapmasın
    if (beginingDate.value == undefined && endDate.value == undefined && selectedCategories.value.length == 0 && selectedProvinces.value.length == 0) {
        filterUrl = false;
    } else {
        let dateScale = [];
        let categories = [];
        let provinces = [];
        let places = [];
        if (beginingDate.value != undefined) {
            dateScale.push('"' + beginingDate.value + '"');
            if (endDate.value != undefined) {
                endDate.value != undefined ? dateScale.push('"' + endDate.value + '"') : null;
            }
            filterUrl.push("dateScale=[" + dateScale + "]")
        }

        if (selectedCategories.value.length != 0) {
            selectedCategories.value.forEach((category) => {
                categories.push('"' + category + '"')
            })
            filterUrl.push("category=[" + categories + "]");
        }
        if (selectedProvinces.value.length != 0) {
            selectedProvinces.value.forEach((provin) => {
                provinces.push('"' + provin + '"')
            })
            filterUrl.push("provinces=[" + provinces + "]");
        }
        if (selectedPlaces.length > 0) {
            selectedPlaces.forEach((place) => {
                places.push('"' + place + '"')
            })
            filterUrl.push("place=[" + places + "]");
        }



        axios.get(store.state.hostUrl + 'filterByParam/?' + filterUrl.join('&')).then((e) => {
            emit("filterByParams", e.data)
        })
    }

}


</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

fieldset {
    width: 75%;
    box-shadow: 0px 1px 10px 2px gray;

    legend {
        background-color: $brand-blue;
        padding: 6px;
        border-radius: 200px;
        display: flex;
        color: $white-mute;
    }

    .inputGrup {
        width: 100%;
        display: flex;
        flex-direction: column;

        select {
            flex: 1;
        }
    }

    .inputGrup2 {
        width: 100%;
        display: flex;

        div {
            flex: 1;


            input {

                width: 80%;
            }
        }
    }
}



#FilterArea {
    display: grid;
    grid-template-columns: 30% 70%;
    transform: translateX(200%);
    top: 0;
    position: fixed;
    z-index: 7;
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    transition: all 500ms;

    #FilterContent {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
        box-shadow: -10px 0px 200px 50px $black-soft;
        padding: 10px;
        background-color: white;

        button {
            height: 40px;
            width: 50%;
            border-radius: 6px;
            cursor: pointer;
            background-color: $white-mute;
        }
    }

}


@media screen and (max-width: $mobile1) {

    #FilterArea {
        grid-template-columns: 20% 80%;
    }
}
</style>