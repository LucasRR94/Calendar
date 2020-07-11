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
  data(){
    return{
      numbEvents: {
        actualNumber:0,
        maxNumber:5
      }
    }
  },/*idTodoItem: uuidv4()*/
  methods:{
    lessThanTheLimit(){
      if(this.numbEvents.actualNumber < this.numbEvents.maxNumber){
        return true;
      }
      else{
        return false;
      }
    },
    insertedOneEvent(){
      if(this.lessThanTheLimit){
        this.numbEvents.actualNumber++;
      }
    },
    delOneEvent(){
      if(this.numbEvents.actualNumber > 0){
        this.numbEvents.actualNumber--;
      }
    },
    addEventDragDrop(){
      const container = this.$refs.containerEvents;
      const _this = this;
      container.addEventListener('dragover', function(e){e.preventDefault();});
      container.addEventListener('dragenter', function(e){e.preventDefault();});
      container.addEventListener('dragleave', function(e){
        e.preventDefault();
        _this.delOneEvent();
        });
      container.addEventListener('drop',function (e) {
        const objEvent = store.getters.getobjDragged;
        e.preventDefault();
        if(_this.lessThanTheLimit()){
          _this.insertedOneEvent();
          e.target.appendChild(objEvent);
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
    width:200px;
    height:220px;
    background: white;
    display:flex;
    flex-direction: rows;
    justify-content: center;
    align-content: center;
  }
</style>
