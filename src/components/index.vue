<template>
  <div class="index">
    <div class="wrap" id="wrap">
      <div v-for="(value,index) in title" class="title">
        <h3 :id="value">{{value}}</h3>
        <div class="list" v-for="val in car" @click="getMakeList(val.MasterID)">
          <dl v-if="val.Spelling.slice(0,1) === value">
            <dt>
              <img :src="val.CoverPhoto" alt="">
            </dt>
            <dd>
              <p>{{val.Name}}</p>
            </dd>
          </dl>
        </div>
      </div>
      <section v-show="isShow" class="letters">
        <span>{{letters}}</span>
      </section>
      <div class="fixed" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <span v-for="(item,index) in letter" :key="index">
          {{item}}
        </span>
      </div>
    </div>
    <MakeList></MakeList>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import MakeList from './common/makeList.vue'
  export default {
    data() {
      return {
        city: null,
        height: 0,
        title : [],
        letter : []
      }
    },
    components: {
      MakeList
    },
    info() {
      marginTop: 0
    },
    computed: {
      ...mapState({
        list: state => state.app.list,
        letters: state => state.app.letters,
        isShow: state => state.app.isShow,
        car : state => state.app.car
      })

    },
    methods: {
      ...mapMutations({
        showLetter: 'app/showLetter',
        changeLetter: 'app/changeLetter',
        carList : 'app/carList',
        intercept : 'app/intercept'
      }),
      ...mapActions({
        listCar: 'app/listCar',
        getMakeList: 'app/getMakeList',
      }),
      touchStart(e) {
        this.showLetter(true)
        let letter = e.target.innerHTML;
        if (this.letters != letter) {
          this.changeLetter(letter)
        }
      },
      touchMove(e) {
        let pageY = e.touches[0].pageY;
        let index = Math.floor((pageY - this.marginTop) / this.height);
        if (index < 0) {
          index = 0;
        } else if (index > this.letter.length - 1) {
          index = this.letter.length - 1;
        }
        if (this.letter[index] != this.letters) {
          let ele = document.getElementById(this.letter[index])
          let top = ele.offsetTop;
          document.querySelector('.wrap').scrollTop = top
          this.changeLetter(this.letter[index])
        }
      },
      touchEnd() {
        this.showLetter(false)
      },
      intercept(){
        this.car.map((item, ind) => {
        let spli = item.Spelling.slice(0, 1)
          if (this.title.indexOf(spli) === -1) {
            this.title.push(spli)
          }
        })
        this.letter = this.title.slice();
      }
    },
    mounted() {
      this.listCar()
      setTimeout(() => {
        this.intercept()
      }, 500);
    },
    updated() {
      this.height = 0.37 * window.innerWidth / 750 * 100;
      this.marginTop = (window.innerHeight - (this.letter.length) * this.height) / 2;
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

  .index {
    height: 100%;
  }

  .wrap {
    height: 100%;
    overflow: scroll;
  }

  .title h3 {
    background-color: #f4f4f4;
    color: #aaa;
    padding-left: .12rem;
    font-weight: 100;
    font-size: .16rem;
  }

  .list dl {
    width: 95%;
    padding: .08rem 0;
    margin-left: 2.5%;
    display: flex;
    border-bottom: 1px solid #ccc;
  }

  .list dl dt {
    width: 10%
  }

  .list dl img {
    width: 100%;
  }

  .list dd {
    width: 90%;
    line-height: .4rem;
    margin-left: .2rem;
  }

  .list dd p {
    font-size: .18rem;
  }

  .fixed {
    position: fixed;
    top: 50%;
    margin-top: -50%;
    right: .1rem;
    display: flex;
    flex-direction: column;
  }

  .fixed span {
    width: .2rem;
    height: .2rem;
    text-align: center;
    line-height: .2rem;
  }

  .letters {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 1rem;
    height: 1rem;
    background-color: #999;
    border-radius: 50%;
    text-align: center;
  }

  .letters span {
    font-size: .4rem;
    margin-top: .2rem;
    display: block;
    color: #fff
  }
</style>