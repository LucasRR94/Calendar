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
                        <button></button>
                    </div>
                </div>
              </div>
          </div>
      </section>   
  </div>
</template>

<script>
export default {
    name:"DisplayEventDisplay",
    props:['event'],
    data(){
        return{
            smallView:true
        }
    },
    computed:{
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
    @import '../style/_configs.scss' , '../style/_modulos.scss';
    *{
        margin: 0 0;
        padding: 0 0;
        box-sizing:border-box;
        font-family: 'Roboto', sans-serif;
    }
    .display-event{
        width:100%;
        height:auto;
        min-height:50px;
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
            height:auto;
            height:300px;
            border-radius: .4rem .4rem .4rem .4rem;
            background: $background-color-full-event-display;
            display:flex;
            justify-content: flex-end;
            &-wrapper{
                width:95%;
                height:auto;
                min-height: inherit;
                display:flex;
                flex-direction: column;
                &-title-btn-miniview{
                    flex:.1;
                    min-height:82px;
                    height:auto;
                    width:100%;
                    display:flex;
                    flex-direction: row;
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
                    &-wrapper{
                        margin-right:1.6rem;
                        padding: .4rem .4rem .4rem 0;
                        height:100%;
                        // border:2px solid blue;
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
                    flex:.2;
                    display:flex;
                    flex-direction: row;
                    justify-content: center;
                    &-reminder{
                        flex:1;
                        display:flex;
                        flex-direction:row;
                        width:30%;
                        &-wrapper{
                            // border:1px solid white;
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
                            padding-right:.5rem;
                            button{
                                width:30px;
                                height:30px;
                                color:none;
                                background: none;
                                border:none;
                                background-image:url('../img/button-menu-event-up.png');
                                background-repeat: no-repeat;
                                background-position:100% 5%;            
                                background-size: 30px 25px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>