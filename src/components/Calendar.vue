<template>
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
          <div class="calendar-body-wrapper-weeks-days-day" v-show="(index1 >= offsetDaysOfMonth)" v-bind:class="{'hidden':checkTheLength(index1+1 -offsetDaysOfMonth)}">
            <span>{{(index1+1-offsetDaysOfMonth)}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'Calendar',
  data(){
    return{
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
  methods:{
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
    checkTheLength(index){
      if(index > this.maxLenghtMonth){
        return true;
      }
      else{
        return false;
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
  @import '../style/modulos.scss','../style/_configs.scss';
  *,body,html{
    margin:0 0;
    padding: 0 0;
    box-sizing:border-box;
    font-family: 'Roboto', sans-serif;
  }
  .hidden{
    display:none;
  }
  .border-right-extra{
    border-right: 2px $secundary-separation-color-dark solid;
  }
  // -------------------------------------------------------
  .light-mode{
    border: 2px solid $secundary-separation-color-light;  
  }
  .header-light-mode{
    background:$primary-color-light;
    border-bottom:2px solid $secundary-separation-color-light;
    input{
      background: $secundary-separation-color-light;
      color:$default-font-color-light;
    }
  }
  .body-light-mode{
    background: $primary-color-light;
    .calendar-body-wrapper-headers{
      border-bottom:2px $secundary-separation-color-light solid;
      .calendar-body-wrapper-headers-days{
        color:$font-color-light;
      }
    }
  }
  .body-light-mode{
    .calendar-body-wrapper-weeks{
      &-days{
        border-bottom:2px $secundary-separation-color-light solid;
        &-day{
          color:$font-color-light;
        }
      }
    }
  }
  // -------------------------------------------------------
  .dark-mode{
    border: 2px solid $secundary-separation-color-dark;  
  }
  .header-dark-mode{
    background:$primary-color-dark;
    border-bottom:2px solid $secundary-separation-color-dark;
    input{
      color:$default-font-color-dark;
    }
  }
  .body-dark-mode{
    background: $primary-color-dark;
    .calendar-body-wrapper-headers{
      border-bottom:2px $secundary-separation-color-dark solid;
      .calendar-body-wrapper-headers-days{
        color:$font-color-dark;
      }
    }
  }
  .body-dark-mode{
    .calendar-body-wrapper-weeks{
      &-days{
        border-bottom:2px $secundary-separation-color-dark solid;
        &-day{
          color:$font-color-dark;
        }
      }
    }
  }  
  .calendar{
    width:auto;
    height:auto;
    display:flex;
    flex-direction: column;
    border-radius: .4rem;
    &-header{
      display: flex;
      width:auto;
      height:auto;
      border-radius: .2rem .2rem 0rem 0rem;
      &-input-area{
        flex:.5;
        width:auto;
        height:auto;
        display:flex;
        justify-content: center;
        padding:.2rem 0;
        input{
          border:none;
          border-radius:.2rem;
          padding:.1rem;
          font-size:1rem;
          text-align: center;
        }
      }
    }
    &-body{
      width: auto;
      display:grid;
      grid-template-rows: .2fr auto;
      border-radius: 0rem 0rem .2rem .2rem;
      &-wrapper-headers{
        width:inherit;
        height: auto;
        display:grid;
        grid-template-columns:repeat(7,1fr);
        &-days{
          height:auto;
          width:auto;
          list-style: none;
          font-size:1rem;
          font-weight: bold;
          padding-top:.1rem;
          span{
            margin-left:.1rem;
          }
        }
      }
      &-wrapper-weeks{
        width:inherit;
        height:auto;
        display:grid;
        grid-template-columns :repeat(7,1fr);
        &-days{
          list-style: none;
          height:auto;
          width:auto;
          &-day{
            padding-top:.1rem;
            margin-left:0.1rem;
            font-size:1rem;
            font-weight:bold;
          }
        }
      }
    }
  }
  @media(max-width:425px){
    .calendar{
      min-width: 300px;
      max-width:400px;
      max-height:600px;
      min-height: 500px;
      &-header{
        width:inherit;
        height:40px;
        &-input-area{
          height:auto;
          display:flex;
          input{
            max-width: 80px;
            padding:.1rem;
          }
        }
      }
      &-body{
        min-height: 460px;
        max-height: inherit;
        max-width: inherit;
        min-width:inherit;
        &-wrapper-headers{
          width:inherit;
          min-width:inherit;
          max-width: inherit;
          height: auto;
          &-days{
            height:auto;
            width:auto;
          }
        }
        &-wrapper-weeks{
          width:inherit;
          min-width:inherit;
          max-width: inherit;
          height:auto;
          &-days{
            height:auto;
            width:auto;
            &-day{
              margin-left:0.1rem;
            }
          }
        }
      }
    }
  }
  @media(min-width:425px){
    .calendar{
      min-width: 400px;
      max-width:500px;
      max-height:600px;
      min-height: 500px;
      &-header{
        width:inherit;
        height:40px;
        &-input-area{
          height:auto;
          input{
            max-width: 80px;
            padding:.1rem;
          }
        }
      }
      &-body{
        min-height: 460px;
        max-height: inherit;
        max-width: inherit;
        min-width:inherit;
        &-wrapper-headers{
          width:inherit;
          min-width:inherit;
          max-width: inherit;
          height: auto;
          &-days{
            height:auto;
            width:auto;
          }
        }
        &-wrapper-weeks{
          width:inherit;
          min-width:inherit;
          max-width: inherit;
          height:auto;
          &-days{
            height:auto;
            width:auto;
            &-day{
              margin-left:0.1rem;
            }
          }
        }
      }
    }
  }
  @media(min-width:768px){
    .calendar{
      min-width: 600px;
      max-width:700px;
      max-height:600px;
      min-height: 600px;
      &-header{
        width:inherit;
        height:50px;
        &-input-area{
          height:auto;
          display:flex;
          input{
            max-width: 80px;
            padding:.1rem;
            font-size:1.2rem;
          }
        }
      }
      &-body{
        min-height: 550px;
        max-height: inherit;
        max-width: inherit;
        min-width:inherit;
        &-wrapper-headers{
          width:inherit;
          min-width:inherit;
          max-width: inherit;
          height: auto;
          &-days{
            font-size:1.2rem;
            height:auto;
            width:auto;
          }
        }
        &-wrapper-weeks{
          width:inherit;
          min-width:inherit;
          max-width: inherit;
          height:auto;
          &-days{
            height:auto;
            width:auto;
            &-day{
              margin-left:0.1rem;
              font-size:1.2rem;
            }
          }
        }
      }
    }
  }
  @media(min-width:1024px){
    .calendar{
      min-width: 900px;
      max-width:1000px;
      max-height:600px;
      min-height: 860px;
      &-header{
        width:inherit;
        height:90px;
        &-input-area{
          height:auto;
          display:flex;
          input{
            min-width:50px;
            max-width: 150px;
            padding:.1rem;
            font-size:1.6rem;
          }
        }
      }
      &-body{
        min-height: 800px;
        max-height: inherit;
        max-width: inherit;
        min-width:inherit;
        &-wrapper-headers{
          width:inherit;
          min-width:inherit;
          max-width: inherit;
          height: auto;
          &-days{
            font-size:1.6rem;
            height:auto;
            width:auto;
          }
        }
        &-wrapper-weeks{
          width:inherit;
          min-width:inherit;
          max-width: inherit;
          height:auto;
          &-days{
            height:auto;
            width:auto;
            &-day{
              margin-left:0.1rem;
              font-size:1.4rem;
            }
          }
        }
      }
    }
  }
</style>