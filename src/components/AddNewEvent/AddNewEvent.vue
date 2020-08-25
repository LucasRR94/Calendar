<template>
  <section class='min-size-list-add-event add-new-event'>
    <div class="add-new-event-wrapper">
      <div class="add-new-event-wrapper-container">
        <h2>Add Event</h2>
      </div>
      <div class="add-new-event-wrapper-container form-input">
        <label for="Title">Title:</label>
        <input type="text" 
        v-model="title" placeholder="Title">
      </div>
      <div class="add-new-event-wrapper-container form-input">
        <label for="Description">Description</label>
        <textarea name="Description" 
        cols="3" rows="5" placeholder="Description"
        v-model="description"></textarea>
      </div>
      <div class="add-new-event-wrapper-container">
        <div class="add-new-event-wrapper-container-container-date">

          <div class="add-new-event-wrapper-container-container-date-container">
            <div class="add-new-event-wrapper-container-container-date-container-label">
              <label for="Year">Year</label>  
            </div>
            <div class="add-new-event-wrapper-container-container-date-container-button">
              <button @click="activeYear()">{{finalChooseOptionTime.year}}</button>
            </div>
            <div class="add-new-event-wrapper-container-container-date-container-miniDisplay" v-if="yearChooseActive">
              <AddNewEventInput 
              v-bind:setInput="getSetYear()"
              v-bind:usedFor="'year'"
              v-bind:firstOptionSet="getFirstOptionYear()"
              v-on:finishChoose="setfinalChooseOptionTimes($event)"
              />
            </div>
          </div>

          <div class="add-new-event-wrapper-container-container-date-container">
            <div class="add-new-event-wrapper-container-container-date-container-label">
              <label for="Year">Month</label>
            </div>
            <div class="add-new-event-wrapper-container-container-date-container-button">
              <button @click="activeMonth()">{{monthDisplay}}</button>
            </div>
            <div class="add-new-event-wrapper-container-container-date-container-miniDisplay" v-if="monthChooseActive">
              <AddNewEventInput 
              v-bind:setInput="getSetMonth()"
              v-bind:usedFor="'month'"
              v-bind:firstOptionSet="getFirstOptionMonth()"
              v-on:finishChoose="setfinalChooseOptionTimes($event)"
              />
            </div>
          </div>
          <div class="add-new-event-wrapper-container-container-date-container">
            <div class="add-new-event-wrapper-container-container-date-container-label">
              <label for="Year">Day</label>
            </div>
            <div class="add-new-event-wrapper-container-container-date-container-button">
              <button @click="activeDay()">{{finalChooseOptionTime.day}}</button>
            </div>
            <div class="add-new-event-wrapper-container-container-date-container-miniDisplay" v-if="dayChooseActive">
              <AddNewEventInput 
              v-bind:setInput="getSetDay()"
              v-bind:usedFor="'day'"
              v-bind:firstOptionSet="getFirstOptionDay()"
              v-on:finish-choose="setfinalChooseOptionTimes($event)"
              />
            </div>
          </div>
          <div class="add-new-event-wrapper-container-container-date-container">
            <div class="add-new-event-wrapper-container-container-date-container-label">
              <label for="Year">Hour</label>
            </div>
            <div class="add-new-event-wrapper-container-container-date-container-button">
              <button @click="activeHour()">{{finalChooseOptionTime.hour}}</button>
            </div>
            <div class="add-new-event-wrapper-container-container-date-container-miniDisplay" v-if="hourChooseActive">
              <AddNewEventInput 
              v-bind:setInput="getSetHour()"
              v-bind:usedFor="'hour'"
              v-bind:firstOptionSet="0"
              v-on:finish-choose="setfinalChooseOptionTimes($event)"
              />
            </div>
          </div>
          <div class="add-new-event-wrapper-container-container-date-container">
            <div class="add-new-event-wrapper-container-container-date-container-label">
              <label for="Year">Minute</label>
            </div>
            <div class="add-new-event-wrapper-container-container-date-container-button">
              <button @click="activeMinute()">{{finalChooseOptionTime.minute}}</button>
            </div>
            <div class="add-new-event-wrapper-container-container-date-container-miniDisplay" v-if="minuteChooseActive">
              <AddNewEventInput 
              v-bind:setInput="getSetMinute()"
              v-bind:usedFor="'minute'"
              v-bind:firstOptionSet="0"
              v-on:finishChoose="setfinalChooseOptionTimes($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="add-new-event-wrapper-container">
        <div class="add-new-event-wrapper-container-container-send-btn">
          <button @click="addNewEvent()">Add Event</button>
        </div>
      </div>
    </div>  
  </section>
</template>

<script>
import AddNewEventInput from './AddNewEventInput.vue';
import {store} from '../../store';

export default {
  name:'AddNewEvent',
  components:{AddNewEventInput},
  data(){
    return{
      yearChooseActive:false,
      monthChooseActive:false,
      dayChooseActive:false,
      hourChooseActive:false,
      minuteChooseActive:false,
      title:'',
      description:'',
      setMonthExplicit:{
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
      timeEvent : {
        year:'',
        month:'',
        day:'',
        hour:'',
        minute:''
      },
      actualDate:'',
      firstOption:{
        year:"",
        month:"",
        day:""
      },
      finalChooseOptionTime:{
        year:"",
        month:"",
        day:"",
        hour:"",
        minute:""
      }
    }
  },
  computed:{
    monthDisplay(){
      let monthDisplayed = ''
      try{monthDisplayed = this.setMonthExplicit[this.finalChooseOptionTime.month].substring(0,3);}
      catch(err){
        monthDisplayed='';
      }
      finally{
        return monthDisplayed;
      }
    }
  },
  methods:{
    insertInTheButtonContent(op){
      if(op !==''){
        return op;
      }
      else{
        return ;
      }
    },
    setfinalChooseOptionTimes(arg1){
      const actualOperator = arg1[0];
      const option = arg1[1];
      try{
        this.finalChooseOptionTime[option] = actualOperator;
      }
      catch(err){
        throw "Error, key doesn't exist in the object ... "
      }
      finally{ // close all components
        this.yearChooseActive = false;
        this.monthChooseActive = false;
        this.dayChooseActive = false;
        this.hourChooseActive = false;
        this.minuteChooseActive = false;
      }
    },
    getFirstOptionDay(){
      return this.firstOption["day"];
    },
    getFirstOptionMonth(){
      return this.firstOption["month"];
    },
    getFirstOptionYear(){
      return this.firstOption["year"] - 1970; // posiition in the array
    },
    getSetYear(){
      return [1970,0];
    },
    getSetMonth(){
      return this.setMonthExplicit;
    },
    getSetDay(){
      return [1,this.$_getLenthOfMonthInDays(this.getFirstOptionMonth())];
    },
    getSetHour(){
      return [0,23];
    },
    getSetMinute(){
      return [0,59];
    },
    $_isLeapYear(year){
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
    $_getLenthOfMonthInDays(month){
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
    },
    addNewEvent(){
      if(this.$_validateFields){
        const newEvent = {};
        newEvent["description"] = this.description;
        newEvent["title"] = this.title;
        newEvent["time"] = this.finalChooseOptionTime;
        store.commit('setNewEventObj',newEvent);
      }
    },
    $_validateFields(){
      if(this.title !== '' && this.description !== '' && this.timeEvent['year'] !== '' && this.timeEvent['month'] !== '' && this.timeEvent['day'] !== ''){
        return true;
      }
      return false;
    },
    $_checkActiveStates(){
      if(this.yearChooseActive || this.monthChooseActive || this.dayChooseActive || this.hourChooseActive || this.minuteChooseActive){
        return true;
      }
    },
    activeYear(){
      if(!(this.$_checkActiveStates() && !this.yearChooseActive)){
        this.yearChooseActive=!this.yearChooseActive;
      }
    },
    activeMonth(){
      if(!(this.$_checkActiveStates() && !this.monthChooseActive)){
        this.monthChooseActive = !this.monthChooseActive;
      }
    },
    activeDay(){
      if(!(this.$_checkActiveStates() && !this.dayChooseActive)){
        this.dayChooseActive = !this.dayChooseActive;  
      }
    },
    activeHour(){
      if(!(this.$_checkActiveStates() && !this.hourChooseActive)){
        this.hourChooseActive = !this.hourChooseActive;
      }
    },
    activeMinute(){
      if(!(this.$_checkActiveStates() && !this.minuteChooseActive)){
        this.minuteChooseActive = !this.minuteChooseActive;
      }
    },
  },
  mounted(){
    const actualDate = new Date();
    this.firstOption["year"] = Number(actualDate.getFullYear());
    this.firstOption["month"] = Number(Number(actualDate.getMonth()) + 1);
    this.firstOption["day"] =  Number(actualDate.getDate()); 
  }
  
}
</script>

<style lang='scss'>
    @import '../../style/_configs.scss' ,'../../style/_modulos.scss';
    *{
        padding: 0 0;
        margin: 0 0;
        box-sizing:border-box;
    }
    .add-new-event{
      &-wrapper{
        height:auto;
        min-height:900px;
        width:100%;
        display:flex;
        flex-direction: column;
        &-container:first-child,&-container:nth-child(2),&-container:nth-child(3),&-container:nth-child(4),
        &-container:nth-child(5){
          padding-top:.4rem;
        }
        &-container:first-child,&-container:nth-child(2),&-container:nth-child(5){
          width:100%;
          height:auto;
          min-height:70px;
        }
        &-container:nth-child(2),&-container:nth-child(3){
          width:90%;
        }
        &-container{
          display:flex;
          flex-direction: column;
          &-container-date{
            flex:1;
            justify-self:center;
            align-self:center;
            width:90%;
            height:auto;
            display: flex;
            flex-direction:column;
            align-content: center;
            &-container{
              height: auto;
              align-self: center;
              width:190px;
              min-height:90px;
              display:flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              flex:1;
              &-label{
                width:80px;
                height:38px;
                border:2px solid $division-color-box-items;
                display:flex;
                justify-content: center;
                align-items:center;
                label{
                  width:auto;
                  max-height:24px;
                  font-size:22px;
                  color:white;
                }
              }
              &-button{
                flex:1;
                height:38px;
                display:flex;
                flex-direction: column;
                align-items: flex-end;
                button{
                  font-size:24px;
                  color:$secundary-black-color;
                  width:80px;
                  height:38px;
                  margin-left:.4rem;
                  border-radius:.1rem;
                  border:none;
                  background:#ffffff;
                  &:active{
                    border:none;
                    outline:none; 
                  }
                }
              }
              &-miniDisplay{
                // right:40%;
                border-radius:.4rem;
                background: white;
                transform:translate(50%,0px);
                position:absolute;
                width:auto;
                height:auto;
              }
            }
          }
          &-container-send-btn{
            align-self:center;
            justify-self: center;
            width:auto;
            height:auto;
            min-height:80px;
            button{
              border-radius:.3rem;
              height:50px;
              width:190px;
              color:#ffffff;
              background:$blue-btn-add-event;
              border:none;
              outline:none;
              font-size:26px;
              box-shadow: 0px 1px 6px -2px white;
            }
            button:hover{
              background:rgba($blue-btn-add-event,0.6 );
            }
            button:active{
              border:2px solid white;
              animation:2s linear 0s infinite alternate border_Max;
            }
            @keyframes border_Max{
              0%{
                border:3px solid #000000;
              }
              25%{
                border:2.5px solid #000000;
              }
              50%{
                border:2px solid #000000;
              }
              75%{
                border:1px solid #000000;
              }
              100%{
                border:none;
              }
            }
          }
        }
        &-container:first-child{
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          h2{
            font-size:36px;
            font-weight: 300;
            color:#ffffff; 
          }
        }
        &-container:nth-child(4){
          width:100%;
        }
      }
    }
  .form-input{
    display:flex;
    flex:1;
    flex-direction: column;
    justify-content: center;
    align-self:center;
    width:92%;
    font-size:22px;
    label{
      color:#ffffff;
    }
    input{
      padding:.4rem;
      font-size:24px;
      margin-top:.4rem;
      color:#000000;
      border-radius:.2rem;
      border:none;
      outline:none;
    }
    textarea{
      align-self: center;
      justify-self: center;
      width:100%;
      max-width:100%;
      max-height:200px;
      padding:.4rem;
      font-size:24px;
      margin-top:.4rem;
      color:#000000;
      border-radius:.2rem;
      border:none;
      outline:none;
    }
  }
</style>