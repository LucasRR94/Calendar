<template>  
    <section class="modify-date">
        <div class="modify-date-wrapper">
            <div class="modify-date-wrapper-wrapper-title">
                <span>{{title}}</span>
            </div>  
            <div class="modify-date-wrapper-wrapper-content">
                <div class="modify-date-wrapper-wrapper-content-wrapper-input">
                    <InputModifyDateHour 
                    :title="'Date'"
                    :option="'date'"
                    :inputHourOrDate="this.date"
                    v-on:updating="updateValueDate($event)"
                    />
                </div>
                <div class="modify-date-wrapper-wrapper-content-wrapper-input">
                    <InputModifyDateHour 
                    :title="'Hour'"
                    :option="'hour'"
                    :inputHourOrDate="this.hour"
                    v-on:updating="updateValueHour($event)"
                    />
                </div>
            </div>
            <div class="modify-date-wrapper-wrapper-btns">
                <div class="modify-date-wrapper-wrapper-btns-wrapper-btn">
                    <button @click="cancelUpdate" ></button>
                </div>
                <div class="modify-date-wrapper-wrapper-btns-wrapper-btn">
                    <button @click="updating"></button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import InputModifyDateHour from './InputModifyDateHour.vue';

export default {
    name:"ModifyDate",
    components:{InputModifyDateHour},
    props:{
        date:{
            type:String,
            default:[]
        },
        hour:{
            type:String,
            default:[]
        }
    },
    data(){
        return{
            title:"Modify Date",   
            valueDate:"",
            valueHour:""
        }
    },
    methods:{
        updateValueHour(newHour){
            if(newHour!==null){
                this.valueHour = newHour;
            }
        },
        updateValueDate(newDate){
            if(newDate!==null){
                this.valueDate = newDate;
            }
        },
        cancelUpdate(){
            this.$emit('closeWindow');
        },
        validateString(param){
            return(typeof(param)==='string');
        },
        validateNumberDifferentNaN(subpartIsNumber){
            const toIntSubPart = parseInt(subpartIsNumber);
            if(toIntSubPart === 'NaN'){
                return false;
            }
            return true;
        },
        validateDate(date){
            const partDate = date.split("-");
            if(partDate.length !== 3 || !this.validateString(date)){
                return false;
            }
            else{
                let checkIfIsDate=true;
                partDate.forEach((element,index) => {
                    if(!this.validateNumberDifferentNaN(element)){ // can't be convert
                        checkIfIsDate = false;   
                    }
                    else{
                        const numbDate = parseInt(element);
                        if(index == 0 && numbDate < 1970){
                            checkIfIsDate = false;   
                        }else{
                            if(index == 1 && (numbDate > 13 || numbDate <= 0)){
                                checkIfIsDate = false;   
                            }
                            if(index == 2 && (numbDate > 32 || numbDate <= 0)){
                                checkIfIsDate = false;   
                            }
                        }
                        
                    }
                });
                return checkIfIsDate;
            }
        },
        validateHour(hour){
            const partHour = hour.split(":");
            if(partHour.length !== 2 || !this.validateString(hour)){
                return false;
            }
            else{
                let checkIfIsHour = true;
                partHour.forEach((element,index) => {
                    if(!this.validateNumberDifferentNaN(element)){// can't be convert
                        checkIfIsHour=false;
                    }
                    else{
                        const numbHour = parseInt(element);
                        if(index === 0 && (numbHour>=24 || numbHour<0)){
                            checkIfIsHour=false;
                        }
                        if(index === 1 && (numbHour > 60 || numbHour<0)){
                            checkIfIsHour=false;
                        }
                    } 
                });
                return checkIfIsHour;
            }
        },
        updating(){
            let finalHour = "XX:XX";
            let finalDate = "XXXX-XX-XX";
            if(this.validateHour(this.valueHour)){
                finalHour = this.valueHour;
            }
            if(this.validateDate(this.valueDate)){
                finalDate = this.valueDate;
            }
            return this.$emit('updateDate',[finalDate,finalHour]);
        }
    }
    
}
</script>

<style lang='scss'>
    @import '../style/modulos.scss','../style/Calendar_Style.scss';
    *{
        box-sizing:border-box;
        margin:0 0;
        padding: 0 0;
        font-family: 'Roboto', sans-serif;
    }
    .modify-date{
        width:100%;
        height:500px;
        &-wrapper{
            width:100%;
            height:300px;
            background: $background-color-display-modify-event-date;
            display: flex;
            flex-direction: column;
            border:1px solid black;
            padding-top:.5rem;
            border-radius: .4rem;
            &-wrapper-title{
                flex:.2;
                width:100%;
                height:auto;
                display: flex;
                justify-content: center;
                span{
                    font-size:25px;
                    width:auto;
                    color:white;
                }
            }
            &-wrapper-content{
                flex:.5;
                display:100%;
                display: flex;
                flex-direction: column;
                &-wrapper-input{
                    flex:5;
                    display: flex;
                    flex-direction: row ;
                    justify-content: center;
                    align-content: center;
                }
            }
            &-wrapper-btns{
                flex:.3;
                display: flex;
                flex-direction: row;
                &-wrapper-btn{
                    flex:1;
                    display: flex;
                    justify-content: center ;
                    align-items: flex-start;
                    button{
                        width:60px;
                        height:60px;
                        color:none;
                        background: none;
                        border:none;
                        outline:none;
                        background-repeat: no-repeat;
                        background-position:50% 50%;            
                        background-size: 50px 50px;
                        border-radius: 50%;
                    }
                    &:first-child button{
                        background-image:url('../img/btn-cancel-modify.png');
                        &:active{
                            border:1px solid red;
                        }
                    }
                    &:nth-child(2) button{
                        background-image:url('../img/btn-finish-modify.png');
                        &:active{
                            border:1px solid white;
                        }
                    }
                    
                }

            }
        }
    }
</style>