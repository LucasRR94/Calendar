<template>
  <section class="calendar">
    <ToggleViewCalendar
      :isMonthView="isMonthView"
      @changeToggleView="changeToogleView"
    />
    <StructureOfYear v-if="isMonthView"></StructureOfYear>
    <div class="calendar__month" v-else>
      <div class="calendar__month__data-picker">
        <DataPicker
          :month="month"
          :year="year"
          @updateCalendarMonth="handleChangeMonth"
          @updateCalendarYear="handleChangeYear"
        >
        </DataPicker>
      </div>
      <div class="calendar__month__structure-of-month">
        <StructureOfMonth
          :month="month"
          :year="year"
          @updateCalendarYearMonth="handleChangeInYearAndMonth"
        >
        </StructureOfMonth>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import StructureOfMonth from "../ui/StructureOfMonth/StructureOfMonth.vue";
import StructureOfYear from "../ui/StructureOfYear/StructureOfYear.vue";
import DataPicker from "../ui/DataPicker/DataPicker.vue";
import ToggleViewCalendar from "../ui/ToggleViewCalendar/ToggleViewCalendar.vue";
export default Vue.extend({
  components: {
    StructureOfMonth,
    DataPicker,
    StructureOfYear,
    ToggleViewCalendar,
  },
  data() {
    return {
      month: 0,
      year: 0,
      isMonthView: false,
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
    changeToogleView: function () {
      this.isMonthView = !this.isMonthView;
    },
  },
});
</script>

<style lang="scss">
@import "../../../src/style/Calendar";
</style>
