import { getBrandList , getMakeList } from "../../api/index";
let state = {
  list: [],
  car : [],
  num: 1,
  letters: "",
  isShow: false,
  brandId: "",
  makeList: "",
  isShowList : false,
  title : [],
  letter : []
};

let getters = {};

let mutations = {
  showLetter: (state, payload) => {
    state.isShow = payload;
  },
  changeLetter: (state, payload) => {
    state.letters = payload;
  },
  changeMakeList: (state, payload) => {
    state.brandId = payload.id;
    state.makeList = payload.list;
    console.log(state.makeList)
    state.isShowList = true;
  },
  hideMakeList : (state,payload)=>{
    state.isShowList = false;
  },
  showMakeList : (state)=>{
    state.isShowList = true
  },
  carList : (state,payload)=>{
    state.car = payload
    payload.map((item, ind) => {
      let spli = item.Spelling.slice(0, 1)
        if (state.title.indexOf(spli) === -1) {
          state.title.push(spli)
        }
      })
      state.letter = state.title.slice();
  }
};
let actions = {
  listCar: ({commit}, payload) => {
    getBrandList().then(body=>{
        commit('carList',body.data)
    })
  },
  getMakeList: ({ commit, state }, payload) => {
    if (payload != state.brandId) {
      getMakeList(payload).then(body => {
        commit("changeMakeList", {
          id: payload,
          list: body.data
        });
      });
    }else{
      // commit('showMakeList')
    }
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
