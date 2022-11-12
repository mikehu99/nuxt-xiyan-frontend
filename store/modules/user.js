import { getUserInfo, login, logout } from "@/api/auth/auth";

const state = {
  token: "", // token
  user: "", // 用户对象
};

const mutations = {
  SET_TOKEN_STATE: (state, token) => {
    state.token = token;
  },
  SET_USER_STATE: (state, user) => {
    state.user = user;
  },
};

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { name, pass, rememberMe } = userInfo;
    return new Promise((resolve, reject) => {
      this.$api.auth.login({ username: name.trim(), password: pass, rememberMe: rememberMe })
        .then(data => {
          console.log(data)
          commit("SET_TOKEN_STATE", data.user.token);
          commit("SET_USER_STATE", data.user);
          this.$cookies.set('u_token', data.user.token, { maxAge: 60 * 60 * 24 * 1 ,path:"/"})
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.$api.auth.getUserInfo()
        .then((data) => {
          if (!data) {
            commit("SET_TOKEN_STATE", "");
            commit("SET_USER_STATE", "");
            // removeToken();
            this.$cookies.remove('u_token',{path:"/"});
            resolve();
            reject("Verification failed, please Login again.");
          }
          commit("SET_USER_STATE", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 注销
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.$api.auth.logout(state.token)
        .then((response) => {
          commit("SET_TOKEN_STATE", "");
          commit("SET_USER_STATE", "");
          // removeToken();
          this.$cookies.remove('u_token' ,{path:"/"});
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
