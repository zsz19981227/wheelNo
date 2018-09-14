import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import details from './modules/details'
import img from './modules/img'
import imgDeta from './modules/imgDeta'
import route from './modules/route'
import city from './modules/city'
import color from './modules/color'
Vue.use(Vuex)

export default new Vuex.Store({
    modules : {
        app,
        details,
        img,
        imgDeta,
        route,
        city,
        color
    }
})