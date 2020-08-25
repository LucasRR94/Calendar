<template>
  <div class=" min-size-list-add-event event-display">
      <div class="event-display-wrapper">
          <div class="event-display-wrapper-title">
            <h2>List Events</h2> 
          </div>  
          <div class="event-display-wrapper-list-events">
              <ul class="event-display-wrapper-list-events-list">
                  <li class="event-display-wrapper-list-events-list-container-event" 
                  v-for="actual in objArray" 
                  :key="actual.id">
                    <Display v-bind:event="actual"/>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {store} from '../../store';
import Display from './Display.vue';

export default {
    name:'EventDisplay',
    components:{Display},
    data(){
        return{
            listEvents:[]
        }
    },
    computed:{
        ...mapGetters(['getlistOfEventsEvidenceDay']),
        getListEvents(){
            return this.getlistOfEventsEvidenceDay;
        },
        objArray(){
            if(this.getListEvents != undefined){
                if(Object.keys(this.getListEvents).length > 0){
                    let finalArr = [];
                    for(let actual in this.getListEvents){
                        if(finalArr !== undefined || finalArr !== null){
                            finalArr.push(this.getListEvents[actual]);
                        }
                    }
                    return this.sortArr(finalArr);
                }
                else{
                    return [];
                }
            }
            else {
                return [];
            }
            
        }
 
    },
    methods:{
        sortArr(arr){
            let list = {};
            try{
                if(arr == undefined){
                    return [];
                }
                list = arr.sort((op1,op2) =>{
                    if(op1.hour > op2.hour){
                        return 1;
                    }
                    if(op1.hour == op2.hour){
                        if(op1.minute > op2.minute ){
                            return 1;
                        }
                        if(op1.minute < op2.minute ){
                            return -1;
                        }
                        else{
                            return 0;
                        }
                    }
                    else{
                        return -1;
                    }
                });
            }
            catch(err){
                list = {};
            }
            finally{
                return list;
            }
            
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
    
    .event-display{
        width:100%;
        min-height:400px;
        height:auto;
        &-wrapper{
            width:100%;
            height:auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            &-title{
                width:200px;
                height:70px;
                display:flex;
                justify-content: center;
                align-items:center;
                padding-top:.4rem;
                h2{
                    font-weight: 300;
                    font-size:36px;
                    color:white;
                }
            }
            &-list-events{
                padding-top:.4rem;
                width:100%;
                height:auto;
                min-height: 200px;
                list-style-type: none;
                &-list{
                    width:auto;
                    height:auto;
                    display:flex;
                    justify-content: row;
                    align-items:center;
                    flex-direction: column;
                    flex:1;
                    &-container-event{
                        width:100%;
                        margin-top:.2rem;    
                    }
                }
            }
            
        }
        
    }
</style>