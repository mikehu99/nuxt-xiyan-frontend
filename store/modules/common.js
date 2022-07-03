
const state = {
  loginFlag: false,
  registerFlag: false,
  praiseList: [],
  praiseGotten:false
};



// mutations主要用来操作state
const mutations = {
  setLoginFlag(state, loginFlag) { // 布尔值 true
    state.loginFlag = loginFlag;
  },
  setRegisterFlag(state, registerFlag) { // 布尔值 true
    state.registerFlag = registerFlag;
  },
  setPraiseList(state, praiseList) { //数组
    state.praiseList = praiseList;
  },
  setPraiseGotten(state, praiseGotten){
    state.praiseGotten = praiseGotten;
  },
  praise(state, itemId) {
    if (state.praiseList.indexOf(itemId) != -1) {
      state.praiseList.splice(state.praiseList.indexOf(itemId), 1);
    } else {
      state.praiseList.push(itemId);
    }
  },
};

// actions异步请求处理
const actions = {
  getPraiseList({commit, state}) {
    return new Promise((resolve, reject) => {
      console.log(state.praiseGotten);
      if (!state.praiseGotten) {
        commit("setPraiseList", []);
        this.$api.praise.praiseList().then(data => {
          console.log(data)
          commit("setPraiseList", data);
          commit("setPraiseGotten", true);
          resolve(data);
        }).catch((error) => {
          commit("setPraiseGotten", false);
          reject(error);
        });
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
