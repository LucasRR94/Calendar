<template>
  <div class="mini-card">
      <div class="mini-card-wrapper">
          <div class="mini-card-wrapper-title">
              <span>Today</span>
          </div>
          <div class="mini-card-wrapper-date">
              <div class="mini-card-wrapper-date-container">
                  <span>{{day}}</span>
              </div>
              <div class="mini-card-wrapper-date-container">
                  <span>{{month}}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {store} from '../../store';

export default {
    name:'MiniCard',
    computed:{
        day:function(){
            return (store.getters.getActualDate)["day"];
        },
        month: function(){
            return (store.getters.getActualDate)["month"].substring(0,3);
        }
    }
}
</script>

<style lang='scss'>
    @import '../../style/_configs.scss';
    *{
        box-sizing:border-box;
        margin:0 0;
        padding:0 0;
        font-family: 'Roboto', sans-serif;
    }
    .mini-card{
        width:100%;
        height:100%;
        &-wrapper{
            width:155px;
            height: 60%;
            border-radius: 0 .6rem 0 .6rem;
            padding:.4rem;
            background: $main-color-miniCalendar;
            color:$text-color-miniCard;
            display:flex;
            flex-direction: column;
            &-title{
                flex:.4;
                max-height:24px;
                font-size: 23px;
            }
            &-date{
                flex:.8;
                display:flex;
                flex-direction:row;
                &-container{
                    flex:1;
                    display: flex;
                    flex-direction: column;
                    font-size: 2.5rem;
                    justify-content: flex-end;
                    align-items: flex-start;               
                }

            }    
        }
    }
</style>