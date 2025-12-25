import { ref, computed, onMounted, onUnmounted, unref, withCtx, createVNode, toDisplayString, createBlock, createTextVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
  __name: "EmailVerification",
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
      otp: ""
    });
    const countdown = ref(60);
    const timer = ref(null);
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
      _push(`<section class="bg-gray-50 min-h-screen flex items-center justify-center p-4"><div class="w-full max-w-[480px]"><div class="login-card"><div class="flex justify-center mb-6"><div class="w-16 h-16 bg-primary-black rounded-full flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div></div><h2 class="text-xl font-semibold text-primary-black mb-2 text-center">Verify Your Email</h2><p class="text-primary-gray text-sm mb-2 text-center"> Please check your email and input code below. </p><p class="text-primary-gray text-sm mb-6 text-center"> We sent an email to <span class="font-medium text-primary-black">${ssrInterpolate(unref(email))}</span></p><form><div class="mb-6"><label for="code" class="block text-sm font-medium text-primary-black mb-2">Code</label><input type="text" id="code" placeholder="632682"${ssrRenderAttr("value", unref(form).otp)} class="form-control text-center tracking-widest font-mono" maxlength="6" required>`);
      if (unref(form).errors.otp) {
        _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(form).errors.otp)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-xs text-primary-black mt-1 text-end"><span id="countdown">${ssrInterpolate(formattedTime.value)}</span> s </div></div><button type="submit" class="primary-button w-full">Verify OTP</button><button type="button"${ssrIncludeBooleanAttr(countdown.value > 0) ? " disabled" : ""} class="primary-button-outline w-full mt-4 flex items-center justify-center gap-2"> Resend Verification OTP </button></form></div><div class="flex justify-between items-center mt-6 text-sm">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/EmailVerification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
