import { mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { u as usePage, b as useForm, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import "vue3-toastify";
const _sfc_main = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: Object
  },
  setup(__props) {
    var _a;
    const page = usePage();
    (_a = page.props.auth) == null ? void 0 : _a.user;
    useForm({
      id: ""
    });
    useForm({
      id: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-card group relative z-0" }, _attrs))}><div class="bg-product-bg p-2 sm:p-3 relative overflow-hidden">`);
      _push(ssrRenderComponent(unref(link_default), {
        href: `/products/${__props.product.slug}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.product.default_image)}${ssrRenderAttr("alt", __props.product.name)} class="product-card-image group-hover:scale-105 transition-transform duration-300"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: __props.product.default_image,
                alt: __props.product.name,
                class: "product-card-image group-hover:scale-105 transition-transform duration-300"
              }, null, 8, ["src", "alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.product.discount_type != 0) {
        _push(`<div class="product-card-discount-badge absolute top-2 left-2 z-20">${ssrInterpolate(__props.product.discount_type == 1 ? `${Math.ceil(__props.product.discount_value)}%` : `$${__props.product.discount_value}`)} OFF </div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.is_wishlisted) {
        _push(`<button class="product-card-wishlist-button absolute top-2 right-2 z-20" aria-label="Add to Wishlist"><svg width="14" height="14" class="sm:w-4 sm:h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2275_7318)"><path d="M1.33301 6.33181C1.33302 5.59013 1.55802 4.86589 1.97827 4.25476C2.39853 3.64363 2.99428 3.17435 3.68684 2.90891C4.3794 2.64347 5.13618 2.59435 5.85724 2.76804C6.57831 2.94174 7.22972 3.33006 7.72545 3.88174C7.76036 3.91908 7.80258 3.94884 7.84947 3.96919C7.89636 3.98954 7.94693 4.00004 7.99805 4.00004C8.04916 4.00004 8.09973 3.98954 8.14663 3.96919C8.19352 3.94884 8.23573 3.91908 8.27065 3.88174C8.76482 3.32648 9.41638 2.93489 10.1386 2.75908C10.8608 2.58328 11.6195 2.63161 12.3136 2.89764C13.0077 3.16367 13.6043 3.63477 14.024 4.24825C14.4437 4.86174 14.6666 5.5885 14.6631 6.33181C14.6631 7.85811 13.6633 8.99783 12.6636 9.99758L9.00314 13.5387C8.87894 13.6814 8.72582 13.7959 8.55394 13.8748C8.38206 13.9537 8.19536 13.9952 8.00624 13.9964C7.81712 13.9976 7.6299 13.9585 7.45704 13.8818C7.28417 13.8051 7.12961 13.6924 7.00362 13.5514L3.33252 9.99758C2.33276 8.99783 1.33301 7.86477 1.33301 6.33181Z" fill="black"></path></g><defs><clipPath id="clip0_2275_7318"><rect width="15.9961" height="15.9961" fill="white"></rect></clipPath></defs></svg></button>`);
      } else {
        _push(`<button class="product-card-wishlist-button absolute top-2 right-2 z-20" aria-label="Add to Wishlist"><svg width="14" height="14" class="sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2275_7318)"><path d="M1.33301 6.33181C1.33302 5.59013 1.55802 4.86589 1.97827 4.25476C2.39853 3.64363 2.99428 3.17435 3.68684 2.90891C4.3794 2.64347 5.13618 2.59435 5.85724 2.76804C6.57831 2.94174 7.22972 3.33006 7.72545 3.88174C7.76036 3.91908 7.80258 3.94884 7.84947 3.96919C7.89636 3.98954 7.94693 4.00004 7.99805 4.00004C8.04916 4.00004 8.09973 3.98954 8.14663 3.96919C8.19352 3.94884 8.23573 3.91908 8.27065 3.88174C8.76482 3.32648 9.41638 2.93489 10.1386 2.75908C10.8608 2.58328 11.6195 2.63161 12.3136 2.89764C13.0077 3.16367 13.6043 3.63477 14.024 4.24825C14.4437 4.86174 14.6666 5.5885 14.6631 6.33181C14.6631 7.85811 13.6633 8.99783 12.6636 9.99758L9.00314 13.5387C8.87894 13.6814 8.72582 13.7959 8.55394 13.8748C8.38206 13.9537 8.19536 13.9952 8.00624 13.9964C7.81712 13.9976 7.6299 13.9585 7.45704 13.8818C7.28417 13.8051 7.12961 13.6924 7.00362 13.5514L3.33252 9.99758C2.33276 8.99783 1.33301 7.86477 1.33301 6.33181Z" stroke="#0A0A0A" stroke-width="1.33301" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_2275_7318"><rect width="15.9961" height="15.9961" fill="white"></rect></clipPath></defs></svg></button>`);
      }
      _push(`</div><div class="p-3 sm:p-4 lg:p-5 bg-white">`);
      _push(ssrRenderComponent(unref(link_default), {
        href: `/products/${__props.product.slug}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-medium text-sm sm:text-base lg:text-lg text-primary-black mb-1 truncate"${_scopeId}>${ssrInterpolate(__props.product.name)}</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-medium text-sm sm:text-base lg:text-lg text-primary-black mb-1 truncate" }, toDisplayString(__props.product.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3"><span class="text-sm sm:text-base lg:text-lg text-primary-black">$${ssrInterpolate(__props.product.final_price)}</span>`);
      if (__props.product.discount_type != 0) {
        _push(`<!--[--><span class="text-xs sm:text-sm text-primary-gray line-through">$${ssrInterpolate(__props.product.price)}</span><span class="text-xs sm:text-sm text-success ml-auto">Save $${ssrInterpolate((__props.product.price - __props.product.final_price).toFixed(2))}</span><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(link_default), {
        href: `/products/${__props.product.slug}`,
        class: "primary-button w-full block text-center !rounded-full !py-1.5 sm:!py-2 text-xs sm:text-sm lg:text-base"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View Details `);
          } else {
            return [
              createTextVNode(" View Details ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
