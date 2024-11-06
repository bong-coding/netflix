// src/store/modules/movies.js
const state = {
  popularMovies: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_POPULAR_MOVIES(state, movies) {
    state.popularMovies = movies;
  },
  SET_LOADING(state, status) {
    state.loading = status;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  async fetchPopularMovies({ commit }) {
    commit("SET_LOADING", true);
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=ko-KR&page=1"
      );
      const data = await response.json();
      commit("SET_POPULAR_MOVIES", data.results);
    } catch (error) {
      commit("SET_ERROR", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

const getters = {
  popularMovies: (state) => state.popularMovies,
  loading: (state) => state.loading,
  error: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
