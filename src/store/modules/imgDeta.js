import { getImgDetailList } from "../../api/index";

let state = {
    list : []
};

let getters = {};

let mutations = {
    imgList(state,payload){
        let reg = /(\{)([\d])(\})/g;
        Array(payload.data).forEach(item => {
            item.List.map(val => {
                val.Url = val.Url.replace(reg, (a, b, c) => {
                    return val.LowSize
                })
            })
        })
        state.list = payload.data.List
    }
}

let actions = {
    imgDetail({commit},payload){
        getImgDetailList(payload.SerialID,payload.ImageID).then(body=>{
            commit('imgList',body)
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}