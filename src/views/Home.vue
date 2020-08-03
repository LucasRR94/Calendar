<template>
  <div class="home">
    <div class="home-header">
      <Header/>
    </div>
    <div class="home-calendar-area">
      <Calendar/>
    </div>
    <div class="home-events">
      <div class="home-events-buttons-container">
        <div class="home-events-buttons-container-btn-container">
          <div class="home-events-buttons-container-btn-container-wrapper" v-bind:class="{'active':!listActive,'inactive':listActive}">
            <button @click="changeMode('add')"></button>
          </div>
        </div>
        <div class="home-events-buttons-container-btn-container">
          <div class="home-events-buttons-container-btn-container-wrapper" v-bind:class="{'active':listActive,'inactive':!listActive}">
            <button @click="changeMode('list')"></button>
          </div>
        </div>  
      </div>
      <div class="home-events-buttons-container-list-or-add">
        <div class="home-events-buttons-container-list-or-add-container" v-if="listActive">
          <EventDisplay/>
        </div>
        <div class="home-events-buttons-container-list-or-add-container" v-else>
          <AddNewEvent/>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import {store} from '../store';
import AddNewEvent from '@/components/AddNewEvent.vue';
import Calendar from '@/components/Calendar.vue';
import Header from '@/components/Header.vue';
import EventDisplay from '@/components/EventDisplay.vue';

export default {
  name: 'Home',
  components:{Calendar,Header,EventDisplay,AddNewEvent},
  data(){
    return{
      listActive:true
    }
  },
  methods:{
    newEvents(){
      return store.getters.getNewEvent;
    },
    changeMode(actualMode){
      if((actualMode === 'add' && this.listActive) || (actualMode === 'list' && !this.listActive)){
        this.changeState();
      }
    },
    changeState(){
      this.listActive = !this.listActive;
    }
  }
}
</script>
<style lang="scss">
  .active{
    width:64px;
    height:64px;
    border-radius: .2rem;
    border:2px solid rgba(#212121,0.4);
  }
  .inactive{
    width:64px;
    height:64px;
    border-radius: .2rem;
    border:2px solid #ffffff;
  }
  html,*,body{
    box-sizing:border-box;
    margin: 0 0;
    padding: 0 0;
    font-family: 'Roboto', sans-serif;
  }
  .home{
    width:100vw;
    height:100vh;
    display: grid;
    grid-template-rows: .1fr .8fr auto;
    justify-content: start;
    align-items: start;
    &-header{
      height:208px;
      width:100%;
    }
    &-calendar-area{
      height:200px;
      min-height: 400px;
      width:100vw;
      display:flex;
      justify-content: center;
      align-items: center;
    }
    &-events{
      width:100%;
      height:100px;
      display:flex;
      flex-direction: column;
      
      &-buttons-container{
        height:80px;
        display:flex;
        flex-direction: row;
        width:99%;
        justify-content: center;
        &-btn-container{
          // flex:.5;
          display: flex;
          // margin: 0 1rem;
          width:150px;
          height:70px;
          &-wrapper{
            width:64px;
            height:64px;
            outline:none;
            // border:2px solid white;
          }
        }
        &-btn-container:first-child{
          justify-content: flex-start;
          button{
            border:2px solid white;
            width:60px;
            height:60px;
            outline:none;
            background: url('../img/btn-add-event.svg') no-repeat center;
            background-size:cover;
          }
          button:active{
            outline:none;
          }
        }
        &-btn-container:nth-child(2){
          justify-content: flex-end;
          button{
            border:2px solid white;
            width:60px;
            height:60px;
            outline:none;
            background: url('../img/btn-list-events.svg') no-repeat center;
            background-size:cover;
          }
          button:active{
            outline:none;
          }
        }
      }
    }
  }
</style>
