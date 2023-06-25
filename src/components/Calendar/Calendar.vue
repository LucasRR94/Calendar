<template>
  <section class="calendar">
    <div class="calendar__data-picker">
      <DataPicker :month="month" :year="year"></DataPicker>
    </div>
    <div class="calendar__structure-of-month">
      <StructureOfMonth :month="month" :year="year"></StructureOfMonth>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import StructureOfMonth from "../ui/StructureOfMonth/StructureOfMonth.vue";
import DataPicker from "../ui/DataPicker/DataPicker.vue";
export default Vue.extend({
  components: { StructureOfMonth, DataPicker },
  data() {
    return {
      month: 0,
      year: 0,
    };
  },
  created() {
    const actualDate = new Date();
    this.month = actualDate.getUTCMonth();
    this.year = actualDate.getUTCFullYear();
  },
});
</script>

<style lang="scss">
@import "../../../src/style/Calendar";
* {
  margin: 0 0;
  padding: 0 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
</style>
