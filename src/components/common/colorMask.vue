<template>
    <div class="mask_color">
        <div class="whole_color">全部颜色</div>
        <div class="date_color">
            <p v-for="(item,index) in list" :key="index">{{index}}</p>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    export default {
        computed : {
            ...mapState({
                list : state => state.color.list
            })
        },
        methods : {
            ...mapActions({
                colorList : 'color/colorList'
            }),
            ...mapMutations({
                listColor : 'color/listColor'
            })
        },
        mounted(){
            console.log(this.list)
            this.colorList(this.$route.query.id)
        }
    }
</script>
<style>
    .mask_color{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all .3s ease;
        transform: translate3d(0, 100%, 0);
        background-color: #eee;
        z-index: 99;
    }
    .active{
        transform: translate3d(0, 0, 0);
    }
    .whole_color{
        width: 100%;
        background-color: #fff;
        margin-top: .1rem;
        text-align: center;
        color: #00afff;
        font-size: .19rem;
        padding:.08rem;
    }
    .date_color{
        background-color: #fff;
        display: flex;
        margin-top: .07rem;
        padding: .07rem 0;
    }
    .date_color>p{
        padding: 0 .1rem;
        font-size: .16rem;
    }
</style>