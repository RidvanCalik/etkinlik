<script setup>
const props = defineProps(['id', 'imgSrc', 'title', 'dateScale', 'description', 'activityCategory']);

</script>

<template>
    <router-link :to="{ name: 'ActivityDetail', params: { val: props.id } }">
        <div class="activity">
            <div class="img" :style="{ 'background-image': 'url(' + props.imgSrc + ')' }"></div>
            <div class="activityDetailArea">
                <div class="header">
                    <h2>{{ props.title }}</h2>
                    <h6>{{ props.activityCategory }}</h6>
                </div>
                <div class="content">
                    <p>{{ props.description }}</p>
                    <h6>{{ new Date(props.dateScale[0]).toLocaleDateString() }} - {{ new
                            Date(props.dateScale[props.dateScale.length -
                                1]).toLocaleDateString()
                    }}</h6>
                </div>

            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

a {
    flex: 1;
    color: $black-soft;
    text-decoration: none;
    max-width: 536px;
    min-width: 370px;
    height: 200px;
}

.activity {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 35% 65%;
    border-radius: 6px;
    background-color: $white-soft;
    padding: 10px;
    overflow: hidden;


    .img {
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        border-radius: 6px;

    }

    .activityDetailArea {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 35% 65%;
        overflow: hidden;
        text-align: left;
        padding: 6px;

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            h2 {
                color: $black-mute;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            h6 {
                padding: 5px;
                border-radius: 500px;
                color: $white-mute;
                background-color: $brand-blue2;
            }
        }

        .content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            h6 {
                text-align: right;
            }

            p {
                color: $black-mute;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
}

@media screen and (max-width: $tablet) {
    .activity {
        grid-template-columns: 25% 75%;
        width: 100%;
    }
}

@media screen and (max-width: $mobile1) {
    .activity {
        grid-template-columns: 20% 80%;
        width: 100%;
    }
}

@media screen and (max-width: $mobile2) {
    a {
        height: 150px;
    }

    .activity {
        grid-template-columns: 20% 80%;
        width: 100%;

    }
}
</style>
