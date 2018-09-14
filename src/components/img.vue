<template>
    <div class="img">
        <div class="tab_img" @click="e=>tabImg(e.target)">
            <span>全部颜色</span>
            <span>全部车款</span>
        </div>
        <div class="overflow_scroll">
            <ul v-for="(val,ind) in list" :key="ind">
                <li v-for="(value,index) in val.List" :key="index" :id="index" v-if="index === 0" @click="imgClick(val.Id)">
                    <img :src="value.Url" />
                    <div class="imgClick">
                        <p>{{val.Name}}</p>
                        <p>{{val.Count}}</p>
                    </div>
                </li>
                <li v-for="(value,index) in val.List" :key="index" :id="index" v-if="index !== 0">
                    <img :src="value.Url" />
                </li>
            </ul>
        </div>
        <ColorMask :class="showMask ? 'active' : ''"></ColorMask>
    </div>
</template>
<script>
    import ColorMask from './common/colorMask.vue'
    import { mapState, mapActions, mapMutations } from 'vuex'
    export default {
        computed: {
            ...mapState({
                list: state => state.img.list,
                showMask : state => state.img.showMask
            })
        },
        methods: {
            ...mapActions({
                imgList: 'img/imgList'
            }),
            ...mapMutations({
                tabImg : 'img/tabImg'
            }),
            imgClick(id) {
                this.$router.push({
                    path: '/imgDetail',
                    query: {
                        ImageID: id,
                        SerialID: this.$route.query.id
                    }
                })
            }
        },
        components : {
            ColorMask : ColorMask
        },
        mounted() {
            this.imgList(this.$route.query.id)
        }
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: .14rem;
      }
    
      html,
      body,
      #app {
        width: 100%;
        height: 100%;
      }
    
      html {
        font-size: 625%;
      }
    
      a {
        color: #000;
        text-decoration: none;
      }
    li {
        list-style: none;
    }
    .overflow_scroll {
        height: 100%;
        overflow-y: scroll;
        margin-top: .1rem;
        margin-top: .5rem;
    }
    .tab_img{
        width: 100%;
        height: .4rem;
        display: flex;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 10;
    }
    .tab_img span{
        width: 50%;
        text-align: center;
        line-height: .4rem;
    }
    .img ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: .1rem;
    }

    .img ul li {
        width: 33%;
        /* height: 6rem; */
        overflow: hidden;
        text-align: center;
        overflow: hidden;
    }

    .img ul li img {
        width: 98%;
    }

    .img ul li:first-child {
        position: relative;
    }

    .imgClick {
        width: 100%;
        height: 5.6rem;
        position: absolute;
        background: rgba(56, 90, 130, .5);
        text-align: center;
        color: #fff;
        margin-left: 50%;
        margin-top: -68%;
        transform: translate3d(-50%, 0, 0);
    }

    .imgClick p:first-child {
        margin-top: .3rem;
    }
</style>