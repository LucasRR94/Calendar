<template>
  <header class="main-header">
      <section class="main-header-content">
        <div class="main-header-content-mini-card-container">
            <MiniCard/>   
        </div>
        <div class="main-header-content-button-logout-archive">
            <button></button>
        </div>
      </section>
  </header>
</template>

<script>
import MiniCard from './MiniCard.vue';

export default {
    name:'Header',
    components:{MiniCard}
}
</script>

<style lang='scss'>
    @import '../../style/_configs.scss';
    *{
        box-sizing:border-box;
        margin:0 0;
        padding:0 0;
    }
    .main-header{
        background:$main-header-blue;
        width:100%;
        height:200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &-content{
            width:98%;
            height:90%;
            padding-top:1rem;
            display:flex;
            flex-direction: row;
            justify-content: center;
            &-mini-card-container{
                flex:1;
                padding-top:.2rem;
                margin-left:.3rem;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
            }
            &-button-logout-archive{
                flex:1;
                margin-right:.3rem;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                padding-top:.2rem;
                button{
                    width:70px;
                    height:40px;
                    background: none;
                    border:none;
                    background: url("../../img/hamburguerMenuHeader.png") no-repeat center;
                    background-position:100% 5%;            
                    background-size: 40px 24px;
                    outline:none;
                }

            }
        }
    }
</style>