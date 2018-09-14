<template>
    <div class="img_tab">
        <div class="tab_img" @click="e=>tabImg(e.target)">
            <span>全部颜色</span>
            <span>全部车款</span>
        </div>
        <div class="overflow_scroll">
            <div class="scroll_hidden">
                <ul v-for="(val,ind) in list" :key="ind">
                    <li v-for="(value,index) in val.List" :key="index" :id="index" v-if="index === 0" @click="imgClick(val.Id)">
                        <img :src="value.Url" />
                        <div class="imgClick">
                            <p>{{val.Name}}</p>
                            <p>{{val.Count}}</p>
                        </div>
                    </li>
                    <li v-for="(value,index) in val.List" :key="index" v-if="index !== 0">
                        <img :src="value.Url" />
                    </li>
                </ul>
            </div>
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
                showMask: state => state.img.showMask
            })
        },
        methods: {
            ...mapActions({
                imgList: 'img/imgList'
            }),
            ...mapMutations({
                tabImg: 'img/tabImg'
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
        components: {
            ColorMask: ColorMask
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
        flex: 1;
        margin-top: .33rem;
        overflow-y: scroll;
    }
    .scroll_hidden{
        overflow-y: scroll;
    }
    .tab_img {
        width: 100%;
        height: .4rem;
        display: flex;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 10;
        border-bottom: 1px solid #ccc;
    }

    .img_tab {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .tab_img span {
        width: 50%;
        text-align: center;
        line-height: .4rem;
    }

    .img_tab ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: .1rem;
    }

    .img_tab ul li {
        width: 32%;
        overflow: hidden;
        text-align: center;
        overflow: hidden;
        margin-left: 1.3%;
    }

    .img_tab ul li img {
        width: 95%;
    }

    .img_tab ul li:first-child {
        position: relative;
        height: 100%;
    }

    .imgClick {
        width: 100%;
        height: 100%;
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