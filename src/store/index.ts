import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    objDragged:{}
  },
  mutations: {
    setobjDragged (state , obj) {
      state.objDragged = obj;
    }
  },
  actions: {
  },
  getters:{
    getobjDragged:(state) => { return state.objDragged;}
  }
})
