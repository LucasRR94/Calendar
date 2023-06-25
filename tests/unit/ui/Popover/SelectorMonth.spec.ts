import SelectorMonth from "@/components/ui/Popover/SelectorMonth.vue";
import { nextTick } from "vue";
import { shallowMount, mount } from "@vue/test-utils";

describe("SelectorMonth", () => {
  it("renders properly", () => {
    const month = 10;
    const wrapperComponent = shallowMount(SelectorMonth, {
      propsData: {
        month: month,
      },
    });
    expect(wrapperComponent.html()).toMatchSnapshot();
  });

  it("correctly display the short version of the month", async () => {
    const month = 0;
    const wrapperComponent = shallowMount(SelectorMonth, {
      propsData: {
        month: month,
      },
    });
    const wrapper = wrapperComponent.vm as any;
    const actualMonth: string = wrapper.actualMonth;
    await nextTick();
    expect(actualMonth).toStrictEqual("JAN");
  });

  it("correctly decrease month when month is january", async () => {
    const month = 0;
    const emitEventUpdate = jest.fn();
    const wrapperComponent = mount(SelectorMonth, {
      propsData: {
        month: month,
      },
      methods: {
        emitEventUpdate: emitEventUpdate,
      },
    });
    const btn = Array.from(wrapperComponent.findAll("button").wrappers)[1];
    btn.trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted("updateSelectorYearOrMonth")).toBeTruthy;
    expect(emitEventUpdate).toHaveBeenCalledWith(11);
  });

  it("correctly increase month when month is december", async () => {
    const month = 11;
    const emitEventUpdate = jest.fn();
    const wrapperComponent = mount(SelectorMonth, {
      propsData: {
        month: month,
      },
      methods: {
        emitEventUpdate: emitEventUpdate,
      },
    });
    const btn = Array.from(wrapperComponent.findAll("button").wrappers)[0];
    btn.trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted("updateSelectorYearOrMonth")).toBeTruthy;
    expect(emitEventUpdate).toHaveBeenCalledWith(0);
  });

  it("correctly match a month in input", async () => {
    const month = 11;
    const typedMonth = "JUNE";
    const emitEventUpdate = jest.fn();
    const wrapperComponent = mount(SelectorMonth, {
      propsData: {
        month: month,
      },
      methods: {
        emitEventUpdate: emitEventUpdate,
      },
    });
    const inputField = wrapperComponent.find("input");
    inputField.setValue(typedMonth);
    inputField.trigger("change");
    inputField.trigger("keyup", { keyCode: 13 });
    await nextTick();
    expect(emitEventUpdate).toHaveBeenCalledWith(5);
  });

  it("do not update when there is no match on a month", async () => {
    const month = 11;
    const typedMonth = "X1kj";
    const emitEventUpdate = jest.fn();
    const wrapperComponent = mount(SelectorMonth, {
      propsData: {
        month: month,
      },
      methods: {
        emitEventUpdate: emitEventUpdate,
      },
    });
    const inputField = wrapperComponent.find("input");
    inputField.setValue(typedMonth);
    inputField.trigger("change");
    inputField.trigger("keyup", { keyCode: 13 });
    await nextTick();
    expect(emitEventUpdate).not.toHaveBeenCalled();
  });
});
