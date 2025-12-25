import { ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderDynamicModel } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Address-CB7ww3x-.js";
import { b as useForm, h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import "vue3-toastify";
import "./useApi-Krv8pagn.js";
import "ofetch";
import "@inertiajs/core";
import "lodash-es";
import "pinia";
const defaultImage = "/build/assets/default-avatar-Civ1-c5S.png";
const _sfc_main = {
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    seo: Object,
    user: Object,
    addresses: Array,
    countries: Array
  },
  setup(__props) {
    const props = __props;
    const showAddressForm = ref(false);
    const selectedAddress = ref({});
    const isCurrentPasswordVisible = ref(false);
    const isNewPasswordVisible = ref(false);
    const isConfirmPasswordVisible = ref(false);
    const imageForm = useForm({
      avatar: null
    });
    const informationForm = useForm({
      first_name: props.user.first_name || "",
      last_name: props.user.last_name || "",
      phone: props.user.phone || "",
      dob: props.user.dob || ""
    });
    const avatarUrl = ref(null);
    if (props.user.avatar) {
      avatarUrl.value = props.user.avatar;
    } else {
      avatarUrl.value = defaultImage;
    }
    ref(null);
    const passwordForm = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(head_default), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(__props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", __props.seo.description)}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.seo.title), 1),
              createVNode("meta", {
                name: "description",
                content: __props.seo.description
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="section-padding mx-auto max-w-4xl"><div class="container"><nav class="text-sm mb-3 lg:mb-4" aria-label="Breadcrumb"><ol class="list-reset flex text-primary-gray flex-wrap"><li>`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/",
        class: "hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="mx-2">&gt;</span></li><li class="text-gray-800 font-semibold">Profile</li></ol></nav><div class="space-y-3 lg:space-y-4"><div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6"><h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-3 lg:mb-4"> My profile </h1><div class="mb-0"><h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4">Basic info</h2><div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4 mb-3 lg:mb-4"><div class="relative flex-shrink-0"><img${ssrRenderAttr("src", avatarUrl.value)} alt="Profile photo" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200"></div><div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto"><button class="flex items-center gap-2 !px-3 text-sm !py-2 primary-button w-full sm:w-auto justify-center sm:justify-start"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Change photo </button><input type="file" class="hidden" accept="image/png, image/jpeg">`);
      if (unref(imageForm).avatar) {
        _push(`<button class="primary-button flex items-center gap-2 !py-2.5 w-full sm:w-auto justify-center sm:justify-start"> Update </button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(imageForm).avatar) {
        _push(`<button class="danger-button-outline flex items-center gap-2 !py-2.5 w-full sm:w-auto justify-center sm:justify-start"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Reset </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(imageForm).errors.avatar) {
        _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(imageForm).errors.avatar)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-3 lg:space-y-4"><div class="grid grid-cols-1"><div><label for="email" class="block text-sm font-medium text-primary-black mb-2">Email</label><input type="email" id="email" placeholder="john.carter@example.com"${ssrRenderAttr("value", __props.user.email)} class="form-control" disabled></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4"><div><label for="firstName" class="block text-sm font-medium text-primary-black mb-2">First name</label><input type="text" id="firstName" placeholder="John" class="form-control"${ssrRenderAttr("value", unref(informationForm).first_name)} required>`);
      if (unref(informationForm).errors.first_name) {
        _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(informationForm).errors.first_name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="lastName" class="block text-sm font-medium text-primary-black mb-2">Last name</label><input type="text" id="lastName" placeholder="Carter" class="form-control"${ssrRenderAttr("value", unref(informationForm).last_name)}>`);
      if (unref(informationForm).errors.last_name) {
        _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(informationForm).errors.last_name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4"><div><label for="phone" class="block text-sm font-medium text-primary-black mb-2">Phone</label><input type="tel" id="phone" placeholder="+1 (415) 555-0199"${ssrRenderAttr("value", unref(informationForm).phone)} class="form-control">`);
      if (unref(informationForm).errors.phone) {
        _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(informationForm).errors.phone)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="birthday" class="block text-sm font-medium text-primary-black mb-2">Birthday</label><input type="date" id="birthday" class="form-control"${ssrRenderAttr("value", unref(informationForm).dob)}>`);
      if (unref(informationForm).errors.dob) {
        _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(informationForm).errors.dob)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2"><button type="submit" class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 primary-button"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg> Save changes </button><button type="button" class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 primary-button-outline"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Reset </button></div></form></div></div><div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6"><h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4">Addresses</h2><!--[-->`);
      ssrRenderList(__props.addresses, (address) => {
        _push(`<div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg gap-3 sm:gap-0"><div class="flex items-center gap-3"><svg class="w-5 h-5 text-primary-gray flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><div><p class="font-medium text-primary-black text-sm lg:text-base">${ssrInterpolate(address.name)} (${ssrInterpolate(address.phone)}) </p><p class="font-medium text-primary-black text-sm lg:text-base">${ssrInterpolate(address.address)}, ${ssrInterpolate(address.city.name)}, ${ssrInterpolate(address.state.name)}, ${ssrInterpolate(address.country.name)} ${ssrInterpolate(address.zip)}</p></div></div><div class="flex items-center gap-2"><button class="!px-3 lg:!px-4 text-sm !py-1 !font-normal primary-button-outline flex-1 sm:flex-none"> Edit </button>`);
        if (__props.addresses.length > 1) {
          _push(`<button class="danger-button !py-1.5 flex-1 sm:flex-none">Remove</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--><button class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 my-4 primary-button w-full sm:w-auto"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Add Address </button></div><div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6">`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/my-orders",
        class: "flex items-center justify-center gap-2 !px-4 text-sm !py-2 my-4 primary-button w-full sm:w-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Orders `);
          } else {
            return [
              createTextVNode(" Orders ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6"><h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4"> Password Settings </h2><form class="space-y-3 lg:space-y-4"><div class="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">`);
      if (__props.user.has_password) {
        _push(`<div><label for="currentPassword" class="block text-sm font-medium text-primary-black mb-2">Current Password</label><div class="relative"><input${ssrRenderAttr("type", isCurrentPasswordVisible.value ? "text" : "password")} id="currentPassword" placeholder="••••••••" class="${ssrRenderClass([{ "border-red-500": unref(passwordForm).errors.current_password }, "form-control pr-10"])}"${ssrRenderDynamicModel(isCurrentPasswordVisible.value ? "text" : "password", unref(passwordForm).current_password, null)} required><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black">`);
        if (isCurrentPasswordVisible.value) {
          _push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path><path d="M3 3l18 18"></path></svg>`);
        }
        _push(`</button></div>`);
        if (unref(passwordForm).errors.current_password) {
          _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(passwordForm).errors.current_password)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label for="newPassword" class="block text-sm font-medium text-primary-black mb-2">New Password</label><div class="relative"><input${ssrRenderAttr("type", isNewPasswordVisible.value ? "text" : "password")} id="newPassword" placeholder="••••••••" class="${ssrRenderClass([{ "border-red-500": unref(passwordForm).errors.password }, "form-control pr-10"])}"${ssrRenderDynamicModel(isNewPasswordVisible.value ? "text" : "password", unref(passwordForm).password, null)} required><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black">`);
      if (isNewPasswordVisible.value) {
        _push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path><path d="M3 3l18 18"></path></svg>`);
      }
      _push(`</button></div>`);
      if (unref(passwordForm).errors.password) {
        _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(passwordForm).errors.password)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="confirmPassword" class="block text-sm font-medium text-primary-black mb-2">Confirm New Password</label><div class="relative"><input${ssrRenderAttr("type", isConfirmPasswordVisible.value ? "text" : "password")} id="confirmPassword" placeholder="••••••••" class="form-control pr-10"${ssrRenderDynamicModel(isConfirmPasswordVisible.value ? "text" : "password", unref(passwordForm).password_confirmation, null)} required><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black">`);
      if (isConfirmPasswordVisible.value) {
        _push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path><path d="M3 3l18 18"></path></svg>`);
      }
      _push(`</button></div></div></div><div class="flex justify-center sm:justify-end pt-2 lg:pt-4"><button type="submit" class="flex items-center justify-center gap-2 !px-6 lg:!px-8 text-sm !py-2 primary-button w-full sm:w-auto"> Save </button></div></form></div></div></div></section>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        show: showAddressForm.value,
        "onUpdate:show": ($event) => showAddressForm.value = $event,
        countries: __props.countries,
        address: selectedAddress.value
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
