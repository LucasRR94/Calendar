<template>
  <div class="overlay">
    <div class="wrapper" @click="disabledPopover">
      <div class="selector">
        <button class="selector__btn" @click="handleClickUp">
          <img src="../../../img/up-button.png" />
        </button>
        <input
          class="selector__value"
          @change="handleInputText"
          @click="handleClick"
          @keyup="dispatchInputText"
          :value="value"
        />
        <button class="selector__btn" @click="handleClickDown">
          <img src="../../../img/down-button.png" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { DISABLE_SELECTOR_VISIBILITY } from "@/components/ui/constants";
import {
  HANDLE_CLICK_UP,
  HANDLE_CLICK_DOWN,
  HANDLE_INPUT_TEXT,
} from "@/components/ui/constants";

export default Vue.extend({
  name: "Selector",
  props: {
    value: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
  },
  data() {
    return {
      currentYearMonth: this.value,
    };
  },
  methods: {
    handleClick: function (event: any) {
      event.stopPropagation();
    },
    handleInputText: function (event: any) {
      event.stopPropagation();
      this.currentYearMonth = event.target.value;
    },
    dispatchInputText: function (event: any) {
      const keyCodeEnter = 13;
      if (event.keyCode === keyCodeEnter) {
        this.$emit(HANDLE_INPUT_TEXT, String(this.currentYearMonth));
        this.disabledPopover();
      }
    },
    handleClickUp: function (event: any) {
      event.stopPropagation();

      this.$emit(HANDLE_CLICK_UP, event);
    },
    handleClickDown: function (event: any) {
      event.stopPropagation();

      this.$emit(HANDLE_CLICK_DOWN, event);
    },
    disabledPopover: function () {
      this.$emit(DISABLE_SELECTOR_VISIBILITY);
    },
  },
});
</script>

<style lang="scss">
@import "../../../style/Selector.scss";
</style>
