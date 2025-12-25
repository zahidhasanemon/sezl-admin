import { computed, ref, onMounted, unref, withCtx, createVNode, toDisplayString, createTextVNode, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ProductCard-tz37HsYK.js";
import { d as _export_sfc, u as usePage, a as useCartStore, b as useForm, h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import "vue3-toastify";
import "@inertiajs/core";
import "lodash-es";
import "pinia";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    product: Object,
    relatedProducts: Array,
    breadCrumbs: Array,
    seo: Object
  },
  setup(__props) {
    var _a;
    const props = __props;
    const page = usePage();
    useCartStore();
    (_a = page.props.auth) == null ? void 0 : _a.user;
    const images = computed(() => {
      if (props.product.images && props.product.images.length) {
        return props.product.images.map((o) => o.url);
      }
      return [props.product.default_image];
    });
    const mainImage = ref(props.product.default_image);
    ref(false);
    const zoomStyle = ref({});
    ref(null);
    const changeMainImage = (src) => {
      mainImage.value = src;
      zoomStyle.value = {};
    };
    const showFullDescription = ref(false);
    const descriptionText = ref(null);
    const isDescriptionLong = ref(false);
    const hasDiscount = computed(() => props.product.discount_type != 0);
    const discountAmount = ref((props.product.price - props.product.final_price).toFixed(2));
    const productPrice = ref(props.product.price);
    const finalPrice = ref(props.product.final_price);
    const checkDescriptionLength = () => {
      nextTick(() => {
        if (!descriptionText.value) return;
        const textLength = descriptionText.value.textContent.length;
        isDescriptionLong.value = textLength > 200;
      });
    };
    onMounted(() => {
      checkDescriptionLength();
    });
    const selectedAttributes = ref({});
    const availableAttributes = computed(() => props.product.available_attributes || []);
    const quantity = ref(1);
    const selectedVariation = computed(() => {
      if (!props.product.has_variation) return null;
      const selectedIds = Object.values(selectedAttributes.value).sort((a, b) => a - b);
      if (selectedIds.length !== availableAttributes.value.length) return null;
      const key = selectedIds.join(",");
      const variation = props.product.variation_map.find((v) => v.key === key);
      if (variation) {
        productPrice.value = variation.price;
        finalPrice.value = variation.final_price;
        discountAmount.value = (variation.price - variation.final_price).toFixed(2);
        if (variation.image) {
          changeMainImage(variation.image);
        }
        if (quantity.value > variation.stock) {
          quantity.value = variation.stock;
        }
        return variation;
      }
      return null;
    });
    const isInStock = computed(() => {
      if (selectedVariation.value) return selectedVariation.value.stock > 0;
      return props.product.stock > 0;
    });
    const maxQuantity = computed(() => {
      if (selectedVariation.value) return selectedVariation.value.stock;
      return props.product.has_variation ? 0 : props.product.stock;
    });
    const canIncreaseQuantity = computed(() => quantity.value < maxQuantity.value);
    const canAddToCart = computed(() => {
      if (props.product.has_variation && availableAttributes.value.length) {
        if (Object.keys(selectedAttributes.value).length !== availableAttributes.value.length) {
          return false;
        }
        return isInStock.value;
      }
      return props.product.stock > 0;
    });
    useForm({
      product_id: props.product.id,
      variation_id: null,
      quantity: 1
    });
    useForm({
      id: ""
    });
    useForm({
      id: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-995d4afe>`);
      _push(ssrRenderComponent(unref(head_default), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-995d4afe${_scopeId}>${ssrInterpolate(__props.seo.title)}</title><meta name="description"${ssrRenderAttr("content", __props.seo.description)} data-v-995d4afe${_scopeId}><meta property="og:image"${ssrRenderAttr("content", __props.seo.image)} data-v-995d4afe${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.seo.title), 1),
              createVNode("meta", {
                name: "description",
                content: __props.seo.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image",
                content: __props.seo.image
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="section-padding" data-v-995d4afe><div class="container" data-v-995d4afe><nav class="text-sm mb-6" aria-label="Breadcrumb" data-v-995d4afe><ol class="list-reset flex text-gray-600" data-v-995d4afe><li data-v-995d4afe>`);
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
      _push(`<span class="mx-2" data-v-995d4afe>&gt;</span></li><!--[-->`);
      ssrRenderList(__props.breadCrumbs, (breadcrumb, key) => {
        _push(`<li data-v-995d4afe>`);
        _push(ssrRenderComponent(unref(link_default), {
          href: `/categories/${breadcrumb.slug}`,
          class: "hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(breadcrumb.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(breadcrumb.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<span class="mx-2" data-v-995d4afe>&gt;</span></li>`);
      });
      _push(`<!--]--><li class="text-gray-800 font-semibold" data-v-995d4afe>${ssrInterpolate(__props.product.name)}</li></ol></nav><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" data-v-995d4afe><div class="space-y-4" data-v-995d4afe><div class="relative bg-product-bg rounded-2xl overflow-hidden aspect-square p-3 cursor-zoom-in" data-v-995d4afe><img${ssrRenderAttr("src", mainImage.value)}${ssrRenderAttr("alt", __props.product.name)} class="w-full h-full object-cover object-center transition-transform duration-300" style="${ssrRenderStyle(zoomStyle.value)}" data-v-995d4afe>`);
      if (__props.product.discount_type != 0) {
        _push(`<div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold" data-v-995d4afe>${ssrInterpolate(__props.product.discount_type == 1 ? `${Math.ceil(__props.product.discount_value)}%` : `$${__props.product.discount_value}`)} OFF</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute top-4 right-4 flex flex-col gap-3" data-v-995d4afe>`);
      if (__props.product.is_wishlisted) {
        _push(`<button class="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105" type="button" aria-label="Add to wishlist" data-v-995d4afe><svg width="14" height="14" class="sm:w-4 sm:h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" data-v-995d4afe><g clip-path="url(#clip0_2275_7318)" data-v-995d4afe><path d="M1.33301 6.33181C1.33302 5.59013 1.55802 4.86589 1.97827 4.25476C2.39853 3.64363 2.99428 3.17435 3.68684 2.90891C4.3794 2.64347 5.13618 2.59435 5.85724 2.76804C6.57831 2.94174 7.22972 3.33006 7.72545 3.88174C7.76036 3.91908 7.80258 3.94884 7.84947 3.96919C7.89636 3.98954 7.94693 4.00004 7.99805 4.00004C8.04916 4.00004 8.09973 3.98954 8.14663 3.96919C8.19352 3.94884 8.23573 3.91908 8.27065 3.88174C8.76482 3.32648 9.41638 2.93489 10.1386 2.75908C10.8608 2.58328 11.6195 2.63161 12.3136 2.89764C13.0077 3.16367 13.6043 3.63477 14.024 4.24825C14.4437 4.86174 14.6666 5.5885 14.6631 6.33181C14.6631 7.85811 13.6633 8.99783 12.6636 9.99758L9.00314 13.5387C8.87894 13.6814 8.72582 13.7959 8.55394 13.8748C8.38206 13.9537 8.19536 13.9952 8.00624 13.9964C7.81712 13.9976 7.6299 13.9585 7.45704 13.8818C7.28417 13.8051 7.12961 13.6924 7.00362 13.5514L3.33252 9.99758C2.33276 8.99783 1.33301 7.86477 1.33301 6.33181Z" fill="black" data-v-995d4afe></path></g><defs data-v-995d4afe><clipPath id="clip0_2275_7318" data-v-995d4afe><rect width="15.9961" height="15.9961" fill="white" data-v-995d4afe></rect></clipPath></defs></svg></button>`);
      } else {
        _push(`<button class="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105" type="button" aria-label="Add to wishlist" data-v-995d4afe><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-995d4afe><path d="M2.35789 9.75178C1.94169 9.28752 1.61194 8.73488 1.38784 8.12607C1.16375 7.51725 1.0498 6.86445 1.05263 6.20569C1.05263 4.87334 1.52397 3.59556 2.36294 2.65344C3.20192 1.71133 4.33982 1.18205 5.52632 1.18205C7.18947 1.18205 8.64211 2.1986 9.41053 3.7116H10.5895C10.9801 2.94217 11.5454 2.30272 12.2277 1.85838C12.91 1.41404 13.6849 1.18068 14.4737 1.18205C15.6602 1.18205 16.7981 1.71133 17.6371 2.65344C18.476 3.59556 18.9474 4.87334 18.9474 6.20569C18.9474 7.58867 18.4211 8.86526 17.6421 9.75178L10 18.3215L2.35789 9.75178Z" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-995d4afe></path></svg></button>`);
      }
      _push(`</div></div><div class="flex gap-3" data-v-995d4afe><!--[-->`);
      ssrRenderList(images.value, (thumb, index) => {
        _push(`<button class="${ssrRenderClass([
          "thumbnail-btn w-20 h-20 bg-product-bg rounded-lg overflow-hidden border-2 transition-colors",
          mainImage.value === thumb ? "border-primary-black" : "border-transparent hover:border-primary-black"
        ])}" type="button"${ssrRenderAttr("aria-label", `View image ${index + 1}`)} data-v-995d4afe><img${ssrRenderAttr("src", thumb)}${ssrRenderAttr("alt", `Product Image ${index + 1}`)} class="w-full h-full object-cover" data-v-995d4afe></button>`);
      });
      _push(`<!--]--></div></div><div class="space-y-6" data-v-995d4afe><div data-v-995d4afe><h1 class="text-3xl md:text-4xl font-bold text-primary-black mb-3" data-v-995d4afe>${ssrInterpolate(__props.product.name)}</h1><div class="flex items-center gap-3 mb-4" data-v-995d4afe><span class="text-3xl font-bold text-primary-black" data-v-995d4afe>$${ssrInterpolate(finalPrice.value)}</span>`);
      if (hasDiscount.value) {
        _push(`<span class="text-xl text-primary-gray line-through" data-v-995d4afe>$${ssrInterpolate(productPrice.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (hasDiscount.value) {
        _push(`<span class="bg-success text-white px-3 py-1 rounded-full text-sm font-semibold" data-v-995d4afe> Save $${ssrInterpolate(discountAmount.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div data-v-995d4afe><p class="${ssrRenderClass({
        "text-primary-gray leading-relaxed mb-4": true,
        "line-clamp-3": !showFullDescription.value && isDescriptionLong.value
      })}" data-v-995d4afe>${ssrInterpolate(__props.product.description)}</p>`);
      if (isDescriptionLong.value) {
        _push(`<button class="text-primary-black font-medium hover:underline" data-v-995d4afe><span data-v-995d4afe>${ssrInterpolate(showFullDescription.value ? "Read Less" : "Read More")}</span><svg class="${ssrRenderClass(["w-4 h-4 inline-block ml-1 transition-transform", showFullDescription.value ? "rotate-180" : ""])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-995d4afe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-995d4afe></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--[-->`);
      ssrRenderList(availableAttributes.value, (attribute) => {
        _push(`<div data-v-995d4afe><h3 class="font-semibold text-primary-black mb-3" data-v-995d4afe>${ssrInterpolate(attribute.name)}</h3><div class="flex gap-3 mb-4" data-v-995d4afe>`);
        if (attribute.name.toLowerCase() !== "color") {
          _push(`<!--[-->`);
          ssrRenderList(attribute.items, (item) => {
            _push(`<button class="${ssrRenderClass([
              "px-4 py-2 border rounded-lg transition-colors",
              selectedAttributes.value[attribute.id] === item.id ? "border-primary-black bg-primary-black text-white" : "border-gray-300 hover:border-primary-black"
            ])}" type="button" data-v-995d4afe>${ssrInterpolate(item.name)}</button>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (attribute.name.toLowerCase() === "color") {
          _push(`<!--[-->`);
          ssrRenderList(attribute.items, (item) => {
            _push(`<button type="button"${ssrRenderAttr("aria-label", `Select color ${item.name}`)} class="${ssrRenderClass([selectedAttributes.value[attribute.id] === item.id ? "border-primary-black" : "border-gray-300 hover:border-primary-black", "w-10 h-10 rounded-full border-2 transition-colors"])}" style="${ssrRenderStyle({ backgroundColor: item.additional_information || "#ffffff" })}" data-v-995d4afe></button>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--><div data-v-995d4afe><h3 class="font-semibold text-primary-black mb-3" data-v-995d4afe>Quantity</h3><div class="flex items-center gap-3 mb-6" data-v-995d4afe><button class="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-primary-black transition-colors" type="button"${ssrIncludeBooleanAttr(quantity.value <= 1) ? " disabled" : ""} data-v-995d4afe><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-995d4afe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" data-v-995d4afe></path></svg></button><span class="w-16 text-center text-lg font-medium" data-v-995d4afe>${ssrInterpolate(quantity.value)}</span><button class="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-primary-black transition-colors" type="button"${ssrIncludeBooleanAttr(!canIncreaseQuantity.value) ? " disabled" : ""} data-v-995d4afe><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-995d4afe><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" data-v-995d4afe></path></svg></button></div></div>`);
      if (isInStock.value) {
        _push(`<div class="bg-success/10 border border-success/20 rounded-full px-3 py-1 mb-6 inline-block" data-v-995d4afe><span class="text-success text-sm font-medium" data-v-995d4afe>In Stock</span></div>`);
      } else {
        _push(`<div class="bg-error/10 border border-error/20 rounded-full px-3 py-1 mb-6 inline-block" data-v-995d4afe><span class="text-error text-sm font-medium" data-v-995d4afe>Out of Stock</span></div>`);
      }
      _push(`<div class="space-y-3" data-v-995d4afe><button class="primary-button w-full flex items-center justify-center gap-2 !py-3 md:!py-4 !rounded-full"${ssrIncludeBooleanAttr(!canAddToCart.value) ? " disabled" : ""} type="button" data-v-995d4afe><svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-995d4afe><path d="M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" data-v-995d4afe></path><path d="M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" data-v-995d4afe></path><path d="M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" data-v-995d4afe></path></svg> Add to Cart </button></div></div></div></div></section><section class="bg-[#FFF8F3] section-padding" data-v-995d4afe><div class="container" data-v-995d4afe><h3 class="text-base sm:text-lg lg:text-xl font-medium mb-3 lg:mb-4" data-v-995d4afe>You may also like</h3><div class="" data-v-995d4afe><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-3 lg:mt-4 mb-6 lg:mb-8" data-v-995d4afe><!--[-->`);
      ssrRenderList(__props.relatedProducts, (product) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/Products/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-995d4afe"]]);
export {
  Show as default
};
