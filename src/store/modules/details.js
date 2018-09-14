import { getDetails } from "../../api/index";
let state = {
  info: {},
  currentYear: "全部"
};
let getters = {
  years(state) {
    if (!state.info.data) {
      return [];
    }
    let arr = state.info.data.list.map(item => {
      return item.market_attribute.year;
    });
    let set = new Set(arr);
    return ["全部", ...set];
  },
  list(state) {
    if (!state.info.data) {
      return [];
    }
    function merge(arr) {
      let types = [];
      let obj = {};
      arr.forEach(item => {
        let type =
          item.exhaust_str + "/" + item.max_power_str + " " + item.inhale_type;
        if (types.indexOf(type) == -1) {
          types.push(type);
          obj[type] = [item];
        } else {
          obj[type].push(item);
        }
      });
      return obj;
    }
    if (state.currentYear === "全部") {
      return merge(state.info.data.list);
    } else {
      return merge(
        state.info.data.list.filter(item => {
          return item.market_attribute.year == state.currentYear;
        })
      );
    }
  }
};
let mutations = {
  changeYear(state, payload) {
    state.currentYear = payload;
  },
  updateInfo(state, payload) {
    // console.log(payload.data.list);
    payload.data.list.sort((a, b) => {
      if (b.market_attribute.year != a.market_attribute.year) {
        return b.market_attribute.year - a.market_attribute.year;
      } else {
        if (b.exhaust_str > a.exhaust_str) {
          return 1;
        } else if (b.exhaust_str < a.exhaust_str) {
          return -1;
        } else {
          if (b.max_power_str > a.max_power_str) {
            return 1;
          } else if (b.max_power_str < a.max_power_str) {
            return -1;
          } else {
            if (
              b.market_attribute.dealer_price_min >
              a.market_attribute.dealer_price_min
            ) {
              return 1;
            } else {
              return -1;
            }
          }
        }
      }
    });
    state.info = payload;
  }
};
let actions = {
  getDetailList({ commit }, payload) {
    getDetails(payload).then(body => {
      commit("updateInfo", body);
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
