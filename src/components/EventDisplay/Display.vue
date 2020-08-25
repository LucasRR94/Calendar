<template>
  <div class="display-event">
      <div class="display-event-miniview" v-if="smallView">
          <div class="display-event-miniview-wrapper">
              <div class="display-event-miniview-wrapper-time-scheduled">
                  <span>{{timeScheduled()}}</span>  
              </div>
              <div class="display-event-miniview-wrapper-wrapper-title-btn">
                <div class="display-event-miniview-wrapper-wrapper-title-btn-title">
                    <span>{{titleMiniview}}</span>
                </div>
                <div class="display-event-miniview-wrapper-wrapper-title-btn-btn">
                    <button @click="alternateView()">+</button>
                </div>
              </div>
                
          </div>    
      </div>
      <section class="display-event-full-view" v-else>
            <div class="display-event-full-view-option" v-if="optionActive">
                <div class="display-event-full-view-option-modify-wrapper" v-if="optionModify">
                    
                </div>
                <div class="display-event-full-view-option-delete-wrapper" v-if="optionDelete">

                </div>
                <div class="display-event-full-view-option-date-modify-wrapper" v-if="optionDateModify">
                    <ModifyDateHour 
                    :hour="hourFormated"
                    :date="dateFormated" 
                    v-on:closeWindow="closeOptionModify()"
                    v-on:updateDate="updateDateHour($event)"
                    />
                </div>
            </div>
          <div class="display-event-full-view-wrapper">
              <div class="display-event-full-view-wrapper-title-btn-miniview">
                <div class="display-event-full-view-wrapper-title-btn-miniview-title">
                    <div class="display-event-full-view-wrapper-title-btn-miniview-title-wrapper">
                        <h2>{{titleFullView}}</h2>
                    </div>
                </div>
                <div class="display-event-full-view-wrapper-title-btn-miniview-btn">
                    <div class="display-event-full-view-wrapper-title-btn-miniview-btn-wrapper">
                        <button @click="alternateView()">-</button>
                    </div>
                </div>
              </div>
              <div class="display-event-full-view-wrapper-main-content">
                  <div class="display-event-full-view-wrapper-main-content-wrapper">
                      <p>{{event['description']}}</p>
                  </div>
              </div>
              <div class="display-event-full-view-wrapper-reminder-btns-options">
                <div class="display-event-full-view-wrapper-reminder-btns-options-reminder">
                    <div class="display-event-full-view-wrapper-reminder-btns-options-reminder-wrapper">
                        <p>Reminder</p>    
                    </div>
                </div>
                <div class="display-event-full-view-wrapper-reminder-btns-options-reminder">
                    <div class="display-event-full-view-wrapper-reminder-btns-options-reminder-wrapper-btn">
                        <div class="display-event-full-view-wrapper-reminder-btns-options-reminder-wrapper-btn-container">
                            <div class="display-event-full-view-wrapper-reminder-btns-options-reminder-wrapper-btn-container-menu" v-if="HamburgerMenuCardEventActive">
                                <div class="display-event-full-view-wrapper-reminder-btns-options-reminder-wrapper-btn-container-menu-wrapper-btn">
                                    <button @click="ModifyDateHour()"></button>
                                </div>
                                <div class="display-event-full-view-wrapper-reminder-btns-options-reminder-wrapper-btn-container-menu-wrapper-btn">
                                    <button @click="delEvent()"></button>
                                </div>
                                <div class="display-event-full-view-wrapper-reminder-btns-options-reminder-wrapper-btn-container-menu-wrapper-btn">
                                    <button @click="editEvent()"></button>
                                </div>
                                <div class="display-event-full-view-wrapper-reminder-btns-options-reminder-wrapper-btn-container-menu-wrapper-btn">
                                    <button @click="trigMenuHamburguerCard()"></button>
                                </div>
                            </div>
                            <button @click="trigMenuHamburguerCard()" v-else></button>
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </section>   
  </div>
</template>

<script>
import ModifyDateHour from './ModifyDateHour/ModifyDateHour.vue';

export default {
    name:"Display",
    props:['event'],
    components:{ModifyDateHour},
    data(){
        return{
            HamburgerMenuCardEventActive:false,
            smallView:true,
            optionActive:false,
            optionModify:false,
            optionDelete:false,
            optionDateModify:false // Actual working in ...
        }
    },
    computed:{
        dateFormated(){
            return `${this.event['scheduleDay']}`;
        },
        hourFormated(){
            return `${this.event['hour']}:${this.event['minute']}`;
        },
        titleMiniview(){
            const titleStr  = this.event['title'];
            if(titleStr.length > 16){
                return `${titleStr.substring(0,14)} ...`;
            }
            else{
                return titleStr;
            }
        },
        titleFullView(){
            const titleStr  = this.event['title'];
            if(titleStr.length > 17){
                return `${titleStr.substring(0,12)} ...`;
            }
            else{
                return titleStr;
            }
        }
    },
    methods:{
        updateDateHour(updateDateOrHour){
            store.commit('ModifyDateHourHour',[this.event,updateDateOrHour]);
            this.closeOptionModify();
        },
        closeOptionModify(){ //close all options opened
            if(this.optionActive){
                this.optionActive=false;
                this.optionModify=false;
                this.optionDelete=false;
                this.optionDateModify=false;
            }
        },
        ModifyDateHour(){
            this.optionActive=true;
            this.optionDateModify=true;
            this.HamburgerMenuCardEventActive = false;
        },
        delEvent(){

        },
        editEvent(){
            
        },
        trigMenuHamburguerCard(){
            this.HamburgerMenuCardEventActive = ! this.HamburgerMenuCardEventActive;
        },
        formatOperatorTwoDigits(operator){
            if(String(operator).length ==1){
                return `0${operator}`;
            }
            else{
                return operator;
            }
        },
        timeScheduled(){
            return `${this.formatOperatorTwoDigits(this.event.hour)}:${this.formatOperatorTwoDigits(this.event.minute)}`;
        },
        alternateView(){
            this.smallView = !this.smallView;
        }
    }
}
</script>

<style lang='scss'>
    @import '../../style/_configs.scss' , '../../style/_modulos.scss';
    *{
        margin: 0 0;
        padding: 0 0;
        box-sizing:border-box;
        font-family: 'Roboto', sans-serif;
    }
    .display-event{
        width:100%;
        height:auto;
        min-height:500px;
        &-miniview{
            border:1px solid #ffffff; 
            height:50px;
            width:100%;
            display:flex;
            flex-direction:row;
            justify-content: center;
            align-items: center;
            &-wrapper{
                width:95%;
                height:auto;
                display:flex;
                flex-direction:row;
                align-items:center;
                &-time-scheduled{
                    width:25%;
                    display:flex;
                    justify-content: flex-start;
                    span{
                        color:#ffffff;
                        font-size:14px;
                        font-weight:200;
                    }
                }   
                &-wrapper-title-btn{
                    width:90%;
                    height:38px;
                    background:$background-color-small-event-display;
                    display:flex;
                    flex-direction:row;
                    align-items:center;
                    &-title{
                        flex:.9;
                        color:#ffffff;
                        display:flex;
                        justify-content: flex-start;
                        span{
                            width:100%;
                            padding-left: 2rem;
                            font-size:18px;
                        }
                    }
                    &-btn{
                        flex:.2;
                        display: flex;
                        justify-content: center;
                        button{
                            color:#ffffff;
                            border:none;
                            outline:none;
                            background:none;
                            font-size: 30px;
                        }
                    }
                }
            }
        }
        &-full-view{
            width:100%;
            height:300px;
            display:flex;
            flex-direction: row;
            justify-content: center;
            &-wrapper{
                border-radius:.2rem;
                width:90%;
                height:auto;
                min-height: inherit;
                display:flex;
                flex-direction: column;
                background: $background-color-full-event-display;
                &-title-btn-miniview{
                    flex:.1;
                    min-height:82px;
                    height:auto;
                    width:90%;
                    display:flex;
                    flex-direction: row;
                    align-self: center;
                    &-title{
                        padding-top:1rem;
                        flex:.98;
                        color:#ffffff;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        &-wrapper{
                            flex:1;
                            max-height:40px;
                            height:auto;
                            width:auto;
                            h2{
                                width:80%;
                                overflow: hidden;
                                font-size:2rem;
                                font-weight: 300;
                            }
                        }
                    }
                    &-btn{
                        flex:.02;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        padding-top:.4rem;
                        padding-right:.2rem;
                        &-wrapper{
                            width:30px;
                            height:30px;
                            border: 2px solid #bdbdbdbd;
                            border-radius:50%;    
                            display:flex;
                            flex-direction: row;
                            justify-content: center;
                            align-items:center;
                            button{
                                color:#ffffff;
                                font-size: 1.8rem;
                                background: none;
                                border:none;    
                                outline:none;
                            }
                            
                        }
                        
                    }
                }
                &-main-content{
                    flex:.7;
                    height:100%;
                    display:flex;
                    flex-direction: row;
                    justify-content: center;
                    &-wrapper{
                        padding: .4rem .4rem .4rem 0;
                        height:100%;
                        width:90%;
                        p{
                            padding:.2rem .2rem .2rem 0;
                            border-radius: .4rem;
                            border:2px solid rgb(49, 49, 49);
                            font-size:1.2rem;
                            font-weight: 200;
                            color:#ffffff;
                            height:140px;
                            overflow:scroll;
                            text-align: left;
                            word-spacing: .14rem;
                        }
                    }
                }
                &-reminder-btns-options{
                    align-self:center;
                    flex:.2;
                    display:flex;
                    flex-direction: row;
                    justify-content: center;
                    width:90%;
                    // position:relative;
                    &-reminder{
                        flex:1;
                        display:flex;
                        flex-direction:row;
                        width:30%;
                        &-wrapper{
                            color:#ffffff;
                            width:auto;
                            display:flex;
                            justify-content: center;
                            align-items: center;
                            p{
                                font-weight:300;
                            }
                        }
                        &-wrapper-btn{
                            width:98%;
                            height:100%;
                            display:flex;
                            flex-direction:row;
                            align-items: center;
                            justify-content:flex-end;
                            // border:2px solid red;
                            &-container{
                                border:2px solid #212121;
                                width:50px;
                                height:50px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                position:relative;
                                button{
                                    margin-top:6px;
                                    justify-self:center;
                                    width:35px;
                                    height:30px;
                                    color:none;
                                    background: none;
                                    border:none;
                                    outline:none;
                                    background-image:url('../../img/button-menu-event-up.png');
                                    background-repeat: no-repeat;
                                    background-position:100% 5%;            
                                    background-size: 35px 28px;
                                }
                                &-menu{
                                    background: #bdbdbdbd;
                                    width:42px;
                                    height:208px;
                                    border-radius:.4rem;
                                    display:flex;
                                    flex-direction: column;
                                    align-items:center;
                                    justify-content: flex-end;
                                    position:absolute;
                                    bottom:0;
                                    &-wrapper-btn{
                                        margin-top:.2rem;
                                        flex:1;
                                        display: flex;
                                        flex-direction:row;
                                        justify-content: flex-end;
                                        align-items: center;
                                        button{
                                            width:35px;
                                            height:35px;
                                            color:none;
                                            background: none;
                                            border:none;
                                            outline:none;
                                            background-repeat: no-repeat;
                                            background-position:100% 5%;            
                                            background-size: 35px 35px;
                                            
                                        }
                                        &:first-child button{
                                                background-image:url('../../img/Icon-Change-Day-Event.png');
                                        }
                                        &:nth-child(2) button{
                                            background-image:url('../../img/Icon-Del-Event.png');
                                        }
                                        &:nth-child(3) button{
                                            background-image:url('../../img/Icon-Modify-Event.png');
                                        }
                                        &:nth-child(4){ 
                                            button{
                                                background-size: 35px 28px;
                                                background-image:url('../../img/button-menu-event-up.png');
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
            }
            &-option{
                z-index:2;
                justify-self: center;
                position:absolute;
                width:90%;
                min-height:300px;
                // background: rgba($color: #494949, $alpha: .5);
                &-modify-wrapper{
                    width:100%;
                    height:100%;
                    background: #212121;
                }
            }
            
        }
    }
</style>