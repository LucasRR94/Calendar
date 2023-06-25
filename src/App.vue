<template>
  <div class="app"><Calendar /></div>
</template>
<script lang="ts">
import Vue from "vue";
import Calendar from "@/components/Calendar/Calendar.vue";
export default Vue.extend({
  components: { Calendar },
});
</script>
<style lang="scss">
html,
*,
body {
  margin: 0 0;
  padding: 0 0;
  box-sizing: border-box;
}
body {
  width: 100vw;
  height: 100vh;
}
.app {
  width: 100%;
  height: 100%;
}
</style>
