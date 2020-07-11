<template>
  <div class="test">
    <!-- <ListEvents/> -->
    <div class="test-container-form">
      <input type="text" placeholder="Title"  v-model="actualTitle">
      <input type="text" placeholder="Description" v-model="actualDescription">
      <input type="date" v-model="actualDate">
      <input type="submit" @click="addEvent">
    </div>
    <div class="area-events"  ref="mount">
      <div class="area"><ListEvents/></div>
      <div class="area"><ListEvents/></div>
      <div class="area"><ListEvents/></div>
      <div class="area"><ListEvents/></div>
    </div>
  </div>
</template>

<script>
import Event from '@/components/Event'
import ListEvents from '@/components/ListEvents'
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid';

export default {
  name:'Test',
  components:{Event,ListEvents},
  data(){
    return{
      deadLine:"",
      arrEvents:[],
      actualDescription:"",
      actualTitle:"",
      actualDate:'0000-00-00',
    }
  }
  ,
  methods:{
    createEvent(newEvent){
      if(typeof(newEvent) === Event){
        arrEvents.push(newEvent);
      }
    },
    addEventToDom(newInstance){
      newInstance.$mount(); /*mount the new instance*/
      // console.log(newInstance.$el);
      this.$refs.containerList.appendChild(newInstance.$el); /*add to the dom*/ 
      /*all the object is referenced with newInstance.$el*/
    },
    createEvent(){
      return[uuidv4(),this.actualTitle,this.actualDescription,this.actualDate];
    },
    validateFields(){
      if(this.actualTitle !== '' && this.actualDescription !== ''){
        return true;  
      }
      else{
        return false;
      }
    },
    addEvent(){
      if(this.validateFields()){
        const arrEvent = this.createEvent();
        let ComponentClass = Vue.extend(Event);
        let instance = new ComponentClass({
          propsData:{
            uniqueId:arrEvent[0],
            title:arrEvent[1],
            description:arrEvent[2],
            deadLine:arrEvent[3]
          }
        });
        this.addEventToDom(instance);
      }
    },
    // startEvent(){
    //   this.actualTitle = 'Test';
    //   this.actualDescription = 'Test desc';
    //   this.actualDate = '2020-07-01';
    //   this.addEvent();
    // }
  },
  mounted(){
    // const size = this.$refs.mount.lenght;
    // for(var i=0;i < size;i++){
    //   var item = this.$refs.mount[i];
    //   console.log(item);
    // }
    //this.actualDate = new Date();
    //this.startEvent();
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  @import '../style/_modulos.scss', '../style/_configs.scss';
  *,html,body{
    margin: 0 0;
    padding:0 0;
    box-sizing: border-box;
  }
  .test{
    width:100vw;
    height:100vh;
    display:flex;
    flex-direction: rows;
    justify-content: center;
    align-content: center;
    &-container-form{
      flex:1;
      border:2px  solid black;
      display:flex;
      flex-direction:column;
      align-items:center;
    }
  }
  .area-events{
      flex:1;
      background:rgba(66, 54, 54, 0.267);
      display:grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      align-content: center;
      .area{
        width:200px;
        height:200px;
        border:2px solid blue;
        display:flex;
        flex-direction:column;
      }
    }
</style>