import { nextTick } from "vue";
import Selector from "@/components/ui/Popover/Selector.vue";
import {
  HANDLE_CLICK_UP,
  HANDLE_CLICK_DOWN,
  DISABLE_SELECTOR_VISIBILITY,
  HANDLE_INPUT_TEXT,
} from "@/components/ui/constants";
import { shallowMount, mount } from "@vue/test-utils";

describe("Selector", () => {
  it("correctly renders when value is a string", () => {
    const myString = "JUNE";
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myString,
      },
    });
    expect(wrapperComponent.html()).toMatchSnapshot();
  });

  it("correctly renders when value is a string", () => {
    const myNumber = 10;
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myNumber,
      },
    });
    expect(wrapperComponent.html()).toMatchSnapshot();
  });

  it("correctly emit the click up event when value is a string", async () => {
    const myString = "JUNE";
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myString,
      },
    });
    const clickUpBtn = Array.from(
      wrapperComponent.findAll(".selector__btn").wrappers
    )[0];
    clickUpBtn.trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted(HANDLE_CLICK_UP)).toBeTruthy();
  });

  it("correctly emit the click down event when value is a string", async () => {
    const myString = "JUNE";
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myString,
      },
    });
    const clickDownBtn = Array.from(
      wrapperComponent.findAll(".selector__btn").wrappers
    )[1];
    clickDownBtn.trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted(HANDLE_CLICK_DOWN)).toBeTruthy();
  });

  it("correctly emit the click up event when value is a number", async () => {
    const myNumb = 10;
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myNumb,
      },
    });
    const clickUpBtn = Array.from(
      wrapperComponent.findAll(".selector__btn").wrappers
    )[0];
    clickUpBtn.trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted(HANDLE_CLICK_UP)).toBeTruthy();
  });

  it("correctly emit the click down event when render value is a number", async () => {
    const myNumb = 10;
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myNumb,
      },
    });
    const clickUpBtn = Array.from(
      wrapperComponent.findAll(".selector__btn").wrappers
    )[1];
    clickUpBtn.trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted(HANDLE_CLICK_DOWN)).toBeTruthy();
  });

  it("correctly modify the value when select the input field when value is a number", async () => {
    const myNumb = 10;
    const myTestNumber = 2023;
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myNumb,
      },
    });
    const inputField = wrapperComponent.find(".selector__value");
    inputField.setValue(myTestNumber);
    const inputResult = wrapperComponent.find(".selector__value")
      .element as HTMLInputElement;
    await nextTick();
    expect(inputResult.value).toEqual(String(myTestNumber));
  });

  it("correctly modify the value when select the input field when value is a string", async () => {
    const myString = "June";
    const myTestString = "JULY";
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myString,
      },
    });
    const inputField = wrapperComponent.find(".selector__value");
    inputField.setValue(myTestString);
    const inputResult = wrapperComponent.find(".selector__value")
      .element as HTMLInputElement;
    await nextTick();
    expect(inputResult.value).toEqual(String(myTestString));
  });

  it("correctly emit when key up detect enter code when value is a string", async () => {
    const myString = "June";
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myString,
      },
    });
    const inputField = wrapperComponent.find(".selector__value");
    inputField.trigger("keyup", { keyCode: 13 });
    await nextTick();
    expect(wrapperComponent.emitted(HANDLE_INPUT_TEXT)).toBeTruthy();
    expect(wrapperComponent.emitted(DISABLE_SELECTOR_VISIBILITY)).toBeTruthy();
  });

  it("correctly emit when key up detect enter code when value is a number", async () => {
    const myNumber = 10;
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myNumber,
      },
    });
    const inputField = wrapperComponent.find(".selector__value");
    inputField.trigger("keyup", { keyCode: 13 });
    await nextTick();
    expect(wrapperComponent.emitted(HANDLE_INPUT_TEXT)).toBeTruthy();
    expect(wrapperComponent.emitted(DISABLE_SELECTOR_VISIBILITY)).toBeTruthy();
  });

  it("correctly dispatch event DISABLE_SELECTOR_VISIBILITY when wrapper clicked", async () => {
    const myNumber = 10;
    const wrapperComponent = shallowMount(Selector, {
      propsData: {
        value: myNumber,
      },
    });
    const wrapper = wrapperComponent.find(".wrapper");
    wrapper.trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted(DISABLE_SELECTOR_VISIBILITY)).toBeTruthy();
  });
});
