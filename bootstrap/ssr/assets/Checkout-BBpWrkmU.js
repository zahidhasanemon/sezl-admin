import { ref, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Address-CB7ww3x-.js";
import { u as useApi } from "./useApi-Krv8pagn.js";
import { u as usePage, h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import "vue3-toastify";
import "ofetch";
import "@inertiajs/core";
import "lodash-es";
import "pinia";
const _sfc_main = {
  __name: "Checkout",
  __ssrInlineRender: true,
  props: {
    seo: Object,
    user: Object,
    defaultAddress: Number || null,
    subTotalAmount: Number,
    discountAmount: Number,
    taxPercent: Number,
    taxAmount: Number,
    initialShippingCost: Number,
    addresses: Array,
    countries: Array,
    cartData: Array
  },
  setup(__props) {
    const props = __props;
    const showAddressForm = ref(false);
    const newAddress = ref({
      name: props.user.full_name || "",
      phone: props.user.phone || ""
    });
    useApi();
    usePage();
    const shippingCost = ref(props.initialShippingCost || 0);
    const selectedAddress = ref(props.defaultAddress || null);
    ref("stripe");
    const note = ref("");
    const totalAmount = computed(() => Number(props.subTotalAmount) + Number(props.taxAmount) + Number(shippingCost.value));
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
      _push(`<span class="mx-2">&gt;</span></li><li class="ext-gray-800 font-semibold">Checkout</li></ol></nav><div class="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4"><div class="lg:col-span-8"><div class="mb-3 lg:mb-4"><h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-2">Checkout</h1><p class="text-primary-gray text-sm lg:text-base">Complete your purchase securely in a few steps.</p></div><div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6"><h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4">Shipping Address </h2><!--[-->`);
      ssrRenderList(__props.addresses, (address) => {
        _push(`<div class="${ssrRenderClass([{
          "border-blue-500 bg-blue-50": selectedAddress.value === address.id,
          "border-gray-200": selectedAddress.value !== address.id
        }, "flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 border border-gray-200 rounded-lg gap-3 sm:gap-0 cursor-pointer transition-all duration-200"])}"><div class="flex items-center gap-3 w-full"><input type="radio"${ssrRenderAttr("id", `address-${address.id}`)}${ssrRenderAttr("value", address.id)}${ssrIncludeBooleanAttr(ssrLooseEqual(selectedAddress.value, address.id)) ? " checked" : ""} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 flex-shrink-0"><label${ssrRenderAttr("for", `address-${address.id}`)} class="flex items-center gap-3 cursor-pointer w-full"><svg class="w-5 h-5 text-primary-gray flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><div><p class="font-medium text-primary-black text-sm lg:text-base">${ssrInterpolate(address.name)} (${ssrInterpolate(address.phone)})</p><p class="font-medium text-primary-black text-sm lg:text-base">${ssrInterpolate(address.address)}, ${ssrInterpolate(address.city.name)}, ${ssrInterpolate(address.state.name)}, ${ssrInterpolate(address.country.name)} ${ssrInterpolate(address.zip)}</p></div></label></div></div>`);
      });
      _push(`<!--]--><button class="flex items-center justify-center gap-2 !px-4 text-sm !py-2 my-4 primary-button w-full sm:w-auto"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Add Address </button></div><div class="bg-white rounded-lg border border-gray-200 mt-2 p-3 sm:p-4 lg:p-6"><h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4">Special Instruction </h2><textarea id="details" rows="3" placeholder="Tell us if you have any Special Instruction" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-black focus:border-transparent resize-none">${ssrInterpolate(note.value)}</textarea></div></div><div class="lg:col-span-4 lg:mt-22"><div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6 lg:sticky lg:top-30"><h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-black mb-3 lg:mb-4"> Order Summary </h2><div class="space-y-3 lg:space-y-4 mb-4 lg:mb-6"><!--[-->`);
      ssrRenderList(__props.cartData, (cart, index) => {
        _push(`<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><div class="flex-shrink-0"><img${ssrRenderAttr("src", cart.default_image)}${ssrRenderAttr("alt", cart.product_name)} class="w-12 h-12 object-cover rounded-lg"></div><div class="flex-1 min-w-0"><h4 class="font-medium text-primary-black text-sm leading-tight">${ssrInterpolate(cart.product_name)} x ${ssrInterpolate(cart.quantity)}</h4><p class="text-xs text-primary-gray mt-0.5"><!--[-->`);
        ssrRenderList(cart.variation_attributes, (attribute, key) => {
          _push(`<span>${ssrInterpolate(attribute.attribute_name)}: ${ssrInterpolate(attribute.attribute_item_name)}`);
          if (key + 1 < cart.variation_attributes.length) {
            _push(`<span>, </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
        });
        _push(`<!--]--></p></div><div class="text-right flex-shrink-0"><span class="font-semibold text-primary-black">$${ssrInterpolate(parseFloat(cart.subtotal).toFixed(2))}</span></div></div>`);
      });
      _push(`<!--]--></div><div class="space-y-3 mb-3 lg:mb-4"><div class="flex justify-between"><span class="text-primary-gray text-sm lg:text-base">Subtotal</span><span class="font-medium text-primary-black text-sm lg:text-base">$${ssrInterpolate(parseFloat(__props.subTotalAmount).toFixed(2))}</span></div><div class="flex justify-between"><span class="text-primary-gray text-sm lg:text-base">Discount</span><span class="text-green-600 font-medium text-sm lg:text-base">-$${ssrInterpolate(parseFloat(__props.discountAmount).toFixed(2))}</span></div><div class="flex justify-between"><span class="text-primary-gray text-sm lg:text-base">Shipping</span><span class="font-medium text-primary-black text-sm lg:text-base">$${ssrInterpolate(parseFloat(shippingCost.value).toFixed(2))}</span></div><div class="flex justify-between"><span class="text-primary-gray text-sm lg:text-base">Tax (${ssrInterpolate(__props.taxPercent)}%)</span><span class="font-medium text-primary-black text-sm lg:text-base">$${ssrInterpolate(parseFloat(__props.taxAmount).toFixed(2))}</span></div><div class="border-t border-gray-200 pt-3"><div class="flex justify-between"><span class="font-semibold text-primary-black text-sm lg:text-base">Total</span><span class="text-base sm:text-lg lg:text-xl font-bold text-primary-black">$${ssrInterpolate(parseFloat(totalAmount.value).toFixed(2))}</span></div></div></div><div class="space-y-3"><button${ssrIncludeBooleanAttr(!selectedAddress.value) ? " disabled" : ""} class="primary-button !rounded-full w-full">Submit Order</button>`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/products",
        class: "primary-button-outline text-center mt-5 inline-block w-full !rounded-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Continue Shopping`);
          } else {
            return [
              createTextVNode(" Continue Shopping")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></section>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        show: showAddressForm.value,
        "onUpdate:show": ($event) => showAddressForm.value = $event,
        countries: __props.countries,
        address: newAddress.value
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/Checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
