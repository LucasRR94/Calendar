<template>
  <div class="list-events sizing-cell-day" ref='containerEvents'>
    <div class="show-event" v-if="bigView">
      <div class="show-event-title">
        {{getTitle}}
      </div>
      <div class="show-event-description">
        {{getDescription}}
      </div>
    </div>
  </div>
</template>

<script>
import Event from './Event.vue';
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid';
import {store} from '../store';

export default {
  name:"ListEvents",
  props:['id'],
  data(){
    return{
      numbEvents: {
        actualNumber:0,
        maxNumber:5
      }
    }
  },
  computed:{
    bigView(){
      return store.getters.getEventTriggered;
    },
    getTitle(){
      return store.getters.getEventObjTitle;
    },
    getDescription(){
      return store.getters.getEventObjDescription;
    }
  },
  methods: {
    loadEvent(){
      console.log('triggered');
    },
    countDivs(){ // if true show just on list mode
      const numbChilds =  this.$refs.containerEvents.childNodes.length;
      return  numbChilds < 5 ?  true :  false;
    },
    addEventDragDrop(){
      const container = this.$refs.containerEvents;
      container.addEventListener('dragover', function(e){
        e.preventDefault();});
      container.addEventListener('dragenter', function(e){e.preventDefault();});
      container.addEventListener('dragleave', (e) => {
        e.preventDefault();
        });
      container.addEventListener('drop',(e) => {
        const objEvent = store.getters.getobjDragged;
        e.preventDefault();
        if(this.countDivs()){
          this.$refs.containerEvents.appendChild(objEvent);
        }
      });

    }
  },
  mounted(){
    this.addEventDragDrop();
    this.$refs.containerEvents.id = this.id;
  }
}
</script>

<style lang='scss'>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  @import '../style/_modulos.scss', '../style/_configs.scss';

  html,*,body{
    margin: 0 0;
    padding: 0 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  .list-events{
    width:100%;
    height:100%;
    display:grid;
    grid-template-rows:1fr;
    justify-content: start;
    align-items: start;
    overflow: scroll;
    max-height: inherit;
  }
  .sizing-cell-day{
      background: rgb(40, 150, 250);
  }
</style>
