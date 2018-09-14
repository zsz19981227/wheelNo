<template>
    <div :class="isShowList? 'active car_type' : 'car_type'"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    ref="section"
    >
        <ul v-for="(item,index) in makeList" :key="index">
            <p>{{item.GroupName}}</p>
            <li v-for="(val,ind) in item.GroupList" :key="ind">
                <router-link :to="{path:'/details',query:{id:val.SerialID,img:val.CoverPhoto,price:val.DealerPrice}}">
                         <div class="img" >
                        <img :src="val.Picture"/>
                    </div>
                    <div>
                        <p>{{val.AliasName}}</p>
                        <p>{{val.DealerPrice}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        computed: {
            ...mapState({
                makeList:state=> state.app.makeList,
                isShowList : state=>state.app.isShowList
            })
        },
        methods : {
            ...mapMutations({
                hideMakeList : 'app/hideMakeList'
            }),
            touchStart(e){
                this.touch = e.touches[0];
            },
            touchMove(e){
                let touch = e.touches[0];
                this.offsetX = touch.pageX - this.touch.pageX;
                console.log(this.offsetX)
                if(this.offsetX>0){
                    this.$refs.section.style = `transform: translate3d(${this.offsetX}px,0,0)`
                }
                
            },
            touchEnd(e){
                this.$refs.section.style = ``
                if(this.offsetX>100){
                    this.hideMakeList()
                }
            }
        }
    }
</script>
<style>
    .car_type{
        position: fixed;
        top: 0;
        right: 0;
        width: 75%;
        background: #fff;
        z-index: 100;
        height: 100%;
        box-shadow: 0 0 0.5rem #eee;
        overflow-y: scroll;
        transform: translate3d(100%,0,0)
    }
    ul > p{
        margin-left: 1px;
        font-size: .15rem;
        line-height: .25rem;
        background: #f2f2f2;
        padding-left: .1rem;
        color: #717171;
    }
    li{
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        padding: .03rem 0;
    }
    li a{
        display: flex;
    }
    li .img{
        width: 35%;
        text-align: center;
    }
    li .img img{
        width: 90%;
    }
    li div:last-child p:first-child{
        font-size: .2rem;
        color: #5f687a;
    }
    li div:last-child p:last-child{
        margin-top: .1rem;
        font-size: .14rem;
        color: red;
    }
    .active{
        transform: translate3d(0,0,0);
        transition : transfrom .3s linear
    }
</style>