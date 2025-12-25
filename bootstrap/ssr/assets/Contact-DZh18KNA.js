import { reactive, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useApi } from "./useApi-Krv8pagn.js";
import { h as head_default } from "./FrontendLayout-D9w5YXg3.js";
import "vue3-toastify";
import "ofetch";
import "@inertiajs/core";
import "lodash-es";
import "pinia";
const _sfc_main = {
  __name: "Contact",
  __ssrInlineRender: true,
  props: {
    seo: Object
  },
  setup(__props) {
    const form = reactive({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    const { loading } = useApi();
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
      _push(`<section class="section-padding mx-auto max-w-4xl"><div class="container"><div class="space-y-4 lg:space-y-6"><div class="text-center mb-4 lg:mb-6"><h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-3 lg:mb-4"> Contact Us </h1><p class="text-primary-gray text-sm sm:text-sm lg:text-base max-w-2xl mx-auto"> We&#39;d love to hear from you. Send us a message and we&#39;ll respond as soon as possible. </p></div><div class="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 max-w-2xl mx-auto"><form class="space-y-3 lg:space-y-4"><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4"><div><label for="firstName" class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2"> First Name <span class="text-red-500">*</span></label><input type="text" id="firstName"${ssrRenderAttr("value", form.firstName)} placeholder="Enter your first name" class="form-control" required></div><div><label for="lastName" class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2"> Last Name </label><input type="text" id="lastName"${ssrRenderAttr("value", form.lastName)} placeholder="Enter your last name" class="form-control"></div></div><div><label for="email" class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2"> Your Email <span class="text-red-500">*</span></label><input type="email" id="email"${ssrRenderAttr("value", form.email)} placeholder="Enter your email address" class="form-control" required></div><div><label for="phone" class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2"> Your Phone <span class="text-red-500">*</span></label><input type="tel" id="phone"${ssrRenderAttr("value", form.phone)} placeholder="Enter your phone number" class="form-control" required></div><div><label for="subject" class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2"> Subject <span class="text-red-500">*</span></label><input type="text" id="subject"${ssrRenderAttr("value", form.subject)} placeholder="Enter subject" class="form-control" required></div><div><label for="message" class="block text-xs sm:text-xs lg:text-sm font-medium text-primary-black mb-1 lg:mb-2"> Your Message <span class="text-red-500">*</span></label><textarea id="message" rows="5" placeholder="Tell us how we can help you..." class="form-control" required>${ssrInterpolate(form.message)}</textarea></div><div class="pt-1 lg:pt-2"><button type="submit" class="w-full primary-button"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Sending..." : "Send Message")}</button></div></form></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
