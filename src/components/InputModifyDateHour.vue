<template>
    <div class="input-modify-date">
        <div class="input-modify-date-wrapper">
            <div class="input-modify-date-wrapper-title">
                <div class="input-modify-date-wrapper-title-container">
                    <span>{{title}}</span>
                </div>
            </div>
            <div class="input-modify-date-wrapper-container">
                <div class="input-modify-date-wrapper-container-wrapper-input">
                    <input v-model="value" type="text" :placeholder="inputHourOrDate" v-on:change="$emit('updating',value)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"InputModifyDateHour",
    props:{
        title:{
            default:"",
            type:String
        },
        option:{
            default:"date",
            type:String
        },
        inputHourOrDate:{
            default: "",
            type:String
        }
    },
    data(){
        return {
            value:''
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
    .input-modify-date{
        width:100%;
        height:60px;
        display: flex;
        justify-content: center;
        &-wrapper{
            width:100%;
            height:100%;
            display: flex;
            flex-direction: column;
            align-items:center;
            &-title{
                width:100%;
                position:absolute;
                display: flex;
                justify-content: center;
                padding-right:60px;
                &-container{
                    background:$background-color-display-modify-event-date-mini-description-input;
                    border-radius:7rem;
                    padding:0 .5rem;
                    span{
                        color:#ffffff;
                        font-size: 14px;
                    }
                }
            }
            &-container{
                width:100%;
                height:100%;
                &-wrapper-input{
                    width:100%;
                    height:100%;
                    display:flex;
                    justify-content: center;
                    align-items:center;
                    input{
                        background:none;
                        margin:.2rem;
                        padding:.5rem;
                        width:50%;
                        font-size:22px;
                        text-align:center;
                        border:2px solid #bdbdbd;
                        color:#ffffff;
                        border-radius: .7rem;
                        max-width: 150px;
                        outline:none;
                    }
                }
            }
        }    
    }
</style>