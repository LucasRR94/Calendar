<template>
  <Selector
    @handleClickDown="handleClickDown"
    @handleClickUp="handleClickUp"
    :value="year"
    @disableSelector="disablePopover"
    @handleInputText="handleInputText"
  >
  </Selector>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Selector from "@/components/ui/Popover/Selector.vue";
import { decreaseYear, sanitizingYear } from "@/components/ui/Popover/utils";
import {
  UPDATE_DATE_SELECTOR_EVENT,
  DISABLE_POPOVER_VISIBILITY,
} from "@/components/ui/constants";
import { validateYear } from "@/components/ui/StructureOfMonth/utils";

export default Vue.extend({
  name: "SelectorYear",
  components: { Selector },
  props: {
    year: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  methods: {
    emitEventUpdate: function (newYear: number): void {
      if (!this.$parent) return;
      this.$parent.$emit(UPDATE_DATE_SELECTOR_EVENT, newYear, -1);
    },
    handleInputText: function (e: string): void {
      const newYear: number = parseInt(sanitizingYear(e));
      if (!validateYear(newYear)) {
        return;
      }
      this.emitEventUpdate(newYear);
    },
    handleClickUp: function (): void {
      const newYear = this.year + 1;
      this.emitEventUpdate(newYear);
    },
    handleClickDown: function (): void {
      const newYear = decreaseYear(this.year);
      this.emitEventUpdate(newYear);
    },
    disablePopover: function (): void {
      if (!this.$parent) return;
      this.$parent.$emit(DISABLE_POPOVER_VISIBILITY);
    },
  },
});
</script>
