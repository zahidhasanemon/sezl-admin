import { unref, withCtx, createVNode, toDisplayString, createBlock, createTextVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
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
  __name: "ForgetPassword",
  __ssrInlineRender: true,
  props: {
    seo: Object
  },
  setup(__props) {
    usePage();
    const form = useForm({
      email: ""
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
      _push(`<section class="bg-gray-50 min-h-screen flex items-center justify-center p-4"><div class="w-full max-w-[480px]"><div class="login-card"><h2 class="text-xl font-semibold text-primary-black mb-2">Reset your password</h2><p class="text-primary-gray text-sm mb-6">Enter your email to receive a password reset OTP.</p><form><div class="mb-6"><label for="email" class="block text-sm font-medium text-primary-black mb-2">Email</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#11182799]"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path></svg></span><input type="email" id="email" placeholder="you@example.com" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.email }, "form-control !pl-12"])}"${ssrRenderAttr("value", unref(form).email)} required></div>`);
      if (unref(form).errors.email) {
        _push(`<span class="text-red-500 text-sm">${ssrInterpolate(unref(form).errors.email)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-xs text-primary-gray mt-1"> We&#39;ll send an OTP if this email is associated with an account. </p></div><button type="submit" class="primary-button w-full">Reset Password</button></form></div><div class="flex justify-between items-center mt-6 text-sm">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/ForgetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
