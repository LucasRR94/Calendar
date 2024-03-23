<template>
  <div class="display-structure-of-month">
    <Header></Header>
    <ul class="list-days">
      <li class="day" v-for="(currentDay, index) in getListDays" :key="index">
        <Day
          :day="currentDay.content"
          :bellongMonth="currentDay.flagging"
          :alreadyHaveDayOtherSelected="alreadyHaveDayOtherSelected"
          @daySelected="handleSelected"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  createMonthStructureFlaggingDaysAccordingMonth,
  Day as DayInterface,
} from "generate-month-structure";
import Day from "@/components/ui/StructureOfMonth/Day/Day.vue";
import Header from "@/components/ui/StructureOfMonth/Header/Header.vue";
import { MALFORMED_MONTH_OR_YEAR } from "./Messages_Error";
import { validateYear, validateMonth } from "./utils";
import {
  isOnCurrentMonth,
  getYearAndMonthAccordingToBellongMonthSet,
} from "../../../Core/Domain/dateDomain";
import { UPDATE_CALENDAR_YEAR_MONTH } from "@/components/ui/constants";
export default Vue.extend({
  name: "DisplayStructureOfMonth",
  components: {
    Day,
    Header,
  },
  props: {
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      daySelected: -1,
    };
  },
  computed: {
    getListDays(): Array<DayInterface> {
      if (!validateMonth(this.month) || !validateYear(this.year)) {
        throw new Error(MALFORMED_MONTH_OR_YEAR);
        return [];
      }
      return createMonthStructureFlaggingDaysAccordingMonth(
        new Date(this.year, this.month, 1)
      );
    },
  },
  methods: {
    daySelectedHaveInitialValue(): Boolean {
      return this.daySelected === -1;
    },
    resetDaySelected(): void {
      this.daySelected = -1;
    },
    alreadyHaveDayOtherSelected(currentDay: number): Boolean {
      const isCurrentDayDifferentFromDaySelected =
        this.daySelected !== currentDay;
      if (this.daySelectedHaveInitialValue()) return false;
      return isCurrentDayDifferentFromDaySelected;
    },
    changeCurrentCurrentMonth(bellongMonth: string) {
      const updateDate = getYearAndMonthAccordingToBellongMonthSet(
        this.year,
        this.month,
        bellongMonth
      );
      return this.$emit(
        UPDATE_CALENDAR_YEAR_MONTH,
        updateDate.year,
        updateDate.month
      );
    },
    handleAValidDaySelected(selectedDay: number): void {
      if (selectedDay !== this.daySelected) {
        return;
      }
      this.resetDaySelected();
    },
    handleAInvalidDaySelected(selectedDay: number, bellongMonth: string) {
      if (isOnCurrentMonth(bellongMonth)) {
        this.daySelected = selectedDay;
        return;
      }
      this.changeCurrentCurrentMonth(bellongMonth);
    },
    handleSelected(day: number, bellongMonth: string): void {
      if (!this.daySelectedHaveInitialValue()) {
        this.handleAValidDaySelected(day);
        return;
      }
      return this.handleAInvalidDaySelected(day, bellongMonth);
    },
  },
});
</script>

<style lang="scss">
@import "../../../style/StructureOfMonth/StructureOfMonth_Style";
</style>
