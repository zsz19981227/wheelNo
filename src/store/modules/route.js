import { getDealerList,getCityList } from "../../api/index";
let state = {
    list : [],
    details : [],
    isShowCity : false,
    currentCity : ''
};
let getters = {};

let mutations = {
    officialList(state,payload){
        state.list = payload.data.list;
        state.details = payload.data.details
    },
    showCity(state,payload){
        state.isShowCity = payload
    }
};
let actions = {
    official({commit},payload){
        getDealerList(payload).then(body=>{
            commit('officialList',body)
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
