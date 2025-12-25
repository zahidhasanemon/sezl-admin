import { ref, watch, unref, withCtx, createVNode, toDisplayString, createTextVNode, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Pagination-BwGsZojQ.js";
import { b as useForm, h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import "vue3-toastify";
import { router } from "@inertiajs/core";
import "lodash-es";
import "pinia";
const _sfc_main = {
  __name: "MyWishlist",
  __ssrInlineRender: true,
  props: {
    seo: Object,
    wishlists: Array,
    meta: Object,
    appliedFilters: Object
  },
  setup(__props) {
    const props = __props;
    const filters = ref(props.appliedFilters);
    const selectedWishlists = ref([]);
    const selectAll = ref(false);
    const paginate = (page) => {
      router.get("/wishlist", { ...filters.value, page }, {
        preserveState: true,
        replace: true
      });
    };
    watch(filters, (value) => {
      router.get("/wishlist", value, {
        preserveState: true,
        replace: true
      });
    }, { deep: true });
    useForm({
      id: ""
    });
    useForm({
      id: ""
    });
    watch(selectedWishlists, (newVal) => {
      const total = props.wishlists.length;
      const selectedCount = newVal.length;
      selectAll.value = selectedCount === total && total > 0;
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
      _push(`<span class="mx-2">&gt;</span></li><li>`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/profile",
        class: "hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Profile`);
          } else {
            return [
              createTextVNode("Profile")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="mx-2">&gt;</span></li><li class="text-gray-800 font-semibold">Wishlist</li></ol></nav><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 lg:mb-4"><div class="mb-3 sm:mb-0"><div class="flex gap-3"><div class="mt-1.5 lg:mt-2"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"><path d="M2.35789 9.75178C1.94169 9.28752 1.61194 8.73488 1.38784 8.12607C1.16375 7.51725 1.0498 6.86445 1.05263 6.20569C1.05263 4.87334 1.52397 3.59556 2.36294 2.65344C3.20192 1.71133 4.33982 1.18205 5.52632 1.18205C7.18947 1.18205 8.64211 2.1986 9.41053 3.7116H10.5895C10.9801 2.94217 11.5454 2.30272 12.2277 1.85838C12.91 1.41404 13.6849 1.18068 14.4737 1.18205C15.6602 1.18205 16.7981 1.71133 17.6371 2.65344C18.476 3.59556 18.9474 4.87334 18.9474 6.20569C18.9474 7.58867 18.4211 8.86526 17.6421 9.75178L10 18.3215L2.35789 9.75178ZM18.3789 10.591C19.3789 9.45628 20 7.91963 20 6.20569C20 4.55984 19.4178 2.98141 18.3814 1.81762C17.345 0.653831 15.9394 2.13381e-05 14.4737 2.13381e-05C12.6316 2.13381e-05 11 1.00475 10 2.56503C9.48958 1.76893 8.81748 1.12096 8.03945 0.674877C7.26142 0.22879 6.39989 -0.00255828 5.52632 2.13381e-05C4.06065 2.13381e-05 2.65501 0.653831 1.61862 1.81762C0.582235 2.98141 0 4.55984 0 6.20569C0 7.91963 0.621053 9.45628 1.62105 10.591L10 20L18.3789 10.591Z" fill="black"></path></svg></div><div><h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-2"> My Wishlist </h1></div></div></div></div><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 lg:mb-4 p-3 sm:p-4 lg:p-6 bg-gray-50 rounded-lg"><div class="flex items-center gap-3 mb-3 sm:mb-0"><input type="checkbox" id="select-all"${ssrIncludeBooleanAttr(Array.isArray(selectAll.value) ? ssrLooseContain(selectAll.value, null) : selectAll.value) ? " checked" : ""} class="w-4 h-4 text-primary-black border-gray-300 rounded focus:ring-primary-black"><label for="select-all" class="text-sm lg:text-base font-medium text-primary-black">Select all (${ssrInterpolate(__props.wishlists.length)})</label></div><div class="flex items-center gap-3"><button${ssrIncludeBooleanAttr(!selectedWishlists.value.length) ? " disabled" : ""} class="flex items-center gap-2 primary-button-outline !px-3 sm:!px-4 !py-2 text-sm lg:text-base"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg><span class="hidden sm:inline">Clear Wishlist</span><span class="sm:hidden">Clear</span></button></div></div><div class="space-y-3 lg:space-y-4"><!--[-->`);
      ssrRenderList(__props.wishlists, (wishlist) => {
        _push(`<div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow"><div class="flex flex-col sm:hidden space-y-3"><div class="flex items-start gap-3"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(selectedWishlists.value) ? ssrLooseContain(selectedWishlists.value, wishlist.id) : selectedWishlists.value) ? " checked" : ""}${ssrRenderAttr("value", wishlist.id)} class="w-4 h-4 text-primary-black border-gray-300 rounded focus:ring-primary-black mt-1"><img${ssrRenderAttr("src", wishlist.default_image)}${ssrRenderAttr("alt", wishlist.product_name)} class="w-16 h-16 object-cover rounded-lg flex-shrink-0"><div class="flex-1 min-w-0"><h3 class="font-semibold text-primary-black text-sm leading-tight">${ssrInterpolate(wishlist.product_name)}</h3><p class="text-xs text-primary-gray mt-1">${ssrInterpolate(wishlist.category.breadcrumb_string)}</p></div></div><div class="flex items-center justify-between"><div class="flex items-center gap-2"><span class="text-base sm:text-lg font-bold text-primary-black">$${ssrInterpolate(wishlist.final_price)}</span>`);
        if (wishlist.stock_status == "in_stock") {
          _push(`<span class="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"> In Stock </span>`);
        } else if (wishlist.stock_status == "limited") {
          _push(`<span class="inline-flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium"> Limited Stock </span>`);
        } else {
          _push(`<span class="inline-flex items-center bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium"> Out of Stock </span>`);
        }
        _push(`</div><div class="flex items-center gap-2">`);
        if (wishlist.stock_status == "out_of_stock") {
          _push(`<button class="primary-button-outline flex items-center gap-1 !px-2 !py-1 !text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FBC02D" stroke="#F57F17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-3 0-5 2.5-5 5.5v3.4c0 .7-.3 1.4-.8 1.9l-1.2 1.2c-.4.4-.1 1.1.5 1.1h16c.6 0 .9-.7.5-1.1l-1.2-1.2c-.5-.5-.8-1.2-.8-1.9V8.5C17 5.5 15 3 12 3z"></path><path d="M10 18a2 2 0 0 0 4 0"></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        if (wishlist.stock_status === "out_of_stock" && !wishlist.notify) {
          _push(`<button class="primary-button-outline flex items-center gap-1 !px-2 !py-1 !text-xs"><svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="#FBC02D" stroke="#F57F17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-3 0-5 2.5-5 5.5v3.4c0 .7-.3 1.4-.8 1.9l-1.2 1.2c-.4.4-.1 1.1.5 1.1h16c.6 0 .9-.7.5-1.1l-1.2-1.2c-.5-.5-.8-1.2-.8-1.9V8.5C17 5.5 15 3 12 3z"></path><path d="M10 18a2 2 0 0 0 4 0"></path></svg><span class="hidden sm:inline">Notify</span></button>`);
        } else if (wishlist.stock_status === "out_of_stock" && wishlist.notify) {
          _push(`<button class="primary-button flex items-center gap-1 !px-2 !py-1 !text-xs"><svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="#FBC02D" stroke="#F57F17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-3 0-5 2.5-5 5.5v3.4c0 .7-.3 1.4-.8 1.9l-1.2 1.2c-.4.4-.1 1.1.5 1.1h16c.6 0 .9-.7.5-1.1l-1.2-1.2c-.5-.5-.8-1.2-.8-1.9V8.5C17 5.5 15 3 12 3z"></path><path d="M10 18a2 2 0 0 0 4 0"></path><polyline points="9 12 11 14 15 10" stroke="#388E3C" stroke-width="2" fill="none"></polyline></svg><span class="hidden sm:inline">On</span></button>`);
        } else {
          _push(`<!---->`);
        }
        if (wishlist.stock_status != "out_of_stock") {
          _push(ssrRenderComponent(unref(link_default), {
            href: `/products/${wishlist.slug}`,
            class: "primary-button-outline flex items-center gap-1 !px-2 !py-1 !text-xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="w-3 h-3" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z" stroke="#000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path><path d="M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z" stroke="#000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path><path d="M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348" stroke="#000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg> Add `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "w-3 h-3",
                    viewBox: "0 0 22 22",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      d: "M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z",
                      stroke: "#000",
                      "stroke-width": "1.4",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }),
                    createVNode("path", {
                      d: "M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z",
                      stroke: "#000",
                      "stroke-width": "1.4",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }),
                    createVNode("path", {
                      d: "M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348",
                      stroke: "#000",
                      "stroke-width": "1.2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    })
                  ])),
                  createTextVNode(" Add ")
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="px-2 py-1 min-h-8 text-error border border-error rounded-lg cursor-pointer hover:bg-error/10 transition-colors"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div><div class="hidden sm:flex items-center gap-3 lg:gap-4"><div class="flex items-center"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(selectedWishlists.value) ? ssrLooseContain(selectedWishlists.value, wishlist.id) : selectedWishlists.value) ? " checked" : ""}${ssrRenderAttr("value", wishlist.id)} class="w-4 h-4 text-primary-black border-gray-300 rounded focus:ring-primary-black"></div><div class="flex-shrink-0"><img${ssrRenderAttr("src", wishlist.default_image)}${ssrRenderAttr("alt", wishlist.product_name)} class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg"></div><div class="flex-1 min-w-0"><h3 class="font-semibold text-primary-black mb-1 text-sm sm:text-base lg:text-lg">${ssrInterpolate(wishlist.product_name)}</h3><p class="text-xs sm:text-sm lg:text-base text-primary-gray mb-2">${ssrInterpolate(wishlist.category.breadcrumb_string)}</p><div class="flex items-center gap-3"><span class="text-base sm:text-lg lg:text-xl font-bold text-primary-black">$${ssrInterpolate(wishlist.final_price)}</span>`);
        if (wishlist.stock_status == "in_stock") {
          _push(`<span class="inline-flex items-center bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"> In Stock </span>`);
        } else if (wishlist.stock_status == "limited") {
          _push(`<span class="inline-flex items-center bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"> Limited Stock </span>`);
        } else {
          _push(`<span class="inline-flex items-center bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"> Out of Stock </span>`);
        }
        _push(`</div></div><div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">`);
        if (wishlist.stock_status === "out_of_stock" && !wishlist.notify) {
          _push(`<button class="primary-button-outline flex items-center gap-2 !px-3 sm:!px-4 !py-1.5 !text-xs sm:!text-sm lg:!text-base"><svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="#FBC02D" stroke="#F57F17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-3 0-5 2.5-5 5.5v3.4c0 .7-.3 1.4-.8 1.9l-1.2 1.2c-.4.4-.1 1.1.5 1.1h16c.6 0 .9-.7.5-1.1l-1.2-1.2c-.5-.5-.8-1.2-.8-1.9V8.5C17 5.5 15 3 12 3z"></path><path d="M10 18a2 2 0 0 0 4 0"></path></svg><span class="hidden sm:inline">Notify</span></button>`);
        } else if (wishlist.stock_status === "out_of_stock" && wishlist.notify) {
          _push(`<button class="primary-button flex items-center gap-2 !px-3 sm:!px-4 !py-1.5 !text-xs sm:!text-sm lg:!text-base"><svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="#FBC02D" stroke="#F57F17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-3 0-5 2.5-5 5.5v3.4c0 .7-.3 1.4-.8 1.9l-1.2 1.2c-.4.4-.1 1.1.5 1.1h16c.6 0 .9-.7.5-1.1l-1.2-1.2c-.5-.5-.8-1.2-.8-1.9V8.5C17 5.5 15 3 12 3z"></path><path d="M10 18a2 2 0 0 0 4 0"></path><polyline points="9 12 11 14 15 10" stroke="#388E3C" stroke-width="2" fill="none"></polyline></svg><span class="hidden sm:inline">On</span></button>`);
        } else {
          _push(`<!---->`);
        }
        if (wishlist.stock_status != "out_of_stock") {
          _push(ssrRenderComponent(unref(link_default), {
            href: `/products/${wishlist.slug}`,
            class: "primary-button-outline flex items-center gap-2 !px-3 sm:!px-4 !py-1.5 !text-xs sm:!text-sm lg:!text-base"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z" stroke="#000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path><path d="M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z" stroke="#000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path><path d="M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348" stroke="#000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg> Add `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "w-3 h-3 sm:w-4 sm:h-4",
                    viewBox: "0 0 22 22",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      d: "M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z",
                      stroke: "#000",
                      "stroke-width": "1.4",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }),
                    createVNode("path", {
                      d: "M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z",
                      stroke: "#000",
                      "stroke-width": "1.4",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }),
                    createVNode("path", {
                      d: "M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348",
                      stroke: "#000",
                      "stroke-width": "1.2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    })
                  ])),
                  createTextVNode(" Add ")
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="flex items-center gap-2 danger-button-outline !px-3 sm:!px-4 !py-1.5 !text-xs sm:!text-sm lg:!text-base"><svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg><span class="hidden sm:inline">Remove</span></button></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        meta: __props.meta,
        onPaginate: paginate
      }, null, _parent));
      _push(`</div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/MyWishlist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
