<template>
  <div class="home">
    <section class="home-calendar-area">
      <Calendar/>
    </section>
    
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'Home',
  components:{Calendar}
}
</script>
<style lang="scss">
  html,*,body{
    box-sizing:border-box;
    margin: 0 0;
    padding: 0 0;
  }
  .home{
    width:100vw;
    height:auto;
    display: flex;
    justify-content: center;
    .home-calendar-area{
      height:auto;
      min-height: 400px;
      width:100vw;
      display:flex;
      justify-content: center;
      align-items: center;
    }

  }
</style>
