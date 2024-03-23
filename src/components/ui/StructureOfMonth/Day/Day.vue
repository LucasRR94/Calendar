<template>
  <button
    @click="selected"
    class="display-day"
    v-bind:class="{
      'non-evidence': !isSelect,
      'in-evidence': isSelect,
      'not-current-month': isTheCurrentMonth,
    }"
  >
    {{ day }}
  </button>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { BellongMonth } from "generate-month-structure";
import { DAY_SELECTED } from "@/components/ui/constants";

export default Vue.extend({
  name: "Day",
  props: {
    day: {
      type: Number as PropType<number>,
      required: true,
    },
    bellongMonth: {
      type: String as PropType<BellongMonth>,
      required: true,
    },
    alreadyHaveDayOtherSelected: {
      type: Function,
      required: true,
    },
  },
  computed: {
    isTheCurrentMonth: function (): Boolean {
      return this.bellongMonth !== BellongMonth.current;
    },
  },
  data() {
    return {
      isSelect: false,
    };
  },
  methods: {
    handleSelectDay: function (): void {
      this.wasSelected();
      if (this.bellongMonth !== BellongMonth.current) {
        return;
      }
      this.isSelect = !this.isSelect;
    },
    selected: function (): void {
      if (this.alreadyHaveDayOtherSelected(this.day)) {
        return;
      }
      return this.handleSelectDay();
    },
    wasSelected: function () {
      this.$emit(DAY_SELECTED, this.day, this.bellongMonth);
    },
  },
});
</script>

<style lang="scss">
@import "../../../../style/StructureOfMonth/_Day";
</style>
