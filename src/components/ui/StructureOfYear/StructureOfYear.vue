<template>
  <section class="year">
    <ul class="row">
      <li class="item" v-for="(item, index) in months" :key="index">
        <StructureOfMonth :month="item" :year="currentYear"></StructureOfMonth>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import StructureOfMonth from "../StructureOfMonth/StructureOfMonth.vue";
export default Vue.extend({
  components: { StructureOfMonth },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      months: Array.from({ length: 12 }, (_, i) => i),
    };
  },
});
</script>

<style lang="scss">
@import "../../../style/StructureOfYear/_StructureOfYear.scss";
</style>
