// src/store/modules/auth.js
const state = {
  user: null,
  isLoggedIn: false,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
    state.isLoggedIn = true;
  },
  LOGOUT(state) {
    state.user = null;
    state.isLoggedIn = false;
  },
};

const actions = {
  login({ commit }, user) {
    commit("SET_USER", user);
  },
  logout({ commit }) {
    commit("LOGOUT");
  },
};

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
