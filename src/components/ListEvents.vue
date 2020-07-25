<template>
  <div class="list-events" ref='containerEvents'>
    <div class="show-event" v-if="bigCardActive" v-on:click="deactiveBigCard">
      <div class="show-event-title">
        {{actualCardShow.title}}
      </div>
      <div class="show-event-description">
        {{actualCardShow.description}}
      </div>
    </div>
    <section class="list-events-litle-views-events">
        <ul class="list-events-litle-views-events-list">
          <li v-for="ind in copyCalendar" :key="ind.id">
            <Event :idParent="id" v-bind:uniqueId="ind.id" :title="ind.title"/>
          </li>
        </ul>
    </section>
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
      EventInBigCard:-1,
      bigCardActive:false,
      numbEvents: {
        actualNumber:0,
        maxNumber:5,
      },
      actualCardShow:{
        id:"",
        title:"",
        description:""
      },
    }
  },
  components:{
    Event
  },
  computed:{
    copyCalendar(){
      return this.extractTheListOfEvents(store.getters.getlistOfListOfEvents);
    }
  },
  methods: {
    extractTheListOfEvents(arr){
      const position = Number(this.id.split("-")[2]);
      return arr[position];
    },
    deactiveBigCard(){
      this.bigCardActive = false;
    },
    activeBigCard(){
      this.bigCardActive = true;
    },
    simpleCheck(){
      if(this.activeEvents!=undefined){
        return false;
      }
      else{
        if(typeof(this.activeEvents)=='object'){
          if(this.activeEvents.length!=0){
            return true;
          }
          else{
            return false;
          }  
        }
      }
    },
    countDivs(){ // if true show just on list mode
      const numbChilds =  this.$refs.containerEvents.childNodes.length;
      return  numbChilds < 5 ?  true :  false;
    },
    addEventDragDrop(){
      const container = this.$refs.containerEvents;
      container.addEventListener('dragover', function(e){
        e.preventDefault();
        });
      container.addEventListener('dragenter', function(e){ 
        e.preventDefault();
        });
      container.addEventListener('dragleave', (e) => {
        e.preventDefault();
        });
      container.addEventListener('drop',(e) => {
        e.preventDefault();
        const oldLocation = store.getters.getIdOfDragged;
        console.log(oldLocation.split(":")[0] != this.id);
        if(oldLocation.split(":")[0] != this.id){
          this.$emit("droppedEvent",oldLocation,this.id);
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
    max-height: inherit;
    &-litle-views-events{
      width:auto;
      height:auto;
      &-list{
        list-style:none;
      }
    }
  }
  // .sizing-cell-day{
  //   background: rgb(40, 150, 250);
  // }
</style>
