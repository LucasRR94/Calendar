<template>
  <div class=" min-size-list-add-event event-display">
      <div class="event-display-wrapper">
          <div class="event-display-wrapper-title">
            <h2>List Events</h2> 
          </div>  
      </div>
  </div>
</template>

<script>
export default {
    name:'EventDisplay'
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
    
    .event-display{
        width:100%;
        height:400px;
        &-wrapper{
            width:100%;
            height:70px;
            display: flex;
            justify-content: center;
            align-items: center;
            &-title{
                width:200px;
                height:auto;
                display:flex;
                justify-content: center;
                h2{
                    font-weight: 300;
                    font-size:32px;
                    color:white;
                }
            }
            
        }
        
    }
</style>