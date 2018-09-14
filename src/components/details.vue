<template>
    <div class="details">
        <div class="MaxImg">
            <div class="images" @click="jumpimg">
                <img :src="img"/>
                <p><span>{{num}}</span>张照片</p>
            </div>
            <div class="price_num">
                <div class="zongj">
                    <p>{{price}}</p>
                    <p>指导价<span>{{price}}</span></p>
                </div>
                <div class="btn">
                    <button @click="floorPrice">询问底价</button>
                </div>
            </div>
        </div>
        <ol class="c_type">
            <li @click="changeYear(item)" v-for="(item,index) in years" :key="index">{{item}}</li>
        </ol>
        <section>
            <ul v-for="(item,index) in list" :key="index">
                <p>{{index}}</p>
                <li v-for="(value,key) in item" :key="key" :ref="value.car_id">
                    <p>{{value.market_attribute.year + "款" + value.car_name}}</p>
                    <P>{{`${value.max_power}马力${value.gear_num}挡${value.trans_type}`}}</P>
                    <p>
                        <span>{{`指导价${value.market_attribute.dealer_price_min}`}}</span>
                        <span>{{value.market_attribute.official_refer_price}}起</span>
                    </p>
                </li>
            </ul>
        </section>

    </div>
</template>
<script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        data(){
           return {
                img : '',
                price : '',
                num : '',
                ids : ''
           }
        },
        computed: {
            ...mapState({
                currentYear: state => state.details.currentYear
            }),
            ...mapGetters({
                years: 'details/years',
                list: 'details/list'
            })
        },
        methods: {
            ...mapActions({
                getDetailList: 'details/getDetailList'
            }),
            ...mapMutations({
                changeYear: 'details/changeYear'
            }),
            jumpimg(){
                this.$router.push({
                    path: '/img',
                    query : {
                        id : this.num
                    }
                })
            },
            floorPrice(){
                this.$router.push({
                    path: '/route',
                    query : {
                        id : this.ids
                    }
                })
            }
        },
        mounted() {
            this.img = this.$route.query.img;
            this.price= this.$route.query.price;
            this.num = this.$route.query.id;
            this.getDetailList(this.$route.query.id)
        },
        updated() {
            for(let index in this.list){
                let ind = this.list[index]
                ind.map((item,inde)=>{
                    this.ids =item.car_id
                })
            }
        },
        beforeRouteEnter(to,from,next){
            next()
        },
        beforeRouteLeave(to,from,next){
            next()
        },
        beforeDestory(){
            
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

    .details {
        background-color: #eee;
    }

    .c_type {
        width: 100%;
        background-color: #fff;
        display: flex;
        padding: .1rem;
        text-align: center;
        margin-top: .05rem;
    }

    .c_type li {
        width: 15%;
        font-size: .18rem;
    }

    section {
        margin-top: .3rem;
    }

    section ul>p {
        padding: 0 .2rem;
        height: .25rem;
        line-height: .25rem;
        font-size: .12rem;
        color: #999;
        background: #f4f4f4;
    }

    section ul {
        background-color: #fff;
    }

    section ul li p:first-child {
        line-height: .4rem;
        margin-left: .22rem;
        font-size: .16rem;
    }

    section ul li p:nth-child(2) {
        color: #bdbdbd;
        margin-left: .22rem;
    }

    section ul li p:last-child {
        text-align: right;
        line-height: .3rem;
    }

    section ul li p:last-child span {
        margin-right: .1rem;
    }

    section ul li p:last-child span:last-child {
        font-size: .18rem;
        color: #ff2336;
    }
    .MaxImg{
        width: 100%;
        height: 2.8rem;
    }
    .images{
        width: 100%;
        position: relative;
        height: 72%;
        overflow: hidden;
    }
    .images img{
        width: 100%;
    }
    .images p{
        position: absolute;
        bottom: .2rem;
        right: .13rem;
        color: #fff;
        background: rgba(0,0,0,.6);
        padding: .02rem .04rem;
        border-radius: .2rem;
    }
    .images p span{
        font-size: .12rem;
    }
    .price_num{
        height: 28%;
        display: flex;
        background-color: #fff;
    }
    .zongj {
        width: 50%;
        padding: .2rem 0 .15rem .1rem;
    }
    .zongj p:first-child{
        color: red;
        font-size: .2rem;
    }
    .zongj p:last-child{
        color: #999;
    }
    .btn{
        width: 50%;
    }
    .btn button{
        width: 95%;
        background: #00afff;
        color: #fff;
        border:none;
        padding: .1rem;
        border-radius: .05rem;
        margin-top: 10%;
    }
</style>