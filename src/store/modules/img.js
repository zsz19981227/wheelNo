import { getImg } from "../../api/index";
let state = {
    list : [],
    showMask : false
};
let getters = {};

let mutations = {
    dataList(state,payload){
       let reg = /(\{)([\d])(\})/g;
        payload.data.map(item => {
            item.List.map(val => {
                val.Url = val.Url.replace(reg, (a, b, c) => {
                    return val.LowSize
                })
            })
        })
        state.list = payload.data
    },
    tabImg(state,payload){
        state.showMask = true;
    }
};
let actions = {
    imgList({commit},payload){
        getImg(payload).then(body=>{
            commit('dataList',body)
        })
    }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
