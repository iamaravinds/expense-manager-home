import Vue from 'vue'
import Vuex from 'vuex'
import dbService from "../service/dbService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null
  },
  mutations: {
    currentUser(state, user) {
      state.user = user;
    }
  },
  getters:{
    getCurrentUser: (state) => {
      return state.user;
    }
  },
  actions: {
    async setCurrentUser({commit},user) {
      console.log('user from store', user);
      const id = user.uid;
      user = await dbService.User.getUserData(id);
      user.id = id;
      commit('currentUser',user );
    },
    clearCurrentUser({commit}) {
      commit('currentUser',null );
    }
  },
  modules: {
  }
})
