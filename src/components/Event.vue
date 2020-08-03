<template>
  <div class="event" draggable="true" ref="eventObj">
    <div class="event-title">
      <div class="event-title-wrapper">
        <span>{{title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from '../store';

export default {
  name:'Event',
  props:["idParent","uniqueId","title"],
  data(){
    return{
      
    }
  },  
  methods:{
    /* remain ...*/
    addEventDragAndDrop(){
      const ref = this.$refs.eventObj;
      const _this = this;

      ref.addEventListener('dragstart',(e)=>{
        store.commit('setDraggedEvent',`${this.idParent}:${this.uniqueId}`);
        setTimeout(()=>{
          e.target.className='hidden';
        },0);
      });

      ref.addEventListener('dragend',(e)=>{
        e.preventDefault();
        console.log(e);
        e.target.className = 'event';
      });
    },
    createId(){
      this.$refs.eventObj.id = `${this.id}`;
    }
  },
  mounted(){
    this.createId();
    this.addEventDragAndDrop();
  }
}
</script>

<style lang="scss">
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
