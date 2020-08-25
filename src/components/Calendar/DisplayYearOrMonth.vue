<template>
  <div class="mini-display-component">
      <div class="mini-display-component-wrapper-choose">
        <div class="mini-display-component-wrapper-choose-container  up-button">
           <button @click="$emit('up-actual',usedForYearOrMonth)"></button>     
        </div>    
        <div class="mini-display-component-wrapper-choose-container">
          {{actualOperator}}
        </div>
        <div class="mini-display-component-wrapper-choose-container  down-button">
          <button @click="$emit('down-actual',usedForYearOrMonth)"></button>
        </div>
      </div>
      <div class="mini-display-component-wrapper-finish">
          <div class="mini-display-component-wrapper-finish-container">
              <button @click="closeDisplay()"></button>
          </div>
      </div>
  </div>
</template>

<script>
import {store} from '../../store';

export default {
    name:"DisplayYearOrMonth",
    props:{
        usedForYearOrMonth:{
            type:String,
        },
        actualOperator:{
            required:true
        }
    },
    methods:{
        closeDisplay(){
            return setTimeout(
                () => { return this.$emit('closeDisplay',this.usedForYearOrMonth)}
                ,1000);
        }
    }
}
</script>

<style lang='scss'>
    @import '../../style/_configs.scss';
    * {
        margin: 0 0;
        padding: 0 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }
    .mini-display-component{
        width:130px;
        height:100px;
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        border:.5px solid black;
        border-radius:.4rem;
        &-wrapper-choose{
            flex:1;
            height:100%;
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &-container{
                flex:1;
                display:flex;
                justify-content: center;
                align-items: center;
                color:$separation-grey;
                font-size:2rem;
            }
        }
        &-wrapper-finish{
            flex:1;
            display:flex;
            flex-direction: row;
            height:100%;
            justify-content: center;
            align-items:center;
            padding:.1rem;
            &-container{
                height:50%;
                width:100%;
                display:flex;
                flex-direction: column;
                justify-content: center;
                button{
                    border:none;
                    background: url("../../img/finish-button.png") no-repeat center;
                    width:50px;
                    height:40px;
                    background-position:100% 5%;            
                    background-size: 50px 40px;
                    outline:none;
                    &:active{
                    border-radius:.4rem;
                    border:1px solid rgba(#212121,.1);
                    }
                }
            }
        }
    }
    .up-button{
        
        display: flex;
        justify-content: center;
        align-items: center;
        width:70px;
        height:40px;
        button{
            border:none;
            background: url("../../img/up-button.png") no-repeat center;
            width:42px;
            height:25px;
            background-position:100% 5%;            
            background-size: 40px 24px;
            outline:none;
            &:active{
            border-radius:.4rem;
            border:2px solid rgba(#212121,.1);
            }
        }
    }
    .down-button{
        display: flex;
        justify-content: center;
        align-content: flex-end;
        width:70px;
        height:40px;
        button{
            border:none;
            background: url("../../img/down-button.png") no-repeat center;
            width:42px;
            height:25px;
            background-position:100% 5%;            
            background-size: 40px 24px;
            outline:none;
            &:active{
            border-radius:.4rem;
            border:2px solid rgba(#212121,.1);
            }
        }

    }
</style>