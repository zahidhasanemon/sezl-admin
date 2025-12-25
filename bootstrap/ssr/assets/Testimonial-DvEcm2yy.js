import "@inertiajs/core";
import "lodash-es";
import "pinia";
import {
  createVNode,
  toDisplayString,
  unref,
  useSSRContext,
  withCtx,
} from "vue";
import {
  ssrInterpolate,
  ssrRenderAttr,
  ssrRenderAttrs,
  ssrRenderComponent,
  ssrRenderList,
} from "vue/server-renderer";
import "vue3-toastify";
import { h as head_default } from "./FrontendLayout-D9w5YXg3.js";
const _sfc_main = {
  __name: "Testimonial",
  __ssrInlineRender: true,
  props: {
    testimonials: Array,
    seo: Object,
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(
        ssrRenderComponent(
          unref(head_default),
          null,
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(
                  `<title${_scopeId}>${ssrInterpolate(
                    __props.seo.title
                  )}</title><meta name="description"${ssrRenderAttr(
                    "content",
                    __props.seo.description
                  )}${_scopeId}>`
                );
              } else {
                return [
                  createVNode(
                    "title",
                    null,
                    toDisplayString(__props.seo.title),
                    1
                  ),
                  createVNode(
                    "meta",
                    {
                      name: "description",
                      content: __props.seo.description,
                    },
                    null,
                    8,
                    ["content"]
                  ),
                ];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(
        `<section class="section-padding"><div class="container"><div class="space-y-8 md:space-y-12 lg:space-y-16"><div class="text-center mb-8 lg:mb-12 px-4 sm:px-0"><h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-4 lg:mb-6"> What our customers say </h1><p class="text-sm sm:text-base lg:text-base max-w-2xl lg:max-w-3xl mx-auto leading-relaxed"> Discover authentic testimonials from our valued customers who have experienced the elegance and quality of VuexyAdmin. Their genuine feedback speaks to our commitment to providing exceptional fashion that makes every woman feel confident and beautiful. </p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"><!--[-->`
      );
      ssrRenderList(__props.testimonials, (testimonial) => {
        _push(
          `<div class="bg-white border border-border-primary rounded-lg p-3 sm:p-4 lg:p-6 hover:-translate-y-0.5 hover:shadow-theme transition-all"><p class="text-primary-black text-sm sm:text-sm lg:text-base leading-relaxed mb-3 lg:mb-4">${ssrInterpolate(
            testimonial.testimonial
          )}</p><div class="flex items-center gap-3 lg:gap-4"><img${ssrRenderAttr(
            "src",
            testimonial.avatar
          )}${ssrRenderAttr(
            "alt",
            testimonial.name
          )} class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full object-cover flex-shrink-0"><div class="min-w-0 flex-1"><h4 class="font-semibold text-primary-black text-sm sm:text-sm lg:text-base truncate">${ssrInterpolate(
            testimonial.name
          )}</h4><p class="text-primary-gray text-xs sm:text-xs lg:text-sm">${ssrInterpolate(
            testimonial.address
          )}</p></div></div></div>`
        );
      });
      _push(`<!--]--></div></div></div></section></div>`);
    };
  },
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/frontend/Pages/Testimonial.vue"
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export { _sfc_main as default };
