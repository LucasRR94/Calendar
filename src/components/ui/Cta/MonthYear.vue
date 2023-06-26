<template>
  <div class="month-year" :class="{ 'border-default': !isPopoverVisible }">
    <button
      v-if="!isPopoverVisible"
      type="button"
      @click="changeVisibilityPopover"
      class="month-year__show-data"
    >
      {{ displayMonthYear }}
    </button>
    <slot v-if="isPopoverVisible"></slot>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { getShorteningVersion } from "@/components/ui/Popover/utils";
import {
  DISABLE_POPOVER_VISIBILITY,
  UPDATE_DATE_SELECTOR_EVENT,
  UPDATE_DATA_PICKER,
  nullYear,
} from "@/components/ui/constants";
import { months } from "@/Core/Domain/dateDomain";

export default Vue.extend({
  name: "MonthYear",
  props: {
    year: {
      type: Number as PropType<number>,
      default: nullYear,
    },
    month: {
      type: Number as PropType<number>,
    },
  },
  data() {
    return {
      isPopoverVisible: false,
      disableVisibility: false,
      availableMonths: months,
      nullYear: nullYear,
    };
  },
  methods: {
    changeVisibilityPopover: function () {
      this.isPopoverVisible = !this.isPopoverVisible;
    },
    disablePopover: function (): void {
      this.changeVisibilityPopover();
    },
  },
  watch: {
    disableVisibility(disabled: boolean) {
      if (!disabled) {
        return;
      }
      this.changeVisibilityPopover();
    },
  },
  computed: {
    getFormattedMonth: function (): string {
      if (this.year !== nullYear) {
        return "";
      }
      return getShorteningVersion(this.availableMonths[String(this.month)]);
    },
    displayMonthYear: function (): Number | String {
      return this.year === nullYear ? this.getFormattedMonth : this.year;
    },
  },
  created() {
    this.$on(DISABLE_POPOVER_VISIBILITY, () => this.disablePopover());
    this.$on(UPDATE_DATE_SELECTOR_EVENT, (year: number, month: number) => {
      this.$emit(UPDATE_DATA_PICKER, year, month);
    });
  },
});
</script>

<style lang="scss">
@import "../../../style/MonthYear";
</style>
