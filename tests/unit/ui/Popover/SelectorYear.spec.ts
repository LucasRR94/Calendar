import SelectorYear from "@/components/ui/Popover/SelectorYear.vue";
import { nextTick } from "vue";
import { shallowMount, mount } from "@vue/test-utils";

describe("SelectorYear", () => {
  it("renders properly", () => {
    const year = 10;
    const wrapperComponent = shallowMount(SelectorYear, {
      propsData: {
        year: year,
      },
    });
    expect(wrapperComponent.html()).toMatchSnapshot();
  });

  it("correctly decrease year when year is bigger than minimal number", async () => {
    const year = 2020;
    const emitEventUpdate = jest.fn();
    const wrapperComponent = mount(SelectorYear, {
      propsData: {
        year: year,
      },
      methods: {
        emitEventUpdate: emitEventUpdate,
      },
    });
    const btn = Array.from(wrapperComponent.findAll("button").wrappers)[1];
    btn.trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted("updateSelectorYearOrMonth")).toBeTruthy;
    expect(emitEventUpdate).toHaveBeenCalledWith(2019);
  });

  it("correctly do not decrease when year is bigger than minimal number", async () => {
    const year = 1970;
    const emitEventUpdate = jest.fn();
    const wrapperComponent = mount(SelectorYear, {
      propsData: {
        year: year,
      },
      methods: {
        emitEventUpdate: emitEventUpdate,
      },
    });
    const btn = Array.from(wrapperComponent.findAll("button").wrappers)[1];
    btn.trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted("updateSelectorYearOrMonth")).toBeTruthy;
    expect(emitEventUpdate).toHaveBeenCalledWith(1970);
  });

  it("correctly increase year", async () => {
    const year = 2020;
    const emitEventUpdate = jest.fn();
    const wrapperComponent = mount(SelectorYear, {
      propsData: {
        year: year,
      },
      methods: {
        emitEventUpdate: emitEventUpdate,
      },
    });
    const btn = Array.from(wrapperComponent.findAll("button").wrappers)[0];
    btn.trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted("updateSelectorYearOrMonth")).toBeTruthy;
    expect(emitEventUpdate).toHaveBeenCalledWith(2021);
  });

  it("correctly update the year in input", async () => {
    const year = 2020;
    const typedMonth = 2023;
    const emitEventUpdate = jest.fn();
    const wrapperComponent = mount(SelectorYear, {
      propsData: {
        year: year,
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
    expect(emitEventUpdate).toHaveBeenCalled();
    expect(emitEventUpdate).toHaveBeenCalledWith(typedMonth);
  });
});
