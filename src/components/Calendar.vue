<template>
  <main>
    <div class="create-event">
      <div class="create-event-wrapper">
          <h3>Create New Event</h3>
          <input type="text" name="new title" v-model="newTitle" placeholder="Título">
          <input type="text" name="new content" v-model="newContent" placeholder="Conteúdo">
          <input type="date" v-model="newDeadLine">
          <input type="submit" value="Novo Título" @click="newEvent">
      </div>
    </div>
    <div class="calendar" v-bind:class="{'dark-mode':darkMode,'light-mode':lightMode}">
      <div class="calendar-header"  v-bind:class="{'header-dark-mode':darkMode,'header-light-mode':lightMode}">
        <div class="calendar-header-input-area">
          <input type="number" name="input-year" min="1970" v-on:input="genCalendarAndLoadEvents" v-model="year" placeholder="year">
        </div>
        <div class="calendar-header-input-area">
          <input type="number" name="input-month" min="1" v-on:input="genCalendarAndLoadEvents" v-model="month" placeholder="month">
        </div>
      </div>
      <div class="calendar-body" v-bind:class="{'body-dark-mode':darkMode,'body-light-mode':lightMode}">
        <ul class="calendar-body-wrapper-headers">
          <li class="calendar-body-wrapper-headers-days" v-bind:class="{'border-right-extra':isNotCorner(i+1)}" v-for="(index,i) in daysOfWeekList" :key="i"><span>{{daysOfWeekList[i]}}</span></li>
        </ul>
        <ul class="calendar-body-wrapper-weeks">
          <li class="calendar-body-wrapper-weeks-days" v-bind:class="{'border-right-extra':isNotCorner(index1+1)}" v-for="(j,index1) in getTheSizeOfListOfDays()" :key="index1">
            <div class="calendar-body-wrapper-weeks-days-day days-week" v-if="(index1 >= offsetDaysOfMonth && !indexBiggerThenSizeOfMonth(index1 + 1 - offsetDaysOfMonth))">
              <span>{{(index1+1-offsetDaysOfMonth)}}</span>
              <ListEvents :id="getId(index1+1-offsetDaysOfMonth,month,year)" @droppedEvent="changeEventForOtherList"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <button @click="changeMode">Change!!!</button> 
  </main>
</template>

<script>
import Vue from 'vue'
import ListEvents from './ListEvents.vue';
import Event from '@/components/Event';
import { v4 as uuidv4 } from 'uuid';
import {store} from '../store';

export default{
  name:'Calendar',
  data(){
    return{
      newDeadLine:'',
      newTitle:'',
      newContent:'',
      days:7,
      year:'',
      month:'',
      maxLenghtMonth:0,
      daysOfWeekList:[
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ],
      firstDayOfmonth:'Sun',
      offsetDaysOfMonth:0,
      darkMode:false,
      lightMode:true,
      objEvent:[],
      idOfListEvents:'',
      listOfEvents:{},
      arrayOfEventsForListEvents:[]
    }
  },
  components:{
      ListEvents
  },
  computed:{
    signal(){
      return store.getters.getIdOfDragged;
    }
  },
  watch:{
    arrayOfEventsForListEvents(){
      store.commit('setlistOfListOfEvents',this.arrayOfEventsForListEvents);
    }
  },
  methods: {
    changeEventForOtherList(oldLocation,newLocation){
      const oldLocal = oldLocation.split(":"); 
      const oldKey = oldLocal[0];
      const idEvent = oldLocal[1];
      const event = this.getEventFromListEvents(oldKey,idEvent);
      this.setNewEventInlistOfEvents(newLocation.split("-"),event,idEvent);
      this.setEventsForListEvents();
    },
    getEventFromListEvents(localitization,idEvent){
      /*this method , get an element,and eliminate from list Events*/
      const dateStr = localitization.split("-");
      const data = this.listOfEvents[dateStr[0]][dateStr[1]][dateStr[2]][idEvent];  
      delete(this.listOfEvents[dateStr[0]][dateStr[1]][dateStr[2]][idEvent]); // del the key
      return data;
    },
    genCalendarAndLoadEvents(){
      this.genCalendar();
      this.setEventsForListEvents();
    },
    setEventsForListEvents(){
      this.arrayOfEventsForListEvents = [];
      const sizeInDays = this.maxLenghtMonth;
      const eventsRegistred = this.findEventsOfMonth();
      let sizeOfRegistredEvents = 0;
      try{
        sizeOfRegistredEvents = Object.keys(eventsRegistred).length;
      }
      catch(err){
        sizeOfRegistredEvents = 0;
      }
      finally{
        if(sizeOfRegistredEvents == 0){
          for(let i = 0;i < sizeInDays;i++){
            this.arrayOfEventsForListEvents.push([]);
          }
        }else{
          for(let i = 0;i < sizeInDays;i++){
            let possibleEvent;
            try{
              possibleEvent = eventsRegistred[i];
              this.arrayOfEventsForListEvents.push(possibleEvent);   
            }
            catch(err){
              this.arrayOfEventsForListEvents.push([]);   
            }
          }
        
        }
      }
    },
    findEventsOfMonth(){
      /*Search in list events for specific year, month
      to load in component listEvents*/
      let result = {};
      try{
        const month = this.listOfEvents[this.year][this.month];
        return month;
      }
      catch(err){
        return {};
      }
    },
    createEvent(){
      const idGenerated = uuidv4();
      return{
        "id":idGenerated,
        "title":this.newTitle,
        "description":this.newContent,
        "hour":this.newDeadLine
        };
    },
    validateFields(){
      if(this.newTitle !== '' && this.newContent !== ''){
        return true;
      }
      else{
        return false;
      }
    },
    validationDate(){
      if(this.newDeadLine!==''){
        const actualDate = new Date();
        const newDeadLineDate = new Date(this.newDeadLine);
        if((newDeadLineDate.getUTCMonth()) === (actualDate.getUTCMonth()) &&
      (newDeadLineDate.getUTCFullYear()) === (actualDate.getUTCFullYear())){
          return true;
        }else{
          return false; // required change month
        }
      }
      else{
        return false;
      }
    },
    createObjKeyIfNotExist(mainObj,option){
      let cond = true;
      let i = 0;
      let copyObj = mainObj;
      while(cond){
          if(i == 3){
              cond = false;
          }
          else{
              let objTest;
              objTest = copyObj[option[i]];
              if(typeof(objTest) == 'undefined'){
                  let backup = {};
                  copyObj[option[i]] = backup;
                  copyObj = backup;
              }
              if(typeof(objTest) == 'object'){
                  let backup = {};
                  backup = copyObj[option[i]];
                  copyObj = backup;
              }
          }
          i++;
      }
      return copyObj;
    },
    setNewEventInlistOfEvents(dateStr,event,idEvent){
      const option = [String(Number(dateStr[0])),String(Number(dateStr[1])),String(Number(dateStr[2]))];
      const day = this.createObjKeyIfNotExist(this.listOfEvents,option);
      day[idEvent] = event; // added event in the object listEvents
    },
    newEvent(){
      if(!this.validateFields()){ return ; } // contain the fields empty
      if(!this.validationDate()){ // change the calendar to the month and year of the event that is beeing added.
        const dateStr = this.newDeadLine.split("-");
        this.year = Number(dateStr[0]);
        this.month = Number(dateStr[1]);
        this.genCalendar(); // Change the calendar to other month
      }
      const arrEvent = this.createEvent(); // contains obj Event
      const idEvent = arrEvent["id"];
      const dateStr = this.newDeadLine.split("-");
      this.setNewEventInlistOfEvents(dateStr,arrEvent,idEvent);
      this.setEventsForListEvents();
    },
    getId(day,month,year){
      return `${year}-${month}-${day}`;
    },
    changeMode(){
      this.lightMode = this.darkMode;
      this.darkMode = !this.lightMode;
    },
    isLeapYear(year){
      if(year%400 ==0){
        return true;
      }
      else{
        if(year%4==0 && year%100!=0){
          return true;
        }
        else{
          return false;
        }
      }
    },
    isNotCorner(actualIndex){
      return (actualIndex == 0) || !(actualIndex % 7==0);
    },
    getTheSizeOfListOfDays(){
      // Uses the offset of first day of month and the lenght of month,and aproximate to number of days of weeks
      return (Math.ceil((this.daysOfWeekList.indexOf(this.firstDayOfmonth) + this.maxLenghtMonth)/7))*7;
    },
    validationMonth(month){
      if(Number(month) < 13 && Number(month) > 0){
        return true;
      }
      return false;
    },
    validationYear(year){
      if(Number(year)>=0){
        return true;
      }
      return false;
    },
    setInitualValueYearMonth(){
      const obj = new Date;
      this.month = (Number(obj.getUTCMonth())+1);
      this.year = obj.getUTCFullYear();
    },
    genCalendar(){
      this.getFirstDayOfMonth();
      this.getLenthOfMonthInDays();
      this.offsetDaysOfMonth = this.daysOfWeekList.indexOf(this.firstDayOfmonth);
    },
    indexBiggerThenSizeOfMonth(index){
      if(index <= this.maxLenghtMonth){
        return false;
      }
      else{
        return true;
      }
    },
    getFirstDayOfMonth(){
      const actualDay = new Date;
      const newDay = new Date(`${this.year}/${this.month}/01`); // get the first Day of actual Month
      this.firstDayOfmonth = this.daysOfWeekList[newDay.getDay()];
    },
    getLenthOfMonthInDays(){
      const actualMonth = Number(this.month);
      if(actualMonth >0 && actualMonth <=12){
        if(actualMonth==2){
          (this.isLeapYear(this.year) == true) ? this.maxLenghtMonth = 29 : this.maxLenghtMonth=28;
        }
        else{
          (actualMonth==4)||(actualMonth==11)|| (actualMonth==9)||(actualMonth==6) ? this.maxLenghtMonth=30 : this.maxLenghtMonth = 31;
        }
      }
      else{
        return 0;
      }
    }
  },
  mounted(){
    setTimeout(()=>{
      this.setInitualValueYearMonth();
      this.genCalendar();
      this.setEventsForListEvents();
    },5000);
  }
}
</script>

<style lang='scss'>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  @import '../style/modulos.scss','../style/Calendar_Style.scss';
  *,body,html{
    margin:0 0;
    padding: 0 0;
    box-sizing:border-box;
    font-family: 'Roboto', sans-serif;
  }

</style>
