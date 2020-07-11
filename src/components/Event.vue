<template>
  <div class="event" draggable="true" ref="eventObj">
    <div class="event-container-title" v-if="show" @click="changeShowDescription">
      <span>{{title}}</span>
    </div>
    <div class="event-icon" v-else @click="changeShowDescription">
      <span>E</span>
    </div>
  </div>

</template>
<script>

import eventImg from '../img/icon1.svg';
import {store} from '../store';

export default {
  name:'Event',
  props:["uniqueId","title","description","deadline"],
  data(){
    return{
      titleEvent:this.title,
      descriptionEvent:this.description,
      deadLineEvent:this.deadLine,
      id:this.uniqueId,
      active:false,
      show:false,
    }
  },
  methods:{
    changeShowDescription(){
      this.show=!this.show;
    },
    setDescription(description){
      this.description = description;
    },
    setTitle(title){
      this.title = title;
    },
    getTitle(){
      return this.title;
    },
    setDeadLine(deadLine){
      this.deadline = deadLine;
    },
    setEvent(deadline,description){
      this.setDescription(description);
      this.setDeadLine(deadLine);
    },
    getDeadline(){
      return this.deadLine;
    },
    getDescription(){
      return this.description;
    },
    addEventDragAndDrop(){
      const ref = this.$refs.eventObj;
      const _this = this;
      ref.addEventListener('dragstart',function(e){
        store.commit('setobjDragged',e.target);
        const img = new Image();
        img.src = eventImg;
        e.dataTransfer.setDragImage(img,2,2);
        setTimeout(()=>{
          e.target.className='hidden';
        },0);
      });
      ref.addEventListener('dragend',function(e){
        this.className = 'event';
        e.preventDefault();
      });
    },
    createId(){
      this.$refs.eventObj.id = `id-${this.id}`;
    }
  },
  mounted(){
    this.createId();
    this.addEventDragAndDrop();
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  @import '../style/_modulos.scss', '../style/_configs.scss';

  html,*,body{
    margin: 0 0;
    padding: 0 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  .hidden{
    display:none;
  }
  .event{
    padding:.2rem .2rem;
    width:auto;
    height:auto;
    max-width:200px;
    &-container-title{
      background: black;
      display: flex;
      justify-content: center;
      border-radius:.4rem;
      border:2px solid #f4f4f4;
      span{
        color:blue;
        font-size:1.2rem;
      }
    }
    &-icon{
      max-width:auto;
      max-height:auto;
      border-radius: 1rem;
      background:$primary-green-icon;
      @include center-div;
      span{
        padding:0.2rem;
        font-size:1.2rem;
        color:$primary-green-font-icon;
      }
    }
    &-icon:hover{
      background:$hovered-green-icon;
      span{
        font-size:1.2rem;
        color:$hovered-green-icon-font;
      }
    }
  }
</style>
