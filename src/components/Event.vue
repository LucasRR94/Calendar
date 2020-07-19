<template>
  <div class="event" draggable="true" ref="eventObj">
    <div class="event-wrapper" v-show="show" @click="changeShowDescription" ref="eventShowDescId">
      <div class="event-wrapper-title">
        <span>{{title}}</span>
      </div>
      <div class="event-wrapper-description" ref="descriptionRef">
        <span>{{description}}</span>
      </div>
    </div>
    <div class="event-title" v-show = "showIcon" @click="changeShowDescription">
      <div class="event-title-wrapper">
        <span>{{title}}</span>
      </div>
    </div>
  </div>

</template>
<script>
import eventImg from '../img/icon1.svg';
import {store} from '../store';

export default {
  name:'Event',
  props:["uniqueId","title","description","deadLine"],
  data(){
    return{
      showIcon:true,
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
      const top = this.$refs.eventObj.offsetTop;
      const left = this.$refs.eventObj.offsetLeft;
      // this.show=!this.show;
      // this.showIcon = !this.showIcon;
      // if(this.description.length > 20){
      //   this.$refs.descriptionRef.style.overflow='scroll';
      // }
      this.loadBigView();
      store.commit('setTrigEvent');
    },
    loadBigView(){
      store.commit('setEventObjs',[this.title,this.description]);
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
    //this.counter();
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
    max-width:170px;
    max-height:200px;
    padding:.2rem;
    width:auto;
    height:auto;
    &-wrapper{
      width:170px;
      height:200px;
      background: $main-color-card;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding:.2rem;
      position:absolute;
      z-index:2;
      div{
        margin-top:.2rem;
        width: auto;
        height: auto;
        border:1px solid $primary-divider-card-icon;
        border-radius: .2rem;
        span{
          padding:.2rem;
        }
      }
      &-title{
        flex:.4;
        text-align:center;
      }
      &-description{
        flex:1;
        text-align:start;
      }
      span{
        color:$text-color-card-icon;
        font-size:1.2rem;
      }
    }
    &-title{
      width:auto;
      height:auto;
      border-radius:.2rem;
      background:$primary-green-icon;
      padding:.3rem;
      position: static;
      &-wrapper{
        font-size:1.2rem;
        color:$primary-green-font-icon;
      }
      &-wrapper:hover{
        color:$hovered-green-icon-font;
      }
    }
    &-title:hover{
        background:$hovered-green-icon; 
    }
    
  }
</style>
