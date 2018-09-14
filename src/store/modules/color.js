import { getColorList } from "../../api/index";
let state = {
  list: []
};
let getters = {};

let mutations = {
  listColor(state, payload) {
    state.list = payload.data;
  }
};
let actions = {
  colorList({ commit }, payload) {
    getColorList(payload).then(body => {
      commit("listColor", body);
    });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
