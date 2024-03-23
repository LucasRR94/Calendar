<template>
  <div>
    <button class="disable-popover" @click="emitEvent"></button>
    <button class="update-selector" @click="handleSelectorYearOrMonth"></button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    emitEvent: function (): void {
      if (!this.$parent) return;
      this.$parent.$emit("disable_popover_visibility");
    },
    handleSelectorYearOrMonth: function () {
      if (!this.$parent) return;
      this.$parent.$emit("updateSelectorYearOrMonth", -1, -1);
    },
  },
});
</script>
