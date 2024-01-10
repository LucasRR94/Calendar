<template>
  <div class="toogle">
    <span :class="{ disable: isMonthView }">Month</span>
    <label class="switch">
      <input type="checkbox" :value="isMonthView" @click="toggleState" />
      <span class="slider round"></span>
    </label>
    <span :class="{ disable: !isMonthView }">Year</span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { CHANGE_TOGGLE_VIEW } from "../constants";

export default Vue.extend({
  name: "ToggleViewCalendar",
  props: {
    isMonthView: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  methods: {
    toggleState: function () {
      this.$emit(CHANGE_TOGGLE_VIEW);
    },
  },
});
</script>

<style lang="scss">
@import "../../../style/ToggleViewCalendar/ToggleViewCalendar";
</style>
