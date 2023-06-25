<template>
  <section class="calendar">
    <div class="calendar__data-picker">
      <DataPicker
        :month="month"
        :year="year"
        @updateCalendarMonth="handleChangeMonth"
        @updateCalendarYear="handleChangeYear"
      >
      </DataPicker>
    </div>
    <div class="calendar__structure-of-month">
      <StructureOfMonth
        :month="month"
        :year="year"
        @updateCalendarYearMonth="handleChangeInYearAndMonth"
      >
      </StructureOfMonth>
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
  methods: {
    handleChangeMonth: function (newMonth: number): void {
      this.month = newMonth;
    },
    handleChangeYear: function (newYear: number): void {
      this.year = newYear;
    },
    handleChangeInYearAndMonth: function (
      newYear: number,
      newMonth: number
    ): void {
      this.year = newYear;
      this.month = newMonth;
    },
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
