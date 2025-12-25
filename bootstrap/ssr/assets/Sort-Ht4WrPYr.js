import { ssrRenderTeleport, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrLooseEqual } from "vue/server-renderer";
import { ref, watch, useSSRContext, computed } from "vue";
const _sfc_main$3 = {
  __name: "AttributeFilter",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false },
    attribute: { type: Object, required: true },
    selectedValues: { type: Array, default: () => [] }
  },
  emits: ["update:show", "apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selection = ref([...props.selectedValues]);
    watch(
      () => props.selectedValues,
      (val) => {
        selection.value = [...val];
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4 py-6"><div class="bg-white p-4 sm:p-6 relative rounded-lg max-h-[80vh] w-full max-w-3xl flex flex-col"><div class="flex items-center justify-between mb-4 sm:mb-6">`);
          if (__props.attribute.name == "Size") {
            _push2(`<div class="flex items-center gap-2"><svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.975 11.475C16.3139 11.8127 16.5044 12.2715 16.5044 12.75C16.5044 13.2285 16.3139 13.6873 15.975 14.025L14.025 15.975C13.6873 16.3139 13.2285 16.5044 12.75 16.5044C12.2715 16.5044 11.8127 16.3139 11.475 15.975L2.025 6.525C1.32324 5.81984 1.32324 4.68016 2.025 3.975L3.975 2.025C4.68016 1.32324 5.81984 1.32324 6.525 2.025M10.875 9.375L12.375 7.875M8.625 7.125L10.125 5.625M6.375 4.875L7.875 3.375M13.125 11.625L14.625 10.125" stroke="#0F1724" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-primary-black"> Select Size </h2></div>`);
          } else if (__props.attribute.name == "Color") {
            _push2(`<div class="flex items-center gap-2"><svg class="w-5 h-5 sm:w-6 sm:h-6" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.003a7 7 0 0 0-7 7v.43c.09 1.51 1.91 1.79 3 .7a1.87 1.87 0 0 1 2.64 2.64c-1.1 1.16-.79 3.07.8 3.2h.6a7 7 0 1 0 0-14l-.04.03zm0 13h-.52a.58.58 0 0 1-.36-.14.56.56 0 0 1-.15-.3 1.24 1.24 0 0 1 .35-1.08 2.87 2.87 0 0 0 0-4 2.87 2.87 0 0 0-4.06 0 1 1 0 0 1-.9.34.41.41 0 0 1-.22-.12.42.42 0 0 1-.1-.29v-.37a6 6 0 1 1 6 6l-.04-.04zM9 3.997a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 7.007a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-7-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM13 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg><h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-primary-black"> Select Color </h2></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button aria-label="Close modal" class="top-1 right-1 sm:top-2 sm:right-2"><svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 transition-colors" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path></svg></button></div><div class="overflow-y-auto flex-grow grid gap-6 lg:gap-8 grid-cols-1"><div><div class="space-y-2 sm:space-y-3"><!--[-->`);
          ssrRenderList(__props.attribute.items, (child) => {
            _push2(`<label class="flex items-center justify-between p-2.5 sm:p-3 border border-border-primary rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"><div class="flex items-center"><input type="checkbox"${ssrRenderAttr("name", child.name)}${ssrRenderAttr("value", child.id)}${ssrIncludeBooleanAttr(Array.isArray(selection.value) ? ssrLooseContain(selection.value, child.id) : selection.value) ? " checked" : ""} class="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary-black border-gray-300 rounded focus:ring-primary-black">`);
            if (__props.attribute.name == "Color") {
              _push2(`<div class="w-4 h-4 sm:w-5 sm:h-5 rounded-full ml-3 mr-2 border border-gray-300" style="${ssrRenderStyle({ backgroundColor: child.additional_information || "#ffffff" })}"></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="ml-3 text-sm sm:text-base text-primary-black">${ssrInterpolate(child.name)}</span></div><span class="text-xs sm:text-sm text-primary-gray font-medium">${ssrInterpolate(child.product_count)}</span></label>`);
          });
          _push2(`<!--]--></div></div></div><div class="flex items-start gap-2 mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg"><svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-xs sm:text-sm text-blue-700">You can pick multiple items.</p></div><div class="flex-shrink-0 bg-white py-3 sm:py-4 rounded-t-lg flex flex-col sm:flex-row gap-3"><button type="button" class="primary-button-outline !py-2.5 !sm:py-3"> Clear </button><div class="flex flex-col sm:flex-row gap-3 sm:ml-auto"><button type="button" class="primary-button px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"> Apply </button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/AttributeFilter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "CategoryFilter",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false },
    categories: { type: Array, required: true },
    selectedValues: { type: Array, default: () => [] }
  },
  emits: ["update:show", "apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selection = ref([...props.selectedValues]);
    watch(
      () => props.selectedValues,
      (val) => {
        selection.value = [...val];
      }
    );
    const gridColsClass = computed(() => {
      return props.categories.length === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2";
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4 py-6"><div class="bg-white p-4 sm:p-6 relative rounded-lg max-h-[80vh] w-full max-w-3xl flex flex-col"><div class="flex items-center justify-between mb-4 sm:mb-6"><div class="flex items-center gap-2"><svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.25H6.75C7.16394 2.25 7.5 2.58606 7.5 3V6.75C7.5 7.16394 7.16394 7.5 6.75 7.5H3C2.58606 7.5 2.25 7.16394 2.25 6.75V3C2.25 2.58606 2.58606 2.25 3 2.25" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.25 2.25H15C15.4139 2.25 15.75 2.58606 15.75 3V6.75C15.75 7.16394 15.4139 7.5 15 7.5H11.25C10.8361 7.5 10.5 7.16394 10.5 6.75V3C10.5 2.58606 10.8361 2.25 11.25 2.25" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.25 10.5H15C15.4139 10.5 15.75 10.8361 15.75 11.25V15C15.75 15.4139 15.4139 15.75 15 15.75H11.25C10.8361 15.75 10.5 15.4139 10.5 15V11.25C10.5 10.8361 10.8361 10.5 11.25 10.5" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 10.5H6.75C7.16394 10.5 7.5 10.8361 7.5 11.25V15C7.5 15.4139 7.16394 15.75 6.75 15.75H3C2.58606 15.75 2.25 15.4139 2.25 15V11.25C2.25 10.8361 2.58606 10.5 3 10.5" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-primary-black"> Choose Category </h2></div><button aria-label="Close modal" class="top-1 right-1 sm:top-2 sm:right-2"><svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 transition-colors" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path></svg></button></div><div class="${ssrRenderClass([gridColsClass.value, "overflow-y-auto flex-grow grid gap-6 lg:gap-8"])}"><!--[-->`);
          ssrRenderList(__props.categories, (category) => {
            _push2(`<div><h3 class="text-base sm:text-lg font-semibold text-primary-black mb-3 sm:mb-4">${ssrInterpolate(category.name)}</h3><div class="space-y-2 sm:space-y-3"><!--[-->`);
            ssrRenderList(category.children, (child) => {
              _push2(`<label class="flex items-center justify-between p-2.5 sm:p-3 border border-border-primary rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"><div class="flex items-center"><input type="checkbox"${ssrRenderAttr("name", child.name)}${ssrRenderAttr("value", child.id)}${ssrIncludeBooleanAttr(Array.isArray(selection.value) ? ssrLooseContain(selection.value, child.id) : selection.value) ? " checked" : ""} class="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary-black border-gray-300 rounded focus:ring-primary-black"><span class="ml-3 text-sm sm:text-base text-primary-black">${ssrInterpolate(child.name)}</span></div><span class="text-xs sm:text-sm text-primary-gray font-medium">${ssrInterpolate(child.product_count)}</span></label>`);
            });
            _push2(`<!--]--></div></div>`);
          });
          _push2(`<!--]--></div><div class="flex items-start gap-2 mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg"><svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-xs sm:text-sm text-blue-700">You can pick multiple categories.</p></div><div class="flex-shrink-0 bg-white py-3 sm:py-4 rounded-t-lg flex flex-col sm:flex-row gap-3"><button type="button" class="primary-button-outline !py-2.5 !sm:py-3"> Clear </button><div class="flex flex-col sm:flex-row gap-3 sm:ml-auto"><button type="button" class="primary-button px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"> Apply </button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/CategoryFilter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "PriceFilter",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false },
    priceRanges: { type: Object, required: true },
    selectedValue: { type: String, default: null }
  },
  emits: ["update:show", "apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selection = ref(props.selectedValue);
    watch(
      () => props.selectedValue,
      (val) => {
        selection.value = val;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4 py-6"><div class="bg-white p-4 sm:p-6 relative rounded-lg max-h-[80vh] w-full max-w-3xl flex flex-col"><div class="flex items-center justify-between mb-4 sm:mb-6"><div class="flex items-center gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg><h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-primary-black"> Select Price Range </h2></div><button aria-label="Close modal" class="top-1 right-1 sm:top-2 sm:right-2"><svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 transition-colors" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path></svg></button></div><div class="overflow-y-auto flex-grow grid gap-6 lg:gap-8 grid-cols-1"><div><div class="space-y-2 sm:space-y-3"><!--[-->`);
          ssrRenderList(__props.priceRanges, (child) => {
            _push2(`<label class="flex items-center justify-between p-2.5 sm:p-3 border border-border-primary rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"><div class="flex items-center"><input type="radio"${ssrRenderAttr("name", child.label)}${ssrRenderAttr("value", child.label)}${ssrIncludeBooleanAttr(ssrLooseEqual(selection.value, child.label)) ? " checked" : ""} class="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary-black border-gray-300 rounded focus:ring-primary-black"><span class="ml-3 text-sm sm:text-base text-primary-black">${ssrInterpolate(child.label)}</span></div><span class="text-xs sm:text-sm text-primary-gray font-medium">${ssrInterpolate(child.product_count)}</span></label>`);
          });
          _push2(`<!--]--></div></div></div><div class="flex items-start gap-2 mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg"><svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-xs sm:text-sm text-blue-700">Numbers show currently available products in each price range. </p></div><div class="flex-shrink-0 bg-white py-3 sm:py-4 rounded-t-lg flex flex-col sm:flex-row gap-3"><button type="button" class="primary-button-outline !py-2.5 !sm:py-3"> Clear </button><div class="flex flex-col sm:flex-row gap-3 sm:ml-auto"><button type="button" class="primary-button px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"> Apply </button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/PriceFilter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Sort",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false },
    sortOptions: { type: Array, required: true },
    selectedValue: { type: String, default: null }
  },
  emits: ["update:show", "apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selection = ref(props.selectedValue);
    watch(
      () => props.selectedValue,
      (val) => {
        selection.value = val;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4 py-6"><div class="bg-white p-4 sm:p-6 relative rounded-lg max-h-[80vh] w-full max-w-3xl flex flex-col"><div class="flex items-center justify-between mb-4 sm:mb-6"><div class="flex items-center gap-2"><svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path></svg><h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-primary-black"> Select Sorting </h2></div><button aria-label="Close modal" class="top-1 right-1 sm:top-2 sm:right-2"><svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 transition-colors" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path></svg></button></div><div class="overflow-y-auto flex-grow grid gap-6 lg:gap-8 grid-cols-1"><div><div class="space-y-2 sm:space-y-3"><!--[-->`);
          ssrRenderList(__props.sortOptions, (child) => {
            _push2(`<label class="flex items-center justify-between p-2.5 sm:p-3 border border-border-primary rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"><div class="flex items-center"><input type="radio"${ssrRenderAttr("name", child.label)}${ssrRenderAttr("value", child.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(selection.value, child.value)) ? " checked" : ""} class="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary-black border-gray-300 rounded focus:ring-primary-black"><span class="ml-3 text-sm sm:text-base text-primary-black">${ssrInterpolate(child.label)}</span></div></label>`);
          });
          _push2(`<!--]--></div></div></div><div class="flex items-start gap-2 mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg"><svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-xs sm:text-sm text-blue-700">Select a sorting option to reorder products on the page. </p></div><div class="flex-shrink-0 bg-white py-3 sm:py-4 rounded-t-lg flex flex-col sm:flex-row gap-3"><button type="button" class="primary-button-outline !py-2.5 !sm:py-3"> Clear </button><div class="flex flex-col sm:flex-row gap-3 sm:ml-auto"><button type="button" class="primary-button px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"> Apply </button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/Sort.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$2 as _,
  _sfc_main$3 as a,
  _sfc_main$1 as b,
  _sfc_main as c
};
