<template>
  <ul class="header-list-days">
    <li class="day" v-for="day in days" :key="day">
      <span>{{ day }}</span>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Header",
  props: {},
  computed: {},
  data() {
    return {
      days: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
    };
  },
  methods: {},
});
</script>

<style lang="scss">
@import "../../../../style/StructureOfMonth/_Header.scss";
</style>
