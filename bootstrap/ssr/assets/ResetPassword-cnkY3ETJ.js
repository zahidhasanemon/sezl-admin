import { ref, computed, onMounted, onUnmounted, unref, withCtx, createVNode, toDisplayString, createBlock, createTextVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderDynamicModel, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as usePage, b as useForm, h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import "vue3-toastify";
import { _ as _sfc_main$1 } from "./BlankLayout-BFz2goGW.js";
import "@inertiajs/core";
import "lodash-es";
import "pinia";
const __default__ = {
  layout: _sfc_main$1
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    seo: Object
  },
  setup(__props) {
    usePage();
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email") || "";
    const form = useForm({
      email,
      otp: "",
      password: "",
      password_confirmation: ""
    });
    const countdown = ref(60);
    const timer = ref(null);
    const isPasswordVisible = ref(false);
    const isConfirmPasswordVisible = ref(false);
    const formattedTime = computed(() => {
      const minutes = Math.floor(countdown.value / 60);
      const seconds = countdown.value % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    });
    const startTimer = () => {
      clearInterval(timer.value);
      countdown.value = 60;
      timer.value = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(timer.value);
        }
      }, 1e3);
    };
    onMounted(() => {
      startTimer();
    });
    onUnmounted(() => {
      clearInterval(timer.value);
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
      _push(`<section class="bg-gray-50 min-h-screen flex items-center justify-center p-4"><div class="w-full max-w-[480px]"><div class="login-card"><div class="flex justify-center mb-6"><div class="w-16 h-16 bg-primary-black rounded-full flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div></div><h2 class="text-xl font-semibold text-primary-black mb-2 text-center">Verify Your Email And Reset Password </h2><p class="text-primary-gray text-sm mb-2 text-center"> Please check your email and input code below. </p><p class="text-primary-gray text-sm mb-6 text-center"> We sent an email to <span class="font-medium text-primary-black">${ssrInterpolate(unref(email))}</span></p><form><div class="mb-4"><label for="code" class="block text-sm font-medium text-primary-black mb-2">Code</label><input type="text" id="code" placeholder="632682"${ssrRenderAttr("value", unref(form).otp)} class="${ssrRenderClass([{ "border-red-500": unref(form).errors.otp }, "form-control text-center tracking-widest font-mono"])}" maxlength="6" required>`);
      if (unref(form).errors.otp) {
        _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(form).errors.otp)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-xs text-primary-black mt-1 text-end"><span id="countdown">${ssrInterpolate(formattedTime.value)}</span> s </div></div><div class="mb-4"><label for="newPassword" class="block text-sm font-medium text-primary-black mb-2">New Password</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#11182799]"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 7H12V5C12 2.79 10.21 1 8 1C5.79 1 4 2.79 4 5V7H3.5C2.67 7 2 7.67 2 8.5V13.5C2 14.33 2.67 15 3.5 15H12.5C13.33 15 14 14.33 14 13.5V8.5C14 7.67 13.33 7 12.5 7ZM8 11.5C7.17 11.5 6.5 10.83 6.5 10C6.5 9.17 7.17 8.5 8 8.5C8.83 8.5 9.5 9.17 9.5 10C9.5 10.83 8.83 11.5 8 11.5ZM10.1 7H5.9V5C5.9 3.84 6.84 2.9 8 2.9C9.16 2.9 10.1 3.84 10.1 5V7Z" fill="currentColor"></path></svg></span><input${ssrRenderAttr("type", isPasswordVisible.value ? "text" : "password")}${ssrRenderDynamicModel(isPasswordVisible.value ? "text" : "password", unref(form).password, null)} id="newPassword" placeholder="Enter new password" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.password }, "form-control !pl-12"])}" required><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black">`);
      if (isPasswordVisible.value) {
        _push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path><path d="M3 3l18 18"></path></svg>`);
      }
      _push(`</button></div>`);
      if (unref(form).errors.password) {
        _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(form).errors.password)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-4"><label for="confirmPassword" class="block text-sm font-medium text-primary-black mb-2">Confirm Password</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#11182799]"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 7H12V5C12 2.79 10.21 1 8 1C5.79 1 4 2.79 4 5V7H3.5C2.67 7 2 7.67 2 8.5V13.5C2 14.33 2.67 15 3.5 15H12.5C13.33 15 14 14.33 14 13.5V8.5C14 7.67 13.33 7 12.5 7ZM8 11.5C7.17 11.5 6.5 10.83 6.5 10C6.5 9.17 7.17 8.5 8 8.5C8.83 8.5 9.5 9.17 9.5 10C9.5 10.83 8.83 11.5 8 11.5ZM10.1 7H5.9V5C5.9 3.84 6.84 2.9 8 2.9C9.16 2.9 10.1 3.84 10.1 5V7Z" fill="currentColor"></path></svg></span><input${ssrRenderAttr("type", isConfirmPasswordVisible.value ? "text" : "password")}${ssrRenderDynamicModel(isConfirmPasswordVisible.value ? "text" : "password", unref(form).password_confirmation, null)} id="confirmPassword" placeholder="Confirm new password" class="form-control !pl-12" required><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black">`);
      if (isConfirmPasswordVisible.value) {
        _push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path><path d="M3 3l18 18"></path></svg>`);
      }
      _push(`</button></div></div><div class="mb-6"><p class="text-xs text-primary-gray mb-2">Password must contain:</p><ul class="text-xs text-primary-gray space-y-1"><li class="flex items-center gap-2"><span class="w-1 h-1 bg-primary-gray rounded-full"></span> At least 8 characters </li><li class="flex items-center gap-2"><span class="w-1 h-1 bg-primary-gray rounded-full"></span> At least one number </li><li class="flex items-center gap-2"><span class="w-1 h-1 bg-primary-gray rounded-full"></span> At least one special character </li></ul></div><button type="submit" class="primary-button w-full">Reset Password</button><button type="button"${ssrIncludeBooleanAttr(countdown.value > 0) ? " disabled" : ""} class="primary-button-outline w-full mt-4 flex items-center justify-center gap-2"> Resend Verification OTP </button></form></div><div class="flex justify-between items-center mt-6 text-sm">`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/login",
        class: "text-primary-black font-medium hover:underline flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><polyline points="15 18 9 12 15 6"${_scopeId}></polyline></svg> Back to sign in `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                createVNode("polyline", { points: "15 18 9 12 15 6" })
              ])),
              createTextVNode(" Back to sign in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(link_default), {
        href: "/signup",
        class: "text-primary-black font-medium hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Create account`);
          } else {
            return [
              createTextVNode("Create account")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/ResetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
