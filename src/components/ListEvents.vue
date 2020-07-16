<template>
  <div class="list-events" ref='containerEvents'>

  </div>
</template>

<script>
import Event from './Event.vue';
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid';
import {store} from '../store';

export default {
  name:"ListEvents",
  props:['idListEvents'],
  data(){
    return{
      numbEvents: {
        actualNumber:0,
        maxNumber:5
      }
    }
  },
  methods: {
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
    border:2px solid red;
    width:200px;
    height:200px;
    background: white;
    display:grid;
    grid-template-rows:auto;
    justify-content: start;
    align-items: start;
    overflow: scroll;
    div{
      margin:0.2rem 0rem;
    }
  }
</style>
