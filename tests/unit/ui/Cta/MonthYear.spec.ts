import { nextTick } from "vue";
import MonthYearVue from "@/components/ui/Cta/MonthYear.vue";
import { shallowMount } from "@vue/test-utils";
import mockedComponent from "./mockedComponent.vue";

describe("MonthYearVue", () => {
  it("renders correctly when month", () => {
    const wrapperComponent: any = shallowMount(MonthYearVue, {
      propsData: {
        year: undefined,
        month: 11,
      },
      slots: {
        default: "<span> my component </span>",
      },
    });
    expect(wrapperComponent.html()).toMatchSnapshot();
  });

  it("renders correctly when year", () => {
    const wrapperComponent: any = shallowMount(MonthYearVue, {
      propsData: {
        year: 2023,
        month: undefined,
      },
      slots: {
        default: "<span> my component </span>",
      },
    });
    expect(wrapperComponent.html()).toMatchSnapshot();
  });

  it("renders correctly when month and isPopoverVisible", async () => {
    const wrapperComponent: any = shallowMount(MonthYearVue, {
      propsData: {
        year: undefined,
        month: 11,
      },
      slots: {
        default: "<span> my component </span>",
      },
    });
    wrapperComponent.find("button").trigger("click");
    await nextTick();
    expect(wrapperComponent.html()).toMatchSnapshot();
  });

  it("renders correctly when year and isPopoverVisible", async () => {
    const wrapperComponent: any = shallowMount(MonthYearVue, {
      propsData: {
        year: 2023,
        month: undefined,
      },
      slots: {
        default: "<span> my component </span>",
      },
    });
    wrapperComponent.find("button").trigger("click");
    await nextTick();
    expect(wrapperComponent.html()).toMatchSnapshot();
  });

  it("correctly can exposes the short version of name", async () => {
    const wrapperComponent: any = shallowMount(MonthYearVue, {
      propsData: {
        year: undefined,
        month: 10,
      },
      slots: {
        default: mockedComponent,
      },
    });
    expect(wrapperComponent.text()).toStrictEqual("NOV");
  });

  it("correctly exposes children when isPopoverVisible", async () => {
    const wrapperComponent: any = shallowMount(MonthYearVue, {
      propsData: {
        year: undefined,
        month: 0,
      },
      slots: {
        default: "<span> my component </span>",
      },
    });
    expect(wrapperComponent.text()).not.toContain("my component");
    wrapperComponent.find("button").trigger("click");
    await nextTick();
    expect(wrapperComponent.text()).toContain("my component");
  });

  it("correctly can triggered isPopover using the slot mocked", async () => {
    const wrapperComponent: any = shallowMount(MonthYearVue, {
      propsData: {
        year: 2023,
        month: undefined,
      },
      slots: {
        default: mockedComponent,
      },
    });
    wrapperComponent.find("button").trigger("click");
    await nextTick();
    wrapperComponent.find(".disable-popover").trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted("disable_popover_visibility")).toBeTruthy();
  });

  it("correctly can triggered update selector year or month and arguments using slot mocked", async () => {
    const wrapperComponent: any = shallowMount(MonthYearVue, {
      propsData: {
        year: 2023,
        month: undefined,
      },
      slots: {
        default: mockedComponent,
      },
    });
    wrapperComponent.find("button").trigger("click");
    await nextTick();
    wrapperComponent.find(".update-selector").trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted("updateSelectorYearOrMonth")).toBeTruthy();
    expect(
      wrapperComponent.emitted().updateSelectorYearOrMonth[0]
    ).toStrictEqual([-1, -1]);
  });

  it("correctly can triggered update data picker and arguments using slot mocked", async () => {
    const wrapperComponent: any = shallowMount(MonthYearVue, {
      propsData: {
        year: 2023,
        month: undefined,
      },
      slots: {
        default: mockedComponent,
      },
    });
    wrapperComponent.find("button").trigger("click");
    await nextTick();
    wrapperComponent.find(".update-selector").trigger("click");
    await nextTick();
    expect(wrapperComponent.emitted("updateDataPicker")).toBeTruthy();
    expect(wrapperComponent.emitted().updateDataPicker[0]).toStrictEqual([
      -1, -1,
    ]);
  });
});
