<template>
    <ul class="Picture_details">
        <li v-for="(value,index) in list" :key="index">
            <img :src="value.Url"/>
        </li>
    </ul>
</template>

<script>
     import {mapState, mapActions, mapMutations } from 'vuex'
     export default {
        computed:{
            ...mapState({
                list : state => state.imgDeta.list
            })
        },
        methods : {
            ...mapActions({
                imgDetail : 'imgDeta/imgDetail'
            }),
            ...mapMutations({
                imgList : 'imgDeta/imgList'
            })
        },
        mounted(){
            this.imgDetail({SerialID : this.$route.query.SerialID,ImageID:this.$route.query.ImageID})
        }
    }
</script>
<style>
     *{
        margin:0;
        padding: 0;
    }
    li{
        list-style: none;
    }
    .Picture_details{
        display: flex;
        flex-wrap: wrap;
    }
    .Picture_details li{
        width: 32%;
        margin-left: 1%;
        text-align: center;
    }
    .Picture_details li img{
        width: 100%;
    }
</style>