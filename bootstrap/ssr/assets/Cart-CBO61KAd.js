import { reactive, ref, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { u as usePage, a as useCartStore, b as useForm, h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import "vue3-toastify";
import "@inertiajs/core";
import "lodash-es";
import "pinia";
const _sfc_main = {
  __name: "Cart",
  __ssrInlineRender: true,
  props: {
    seo: Object,
    cartData: Array
  },
  setup(__props) {
    var _a;
    const props = __props;
    const page = usePage();
    const cartStore = useCartStore();
    const user = (_a = page.props.auth) == null ? void 0 : _a.user;
    const carts = reactive([]);
    const selectedCarts = ref([]);
    if (user) {
      props.cartData.forEach((item) => {
        carts.push({
          ...item,
          pendingChange: 0,
          timer: null
        });
      });
    } else {
      const localCart = cartStore.items;
      localCart.forEach((item) => {
        carts.push({
          ...item,
          pendingChange: 0,
          timer: null
        });
      });
    }
    useForm({ id: null, quantity: null });
    const subTotalAmount = computed(() => {
      return carts.filter((item) => selectedCarts.value.includes(item.id)).reduce((total, item) => total + item.quantity * item.final_price, 0).toFixed(2);
    });
    const discountAmount = computed(() => {
      return carts.filter((item) => selectedCarts.value.includes(item.id)).reduce((total, item) => total + item.quantity * (item.price - item.final_price), 0).toFixed(2);
    });
    useForm({
      id: ""
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
      _push(`<section class="section-padding"><div class="container"><nav class="text-sm mb-4 sm:mb-6" aria-label="Breadcrumb"><ol class="list-reset flex text-primary-gray flex-wrap"><li>`);
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
      _push(`<span class="mx-2">&gt;</span></li><li class="text-gray-800 font-semibold">Cart</li></ol></nav>`);
      if (carts.length) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4"><div class="lg:col-span-8"><div class="mb-3 lg:mb-4"><h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-2"> Added to your cart </h1><p class="text-primary-black font-medium mt-4 text-sm lg:text-base">Total: ${ssrInterpolate(carts.length)} item(s)</p></div><div class="space-y-3 lg:space-y-4"><!--[-->`);
        ssrRenderList(carts, (cart) => {
          _push(`<div class="flex gap-3 lg:gap-4 p-3 sm:p-4 lg:p-6 bg-white rounded-lg border border-gray-200"><div class="flex items-center"><input type="checkbox" class="w-4 h-4 text-primary-black border-gray-300 rounded focus:ring-primary-black"${ssrRenderAttr("value", cart.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedCarts.value) ? ssrLooseContain(selectedCarts.value, cart.id) : selectedCarts.value) ? " checked" : ""}></div><div class="flex-shrink-0"><img${ssrRenderAttr("src", cart.default_image)}${ssrRenderAttr("alt", cart.product_name)} class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg"></div><div class="flex-1 min-w-0"><h3 class="font-semibold text-primary-black mb-1 text-sm sm:text-base lg:text-lg">${ssrInterpolate(cart.product_name)}</h3><div class="text-xs sm:text-sm lg:text-base text-primary-gray space-y-1"><p><!--[-->`);
          ssrRenderList(cart.variation_attributes, (attribute, key) => {
            _push(`<span>${ssrInterpolate(attribute.attribute_name)}: ${ssrInterpolate(attribute.attribute_item_name)}`);
            if (key + 1 < cart.variation_attributes.length) {
              _push(`<span>, </span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
          });
          _push(`<!--]--></p></div>`);
          if (cart.stock > 0) {
            _push(`<div class="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mt-2"> In stock </div>`);
          } else {
            _push(`<div class="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium mt-2"> Out of stock </div>`);
          }
          _push(`</div><div class="flex flex-col items-end gap-2 sm:gap-3 flex-shrink-0"><div class="text-base sm:text-lg lg:text-xl font-bold text-primary-black">$${ssrInterpolate(cart.final_price)}</div><div class="flex items-center gap-2 sm:gap-3"><div class="flex items-center border border-gray-300 rounded"><button class="px-2 sm:px-3 py-1 hover:bg-gray-100 transition-colors text-xs sm:text-sm lg:text-base"${ssrIncludeBooleanAttr(cart.quantity <= 1) ? " disabled" : ""}> - </button><span class="px-2 sm:px-3 py-1 border-x border-gray-300 text-xs sm:text-sm lg:text-base" id="quantity-2">${ssrInterpolate(cart.quantity)}</span><button class="px-2 sm:px-3 py-1 hover:bg-gray-100 transition-colors text-xs sm:text-sm lg:text-base"${ssrIncludeBooleanAttr(cart.quantity >= cart.stock) ? " disabled" : ""}> + </button></div><button class="text-red-500 hover:text-red-700 transition-colors"><svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div>`);
        });
        _push(`<!--]--></div></div><div class="lg:col-span-4"><div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6 lg:sticky lg:top-6"><h2 class="text-base sm:text-lg lg:text-xl font-semibold text-primary-black mb-3 lg:mb-4"> Order Summary </h2><div class="space-y-3 mb-3 lg:mb-4"><div class="flex justify-between"><span class="text-primary-gray text-sm lg:text-base">Subtotal</span><span class="font-medium text-primary-black text-sm lg:text-base">$${ssrInterpolate(subTotalAmount.value)}</span></div><div class="flex justify-between"><span class="text-primary-gray text-sm lg:text-base">Discount</span><span class="text-green-600 font-medium text-sm lg:text-base">-$${ssrInterpolate(discountAmount.value)}</span></div><div class="flex justify-between"><span class="text-primary-gray text-sm lg:text-base">Shipping</span><span class="text-primary-gray text-sm lg:text-base">Calculated at checkout</span></div><div class="flex justify-between"><span class="text-primary-gray text-sm lg:text-base">Tax</span><span class="text-primary-gray text-sm lg:text-base">Calculated at checkout</span></div><div class="border-t border-gray-200 pt-3"><div class="flex justify-between"><span class="font-semibold text-primary-black text-sm lg:text-base">Total</span><span class="text-base sm:text-lg lg:text-xl font-bold text-primary-black">$${ssrInterpolate(subTotalAmount.value)}</span></div></div></div><div class="mb-6"><h3 class="font-medium text-primary-black mb-3 text-sm lg:text-base">Delivery &amp; Payment</h3><div class="flex items-center gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50"><svg class="w-4 h-4 sm:w-5 sm:h-5 text-primary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg><span class="text-xs sm:text-sm lg:text-base text-primary-gray">Online Payment</span></div></div><div class="space-y-3"><button${ssrIncludeBooleanAttr(!selectedCarts.value.length) ? " disabled" : ""} class="primary-button text-center block !rounded-full w-full"> Proceed to Checkout </button>`);
        _push(ssrRenderComponent(unref(link_default), {
          href: "/products",
          class: "primary-button-outline text-center block !rounded-full w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Continue Shopping`);
            } else {
              return [
                createTextVNode("Continue Shopping")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div>`);
      } else {
        _push(`<div class="w-full"><div class="mb-3 lg:mb-4 text-center"><h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-4"> Nothing in your cart </h1>`);
        _push(ssrRenderComponent(unref(link_default), {
          href: "/products",
          class: "primary-button-outline text-center mt-5 inline-block !rounded-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Continue Shopping`);
            } else {
              return [
                createTextVNode("Continue Shopping")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/Cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
