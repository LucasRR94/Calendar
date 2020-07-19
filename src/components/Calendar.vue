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
          <input type="number" name="input-year" min="1970" v-on:input="genCalendar" v-model="year" placeholder="year">
        </div>
        <div class="calendar-header-input-area">
          <input type="number" name="input-month" min="1" v-on:input="genCalendar" v-model="month" placeholder="month">
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
              <ListEvents :id="getId(index1+1-offsetDaysOfMonth,month,year)"/>
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


export default {
  name:'Calendar',
  data(){
    return{
      newDeadLine:'',
      newTitle:'',
      newContent:'',
      days:7,
      weeks:0,
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
      darkMode:true,
      lightMode:false
    }
  },
  components:{
      ListEvents
  },
  methods:{
    addEventToDom(newInstance,day){
      newInstance.$mount(); /*the new instance*/
      day.appendChild(newInstance.$el); /*add to the dom*/
      /*all the object is referenced with newInstance.$el*/
    },
    createEvent(){
      return[uuidv4(),this.newTitle,this.newContent,this.newDeadLine];
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
        if ((newDeadLineDate.getUTCMonth()+1) === (actualDate.getUTCMonth()+1) &&
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
    newEvent(){
      if(this.validationDate()){
        let dayListEvents = document.getElementById(this.newDeadLine);
        if(this.validateFields() && dayListEvents!= null){
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
          this.addEventToDom(instance,dayListEvents);
        }
      }else{
        console.log("required change month");
      }
    },
    getId(day,month,year){
      let finalDay = day;
      let finalMonth = month;
      if(day < 10){
        finalDay = `0${day}`;
      }
      if(month < 10){
        finalMonth = `0${month}`;
      }
      return `${year}-${finalMonth}-${finalDay}`;
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
      this.loadLengthOfMonth();
      this.offsetDaysOfMonth = this.daysOfWeekList.indexOf(this.firstDayOfmonth);
      if(this.validationMonth(this.month) && this.validationYear(this.year)){
        if(Number(this.month) == 2){
          this.isLeapYear(Number(this.year))?this.weeks = 5 :this.weeks = 4
        }
        else{
          this.weeks = 5;
        }
      }
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
    loadLengthOfMonth(){
      const actualMonth = Number(this.month);
      if(actualMonth <=12){
        if(actualMonth==2){
          (this.isLeapYear(this.year) == true) ? this.maxLenghtMonth = 29 : this.maxLenghtMonth=28;
        }
        else{
          (actualMonth==4)||(actualMonth==11)|| (actualMonth==9)||(actualMonth==6) ? this.maxLenghtMonth=30 : this.maxLenghtMonth=31;
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
