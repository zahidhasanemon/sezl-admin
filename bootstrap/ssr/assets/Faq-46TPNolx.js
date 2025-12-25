import { reactive, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { h as head_default } from "./FrontendLayout-D9w5YXg3.js";
import "@inertiajs/core";
import "lodash-es";
import "pinia";
import "vue3-toastify";
const _sfc_main = {
  __name: "Faq",
  __ssrInlineRender: true,
  props: {
    categories: Array,
    seo: Object
  },
  setup(__props) {
    const openFaqs = reactive({});
    const isFaqOpen = (categoryId, faqId) => {
      var _a;
      return ((_a = openFaqs[categoryId]) == null ? void 0 : _a.has(faqId)) ?? false;
    };
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
      _push(`<section class="section-padding mx-auto max-w-4xl"><div class="container"><div class="space-y-4 lg:space-y-6"><div class="text-center mb-4 lg:mb-6"><h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-3 lg:mb-4"> Frequently asked questions </h1><p class="text-primary-gray text-sm sm:text-sm lg:text-base max-w-2xl mx-auto"> Find answers to commonly asked questions about our products, shipping, returns, and more. </p></div><div class="space-y-3 lg:space-y-4"><!--[-->`);
      ssrRenderList(__props.categories, (category) => {
        _push(`<div class="border border-border-primary rounded-lg overflow-hidden"><div class="p-3 sm:p-4 lg:p-6 bg-gray-50"><h2 class="text-sm sm:text-sm lg:text-base font-semibold text-primary-black">${ssrInterpolate(category.title)}</h2></div><!--[-->`);
        ssrRenderList(category.faqs, (faq) => {
          _push(`<div class="border-b border-gray-100"><button class="faq-question w-full p-3 sm:p-4 lg:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"><div class="flex items-center gap-2 lg:gap-3"><img${ssrRenderAttr("src", faq.icon)} class="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-primary-gray flex-shrink-0"><span class="font-medium text-primary-black text-sm sm:text-sm lg:text-base">${ssrInterpolate(faq.question)}</span></div><svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-primary-gray transition-transform faq-chevron" style="${ssrRenderStyle({ transform: isFaqOpen(category.id, faq.id) ? "rotate(180deg)" : "rotate(0deg)" })}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="faq-answer p-3 sm:p-4 lg:p-6 pt-0" style="${ssrRenderStyle(isFaqOpen(category.id, faq.id) ? null : { display: "none" })}"><p class="text-primary-gray text-xs sm:text-xs lg:text-sm pl-6 sm:pl-8">${ssrInterpolate(faq.answer)}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/Faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
