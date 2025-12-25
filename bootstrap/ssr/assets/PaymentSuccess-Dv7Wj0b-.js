import { ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import moment from "moment";
import "vue3-toastify";
import "@inertiajs/core";
import "lodash-es";
import "pinia";
const _sfc_main = {
  __name: "PaymentSuccess",
  __ssrInlineRender: true,
  props: {
    order: Object,
    transaction: Object,
    seo: Object
  },
  setup(__props) {
    const getEstimatedDays = () => {
      const startDate = moment().add(2, "days");
      const endDate = moment().add(5, "days");
      return `${startDate.format("MMM D")} - ${endDate.format("MMM D")}`;
    };
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
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
      _push(`<section class="section-padding"><div class="container"><nav class="text-sm mb-3 lg:mb-4" aria-label="Breadcrumb"><ol class="list-reset flex text-primary-gray flex-wrap"><li>`);
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
      _push(`<span class="mx-2">&gt;</span></li><li class="text-gray-800 font-semibold">Order Placed</li></ol></nav><div class="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4"><div class="lg:col-span-8"><div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6 mb-3 lg:mb-4"><div class="flex items-start justify-between mb-3 lg:mb-4"><div class="flex items-start gap-3"><div class="flex-shrink-0 size-10 rounded-full flex items-center justify-center mt-1"><svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.1675 8.33333C18.9517 12.1821 16.942 16.056 13.3438 17.6311C9.74557 19.2062 5.53599 18.0549 3.24023 14.8679C0.944474 11.6808 1.18591 7.32327 3.81971 4.40931C6.45351 1.49535 10.7645 0.816163 14.1667 2.77917" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 9.16667L10 11.6667L18.3333 3.33333" stroke="#00A63E" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div><h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-black mb-1">Order placed</h1><p class="text-primary-gray text-sm lg:text-base"> Thank you, your order has been placed successfully. </p></div></div><span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"> Paid </span></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6"><div><h3 class="text-sm font-medium text-primary-gray mb-1">Order number</h3><p class="text-base lg:text-lg font-semibold text-primary-black">#${ssrInterpolate(__props.order.id)}</p></div><div><h3 class="text-sm font-medium text-primary-gray mb-1">Estimated delivery</h3><p class="text-base lg:text-lg font-semibold text-primary-black">${ssrInterpolate(getEstimatedDays())}</p></div><div><h3 class="text-sm font-medium text-primary-gray mb-1">Shipping to</h3><p class="text-sm lg:text-base font-semibold text-primary-black">${ssrInterpolate(__props.order.address.name)}, ${ssrInterpolate(__props.order.address.address)}, ${ssrInterpolate((_a = __props.order.address.city) == null ? void 0 : _a.name)}, ${ssrInterpolate(__props.order.address.state.name)}, ${ssrInterpolate(__props.order.address.zip)}</p></div><div><h3 class="text-sm font-medium text-primary-gray mb-1">Payment</h3><p class="text-sm lg:text-base font-semibold text-primary-black">••••${ssrInterpolate(__props.transaction.card_number)}</p></div></div><div class="border-t border-gray-200 pt-3 lg:pt-4"><h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4"> Items in this order </h2><div class="space-y-3 lg:space-y-4"><!--[-->`);
      ssrRenderList(__props.order.items, (item) => {
        var _a2, _b;
        _push(`<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div class="flex-shrink-0"><img${ssrRenderAttr("src", item.product.default_image)} alt="Urban Backpack Pro" class="w-12 h-12 object-cover rounded-lg"></div><div class="flex-1 min-w-0"><h4 class="font-medium text-primary-black text-sm leading-tight">${ssrInterpolate(item.product.name)} x ${ssrInterpolate(item.quantity)}</h4>`);
        if ((_b = (_a2 = item.variation) == null ? void 0 : _a2.variation_attributes) == null ? void 0 : _b.length) {
          _push(`<p class="text-xs text-primary-gray mt-0.5">${ssrInterpolate(item.variation.variation_attributes.map((attr) => `${attr.attribute.name}: ${attr.attribute_item.name}`).join(", "))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="text-right flex-shrink-0"><span class="font-semibold text-primary-black">$${ssrInterpolate(item.discount_price)}</span></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-gray-200"><button class="flex items-center gap-2 primary-button-outline !px-5"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Download receipt </button></div></div></div></div><div class="lg:col-span-4"><div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6 lg:sticky lg:top-30"><h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4"> Payment summary </h2><div class="space-y-3 lg:space-y-4 mb-3 lg:mb-4"><div class="flex justify-between items-center"><span class="text-primary-gray text-sm lg:text-base">Items total</span><span class="font-semibold text-primary-black text-sm lg:text-base">$${ssrInterpolate(__props.order.product_price)}</span></div><div class="flex justify-between items-center"><span class="text-primary-gray text-sm lg:text-base">Delivery</span><span class="font-semibold text-primary-black text-sm lg:text-base">$${ssrInterpolate(__props.order.shipping_cost)}</span></div><div class="flex justify-between items-center"><span class="text-primary-gray text-sm lg:text-base">Tax</span><span class="font-semibold text-primary-black text-sm lg:text-base">$${ssrInterpolate(__props.order.vat_amount)}</span></div><div class="border-t border-gray-200 pt-3 lg:pt-4"><div class="flex justify-between items-center"><span class="text-base lg:text-lg font-semibold text-primary-black">Paid</span><span class="text-base lg:text-lg font-semibold text-primary-black">$${ssrInterpolate(__props.order.paid_amount)}</span></div></div></div><div class="space-y-3"><button class="w-full flex items-center justify-center gap-2 px-4 py-3 primary-button-outline"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> Email confirmation sent </button>`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/products",
        class: "primary-button w-full flex items-center justify-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg> Continue shopping `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M17 8l4 4m0 0l-4 4m4-4H3"
                })
              ])),
              createTextVNode(" Continue shopping ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/PaymentSuccess.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
