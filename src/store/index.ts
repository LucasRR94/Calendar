import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const store = new Vuex.Store({
  state: {
    listOfListOfEvents:[],
    idOfDragged:"",
    actualDate:{
      day:'20',
      month:'JULY',
      year:'1970'
    },
    paramToMiniDisplay:0,
    actualYear:'',
    actualMonth:'',
    newEventObj:''
    // objDragged:{},
    // eventTriggered:false,
    // idParent:'',
    // eventObjs:{
    //   title:'',
    //   description:'',
    // },
    // objEvent:{},
    // idLastParent:'',
    // idNewParent:'',
    // requiredTransfer:false,
    // requiredInserted:false,
    // idEventDroped:'',
    // clearRequired:false,
    // registerEventListEvent:{},
    // idTrigger:'',
    // idEventCloseBigView:'',
    // idTrigCloseBigView:false,
  },
  mutations:{
    setNewEventObj(state,newEvent){
      state.newEventObj = newEvent;
    },
    setlistOfListOfEvents(state,newList){
      state.listOfListOfEvents = newList;
    },
    setDraggedEvent(state,eventDragged){
      state.idOfDragged = eventDragged;
    },
    setActualDate(state,newDate){
      state.actualDate = newDate;
    },
    setParamToMiniDisplay(state,newParam){
      state.paramToMiniDisplay = newParam;
    },
    setActualYear(state,newYear){
      state.actualYear = newYear
    },
    setActualMonth(state,newMonth){
      state.actualMonth = newMonth;
    }
    // setTrigerCloseBigView(state){
    //   state.idTrigCloseBigView = !state.idTrigCloseBigView;
    // },
    // closingBigView(state,[id]){
    //   state.idEventCloseBigView = id;
    // },
    // setKeyEventValueListEvent(state: any, [idEvent, idListEvent]){
    //   state.registerEventListEvent[idEvent] = idListEvent;
    // },
    // trigClearRequired(state){
    //   state.clearRequired = !state.clearRequired;
    // },
    // setIdNewParent(state,id){
    //   state.idNewParent = id;
    // },
    // setIdLastParent(state,id){
    //   state.idLastParent = id;
    // },
    // trigRequiredInserted(state){
    //   state.requiredInserted = !state.requiredInserted;
    // },
    // trigRequiredTransfer(state){
    //   state.requiredTransfer=!state.requiredTransfer;
    // },
    // setObjDroppedObjEvent(state,[obj]){
    //   state.objEvent = obj;
    // },
    // setObjDropped(state,[id]){
    //   state.idEventDroped = id;
    // },
    // setTrigEvent(state){
    //   state.eventTriggered = !state.eventTriggered;
    // },
    // setTriggeredId(state,[id]){
    //   state.idTrigger = id;
    // },
    // idParent(state,[id]){
    //   state.idParent = id;
    // },
    // setobjDragged (state , obj) {
    //   state.objDragged = obj;
    // },
    // setEventObjs(state,[title,description]){
    //   state.eventObjs.title = title;
    //   state.eventObjs.description = description;
    // }
  },
  actions: {
  },
  getters:{
    getnewEventObj : (state) => {return state.newEventObj;},
    getlistOfListOfEvents: (state) => {return state.listOfListOfEvents;},
    getIdOfDragged : (state) =>{return state.idOfDragged;},
    getActualDate : (state) => {return state.actualDate;},
    getParamToMiniDisplay: (state) =>{return state.paramToMiniDisplay;},
    getActualYear: (state) =>{return state.actualYear;},
    getActualMonth: (state) =>{return state.actualMonth;}
    // getIdTrigCloseBigView : (state) => {return state.idTrigCloseBigView},
    // getIdCloseBigView : (state) =>{return state.idEventCloseBigView;},
    // getIdTrigger:(state) => {return state.idTrigger;},
    // getRequiredInserted :(state) => {return state.requiredInserted;},
    // getKeyEventValueListEvent:(state)=>{return state.registerEventListEvent;},
    // getClearRequired :(state) =>{return state.clearRequired;},
    // getIdNewParent :(state) =>{return state.idNewParent;},
    // getIdLastParent : (state) => {return state.idLastParent;},
    // getTrigRequiredTransfer:(state)=>{return state.requiredTransfer;},
    // getobjDragged:(state) => { return state.objDragged;},
    // getEventTriggered : (state) => {return state.eventTriggered},
    // getEventObjTitle:(state) => {return state.eventObjs.title},
    // getEventObjDescription:(state) => {return state.eventObjs.description},
    // getidParent:(state) => {return state.idParent;},
    // getIdEventDroped : (state) =>{return state.idEventDroped;},
    // getobjEvent : (state) =>{return state.objEvent;}
  }
})
