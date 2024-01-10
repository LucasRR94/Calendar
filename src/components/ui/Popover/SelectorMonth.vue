<template>
  <Selector
    @handleClickUp="handleClickUp"
    @handleClickDown="handleClickDown"
    :value="actualMonth"
    @disableSelector="disablePopover"
    @handleInputText="handleInputText"
  ></Selector>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Selector from "@/components/ui/Popover/Selector.vue";
import { months } from "@/Core/Domain/dateDomain";
import {
  increaseMonth,
  decreaseMonth,
  sanitizingMonth,
  getShorteningVersion,
  findClosestMatchWordWithMonth,
} from "@/components/ui/Popover/utils";

import {
  UPDATE_DATE_SELECTOR_EVENT,
  DISABLE_POPOVER_VISIBILITY,
} from "@/components/ui/constants";
import { validateMonth } from "@/components/ui/StructureOfMonth/utils";

export default Vue.extend({
  name: "SelectorMonth",
  components: { Selector },
  props: {
    month: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  methods: {
    emitEventUpdate: function (newMonth: number): void {
      if (!this.$parent) return;
      this.$parent.$emit(UPDATE_DATE_SELECTOR_EVENT, -1, newMonth);
    },
    handleInputText: function (e: string): void {
      const newMonth = sanitizingMonth(e);
      const closesMatchMonth = findClosestMatchWordWithMonth(newMonth);
      if (!validateMonth(closesMatchMonth)) {
        return;
      }
      this.emitEventUpdate(closesMatchMonth);
    },
    handleClickUp: function (): void {
      const newMonth = increaseMonth(this.month);
      this.emitEventUpdate(newMonth);
    },
    handleClickDown: function (): void {
      const newMonth = decreaseMonth(this.month);
      this.emitEventUpdate(newMonth);
    },
    disablePopover: function (): void {
      if (!this.$parent) return;
      this.$parent.$emit(DISABLE_POPOVER_VISIBILITY);
    },
  },
  computed: {
    actualMonth: function (): string {
      return getShorteningVersion(months[String(this.month)]);
    },
  },
});
</script>
