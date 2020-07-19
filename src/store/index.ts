import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    objDragged:{},
    eventTriggered:false,
    eventObjs:{
      title:'',
      description:''
    }
  },
  mutations: {
    setTrigEvent(state){
      state.eventTriggered = !state.eventTriggered;
      console.log(state.eventTriggered)
    },
    setobjDragged (state , obj) {
      state.objDragged = obj;
    },
    setEventObjs(state,[title,description]){
      state.eventObjs.title = title;
      state.eventObjs.description = description;
    }
  },
  actions: {
  },
  getters:{
    getobjDragged:(state) => { return state.objDragged;},
    getEventTriggered : (state) => {return state.eventTriggered},
    getEventObjTitle:(state) => {return state.eventObjs.title},
    getEventObjDescription:(state) => {return state.eventObjs.description}
  }
})
