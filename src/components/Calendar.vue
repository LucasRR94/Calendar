<template>
  <main>
    <div class="calendar">
      <div class="calendar-header">
        <div class="calendar-header-input-area">
          <div class="mini-display" v-if="visualizeMonthDisplay">
            <MiniDisplay  
            v-on:closeDisplay="closeDisplay" 
            v-on:upActual="upActual"
            v-on:downActual="downActual"
            v-bind:actualOperator="abreviation()"
            v-bind:usedForYearOrMonth="'month'"/>
          </div>
          <span @click="showDisplayMonth()">{{abreviation()}}</span>    
        </div>
        <div class="calendar-header-input-area">
          <div class="mini-display" v-if="visualizeYearDisplay">
            <MiniDisplay  
            v-on:closeDisplay="closeDisplay" 
            v-on:upActual="upActual"
            v-on:downActual="downActual"
            v-bind:actualOperator="year"
            v-bind:usedForYearOrMonth="'year'"/>
          </div>
          <span @click="showDisplayYear()">{{year}}</span>
        </div>
      </div>
      <div class="calendar-body">
        <ul class="calendar-body-wrapper-headers">
          <li class="calendar-body-wrapper-headers-days" 
          v-for="(index,i) in daysOfWeekList" :key="i">
            <span>{{daysOfWeekList[i]}}</span>
          </li>
        </ul>
        <ul class="calendar-body-wrapper-weeks">
          <li class="calendar-body-wrapper-weeks-days" 
          v-for="(j,index1) in getTheSizeOfListOfDays()" :key="index1"> 
            <div class="calendar-body-wrapper-weeks-days-day" 
            v-bind:class="{'other-month-grey':!actualMonth(index1)}">
              <div class="calendar-body-wrapper-weeks-days-day-container" 
              v-bind:class="{'evidence-day':evidenceday(index1)}" @click="inEvidence(index1)">
                <span>{{getActualDay(index1)}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import ListEvents from './ListEvents.vue';
import Event from '@/components/Event';
import { v4 as uuidv4 } from 'uuid';
import {store} from '../store';
import MiniDisplay from '@/components/MiniDisplay.vue';
import { mapGetters } from 'vuex';

export default{
  name:'Calendar',
  components:{
    MiniDisplay
  },
  data(){
    return{
      visualizeMonthDisplay:false,
      visualizeYearDisplay:false,
      requestMiniDisplay:false,
      usedForYearOrMonth:'',
      days:7,
      year:'',
      month:'',
      maxLenghtMonth:0,
      maxLenghtOfLastMonth:0,
      monthsExplicit:{
        1:"JANUARY",
        2:"FEBRUARY",
        3:"MARCH",
        4:"APRIL",
        5:"MAY",
        6:"JUNE",
        7:"JULY",
        8:"AUGUST",
        9:"SEPTEMBER",
        10:"OCTOBER",
        11:"NOVEMBER",
        12:"DECEMBER"
      },
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
      arrayOfEventsForListEvents:[],
      evidenceDayPosition:-1,    
    }
  },
  computed:{
    ...mapGetters(['getnewEventObj']),
    getNewEvent(){
      return this.getnewEventObj;
    },
    signal(){
      return store.getters.getIdOfDragged;
    }
  },
  watch:{
    getNewEvent(){
      // getNewEvent ....
    },
    arrayOfEventsForListEvents(){
      store.commit('setlistOfListOfEvents',this.arrayOfEventsForListEvents);
    },
    year(){
      if(this.year <= 1969 ){
        this.year = 1970;
      }
    },
    month(){
      if(this.month <= 0){
        this.month = 12;
      }
      if(this.month>12){
        this.month = 1;
      }
    }
  },
  methods: {
    upActual(param){
      if((param) == 'month'){
        this.month++;
      }else{
        this.year++;
      }
    },
    downActual(param){
      if((param) == 'month'){
        this.month--;
      }else{
        this.year--;
      }
    },
    closeDisplay(param){
      this.genCalendarAndLoadEvents();
      this.showMiniDisplay(param);
    },
    showDisplayYear(){
      this.used = "year";
      return this.showMiniDisplay('year');  
    },
    showDisplayMonth(){
      this.used = "month";
      return this.showMiniDisplay('month');  
    },
    showMiniDisplay(actualDisplay){
      if(actualDisplay === 'year'){
        this.visualizeYearDisplay = !this.visualizeYearDisplay;
      }
      if(actualDisplay === 'month'){
        this.visualizeMonthDisplay = !this.visualizeMonthDisplay;
      }
      else{
        return ;
      }
    },
    inEvidence(index){
      const actual = index + 1;
      const ItsActualMonth = this.actualMonth(index);
      if((ItsActualMonth)){ // Is valid day
        this.evidenceDayPosition = (actual - this.offsetDaysOfMonth); 
      } 
    },
    evidenceday(position){
      if(this.actualMonth(position)){ // it's a valid month
        if(this.evidenceDayPosition == (position + 1 - this.offsetDaysOfMonth)){
          return true;
        }
        else{
          return false;
        }
      }else{
        return false;
      }
    },
    abreviation(){
      let finalReturn = "";
      try{
        const abreviationExplicitMonth = this.monthsExplicit[this.month].substring(0,3);
        finalReturn = abreviationExplicitMonth;
      }
      catch(err){
        finalReturn = "";
      }
      finally{
        return finalReturn;
      }
    },
    actualMonth(index){
      const actual = index + 1;
      if((index < this.offsetDaysOfMonth) || !(actual <= (this.maxLenghtMonth + this.offsetDaysOfMonth))){
        return false;
      }
      else{
        return true;
      }  
    },
    getActualDay(index){
      const actual = index + 1;
      if(index < this.offsetDaysOfMonth){
        return (this.maxLenghtOfLastMonth -  (this.offsetDaysOfMonth - (index + 1)));
      }
      else{
        if(actual <= (this.maxLenghtMonth + this.offsetDaysOfMonth)){
          return (actual - this.offsetDaysOfMonth);
        }
        else{
          return (actual - this.offsetDaysOfMonth) - this.maxLenghtMonth;
        }
      }
    },
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
    $_createEvent(description,title,dateSchedule,fullDescriptionSchedule){
      const idGenerated = uuidv4();
      return{
        "id":idGenerated,
        "title":title,
        "description":description,
        "scheduleDay":dateSchedule,
        "fullSchedule":{fullDescriptionSchedule}
        };
    },
    $_validateFields(title,description){
      if(title !== '' && description !== ''){
        return true;
      }
      else{
        return false;
      }
    },
    $_validationDate(dateSchedule){
      if(dateSchedule!==''){
        const actualDate = new Date();
        const newDeadLineDate = new Date(dateSchedule);
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
    newEvent(description,title,dateSchedule,fullDescriptionSchedule){
      if(!this.$_validateFields(description,title)){ return ; } // contain the fields empty
      if(!this.$_validationDate(dateSchedule)){ // change the calendar to the month and year of the event that is beeing added.
        const dateStr = dateSchedule.split("-");
        this.year = Number(dateStr[0]);
        this.month = Number(dateStr[1]);
        this.genCalendar(); // Change the calendar to other month
      }
      const arrEvent = this.$_createEvent(description,title,dateSchedule,fullDescriptionSchedule); // contains obj Event
      const idEvent = arrEvent["id"];
      const dateStr = dateSchedule.split("-");
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
      const lastMonth = () => {
        return (this.month - 1 == 0) ? 12 : this.month -1;
      };
      this.getFirstDayOfMonth();
      this.maxLenghtMonth = this.getLenthOfMonthInDays(this.month);
      this.maxLenghtOfLastMonth = this.getLenthOfMonthInDays(lastMonth());
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
    
    getLenthOfMonthInDays(month){
      const actualMonth = Number(month);
      let maxSize = 0;
      if(actualMonth >0 && actualMonth <=12){
        if(actualMonth==2){
          (this.isLeapYear(this.year) == true) ? maxSize = 29 : maxSize=28;
        }
        else{
          (actualMonth==4)||(actualMonth==11)|| (actualMonth==9)||(actualMonth==6) ? maxSize=30 : maxSize = 31;
        }
        return maxSize;
      }
      else{
        return 0;
      }
    }
  },
  mounted(){
    this.setInitualValueYearMonth();
    this.genCalendar();
    this.setEventsForListEvents();
  }
}
</script>

<style lang='scss'>
  @import '../style/modulos.scss','../style/Calendar_Style.scss';
  *{
    margin:0 0;
    padding: 0 0;
    box-sizing:border-box;
    font-family: 'Roboto', sans-serif;
  }

</style>
