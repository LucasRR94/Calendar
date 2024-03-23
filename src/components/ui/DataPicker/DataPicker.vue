<template>
  <div class="data-picker">
    <MonthYear
      :minValue="minimalYear"
      :year="year"
      @updateDataPicker="updateDataPicker"
    >
      <SelectorYear :year="year"></SelectorYear>
    </MonthYear>
    <MonthYear :month="month" @updateDataPicker="updateDataPicker">
      <SelectorMonth :month="month"></SelectorMonth>
    </MonthYear>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import SelectorMonth from "@/components/ui/Popover/SelectorMonth.vue";
import SelectorYear from "@/components/ui/Popover/SelectorYear.vue";
import MonthYear from "@/components/ui/Cta/MonthYear.vue";
import {
  MINIMAL_YEAR,
  MINIMAL_MONTH,
  MAXIMAL_MONTH,
} from "@/Core/Domain/dateDomain";
import {
  UPDATE_CALENDAR_MONTH,
  UPDATE_CALENDAR_YEAR,
} from "@/components/ui/constants";

export default Vue.extend({
  name: "DataPicker",
  components: { SelectorMonth, SelectorYear, MonthYear },
  props: {
    year: {
      type: Number as PropType<number>,
      required: true,
    },
    month: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  data() {
    return {
      minimalYear: MINIMAL_YEAR,
      minimalMonth: MINIMAL_MONTH,
      maximalMonth: MAXIMAL_MONTH,
    };
  },
  methods: {
    updateDataPicker: function (year: number, month: number): void {
      const isYearNull = year === -1;
      if (isYearNull) {
        this.$emit(UPDATE_CALENDAR_MONTH, month);
        return;
      }
      this.$emit(UPDATE_CALENDAR_YEAR, year);
    },
  },
});
</script>

<style lang="scss">
@import "../../../style/_Data_Picker";
</style>
