import { ref, watch, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { u as useApi } from "./useApi-Krv8pagn.js";
import { b as useForm } from "./FrontendLayout-D9w5YXg3.js";
import "vue3-toastify";
const _sfc_main = {
  __name: "Address",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false },
    address: {
      type: Object,
      default: () => ({})
    },
    countries: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:show"],
  setup(__props, { emit: __emit }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const props = __props;
    const states = ref([]);
    const cities = ref([]);
    const addressForm = useForm({
      id: ((_a = props.address) == null ? void 0 : _a.id) || "",
      name: ((_b = props.address) == null ? void 0 : _b.name) || "",
      phone: ((_c = props.address) == null ? void 0 : _c.phone) || "",
      address: ((_d = props.address) == null ? void 0 : _d.address) || "",
      zip: ((_e = props.address) == null ? void 0 : _e.zip) || "",
      city_id: ((_f = props.address) == null ? void 0 : _f.city_id) || "",
      state_id: ((_g = props.address) == null ? void 0 : _g.state_id) || "",
      country_id: ((_h = props.address) == null ? void 0 : _h.country_id) || "",
      default: ((_i = props.address) == null ? void 0 : _i.default) || false
    });
    watch(
      () => props.address,
      (val) => {
        if (val) {
          addressForm.id = val.id || "", addressForm.name = val.name || "";
          addressForm.phone = val.phone || "";
          addressForm.address = val.address || "";
          addressForm.zip = val.zip || "";
          addressForm.city_id = val.city_id || "";
          addressForm.state_id = val.state_id || "";
          addressForm.country_id = val.country_id || "";
          addressForm.default = val.default || "";
        }
      },
      { deep: true, immediate: true }
    );
    const { request } = useApi();
    const getStates = async () => {
      if (addressForm.country_id) {
        const res = await request(`/api/v1/countries/${addressForm.country_id}/states`, {
          method: "GET",
          credentials: "include"
        });
        states.value = res.states;
      }
    };
    const getCities = async () => {
      if (addressForm.state_id) {
        const res = await request(`/api/v1/states/${addressForm.state_id}/cities`, {
          method: "GET",
          credentials: "include"
        });
        cities.value = res.cities;
      }
    };
    watch(
      () => addressForm.country_id,
      (newVal) => {
        getStates();
      },
      { immediate: true }
    );
    watch(
      () => addressForm.state_id,
      (newVal) => {
        getCities();
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4 py-6"><div class="bg-white p-4 sm:p-6 relative rounded-lg max-h-[80vh] w-full max-w-3xl flex flex-col"><div class="mb-4 sm:mb-6"><div class="flex items-center justify-between gap-2"><h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-primary-black">${ssrInterpolate(__props.address.id ? "Edit Address" : "Add Address")}</h2><button aria-label="Close modal" class="top-1 right-1 sm:top-2 sm:right-2"><svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 transition-colors" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path></svg></button></div></div><form class="space-y-3 lg:space-y-4"><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4"><div><label for="name" class="block text-sm font-medium text-primary-black mb-2">Name</label><input type="text" id="name" placeholder="John Carter" class="form-control"${ssrRenderAttr("value", unref(addressForm).name)} required>`);
          if (unref(addressForm).errors.name) {
            _push2(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(addressForm).errors.name)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div><label for="phone" class="block text-sm font-medium text-primary-black mb-2">Phone</label><input type="tel" id="phone" placeholder="+1 (415) 555-0199" class="form-control"${ssrRenderAttr("value", unref(addressForm).phone)} required>`);
          if (unref(addressForm).errors.phone) {
            _push2(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(addressForm).errors.phone)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="grid grid-cols-1 gap-3 lg:gap-4"><div><label for="address" class="block text-sm font-medium text-primary-black mb-2">Address</label><input type="text" id="address" placeholder="123 Queen St W" class="form-control"${ssrRenderAttr("value", unref(addressForm).address)} required>`);
          if (unref(addressForm).errors.address) {
            _push2(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(addressForm).errors.address)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4"><div><label for="country_id" class="block text-sm font-medium text-primary-black mb-2">Country</label><select id="country_id" class="form-control" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).country_id) ? ssrLooseContain(unref(addressForm).country_id, "") : ssrLooseEqual(unref(addressForm).country_id, "")) ? " selected" : ""}>Select</option><!--[-->`);
          ssrRenderList(__props.countries, (country) => {
            _push2(`<option${ssrRenderAttr("value", country.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).country_id) ? ssrLooseContain(unref(addressForm).country_id, country.id) : ssrLooseEqual(unref(addressForm).country_id, country.id)) ? " selected" : ""}>${ssrInterpolate(country.name)}</option>`);
          });
          _push2(`<!--]--></select>`);
          if (unref(addressForm).errors.country_id) {
            _push2(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(addressForm).errors.country_id)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div><label for="state_id" class="block text-sm font-medium text-primary-black mb-2">State</label><select id="state_id" class="form-control" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).state_id) ? ssrLooseContain(unref(addressForm).state_id, "") : ssrLooseEqual(unref(addressForm).state_id, "")) ? " selected" : ""}>Select</option><!--[-->`);
          ssrRenderList(states.value, (state) => {
            _push2(`<option${ssrRenderAttr("value", state.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).state_id) ? ssrLooseContain(unref(addressForm).state_id, state.id) : ssrLooseEqual(unref(addressForm).state_id, state.id)) ? " selected" : ""}>${ssrInterpolate(state.name)}</option>`);
          });
          _push2(`<!--]--></select>`);
          if (unref(addressForm).errors.state_id) {
            _push2(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(addressForm).errors.state_id)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4"><div><label for="city_id" class="block text-sm font-medium text-primary-black mb-2">City</label><select id="city_id" class="form-control" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).city_id) ? ssrLooseContain(unref(addressForm).city_id, "") : ssrLooseEqual(unref(addressForm).city_id, "")) ? " selected" : ""}>Select</option><!--[-->`);
          ssrRenderList(cities.value, (city) => {
            _push2(`<option${ssrRenderAttr("value", city.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).city_id) ? ssrLooseContain(unref(addressForm).city_id, city.id) : ssrLooseEqual(unref(addressForm).city_id, city.id)) ? " selected" : ""}>${ssrInterpolate(city.name)}</option>`);
          });
          _push2(`<!--]--></select>`);
          if (unref(addressForm).errors.city_id) {
            _push2(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(addressForm).errors.city_id)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div><label for="zip" class="block text-sm font-medium text-primary-black mb-2">Zip</label><input type="text" id="zip" placeholder="M5H 2M9" class="form-control"${ssrRenderAttr("value", unref(addressForm).zip)}>`);
          if (unref(addressForm).errors.zip) {
            _push2(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(addressForm).errors.zip)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="flex justify-center sm:justify-end pt-2 lg:pt-4"><button type="submit" class="flex items-center justify-center gap-2 !px-6 lg:!px-8 text-sm !py-2 primary-button w-full sm:w-auto"> Save </button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/Address.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
