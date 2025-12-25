import { ref, watch, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6 } from "./Sort-Ht4WrPYr.js";
import { _ as _sfc_main$2 } from "./Pagination-BwGsZojQ.js";
import { _ as _sfc_main$1 } from "./ProductCard-tz37HsYK.js";
import { c as circleLogo } from "./circle-logo-DiIfBNPn.js";
import { h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import { router } from "@inertiajs/core";
import "vue3-toastify";
import "lodash-es";
import "pinia";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    products: Array,
    filterOptions: Object,
    appliedFilters: Object,
    meta: Object,
    seo: Object
  },
  setup(__props) {
    var _a;
    const props = __props;
    const filters = ref(props.appliedFilters);
    const showCategoryFilter = ref(false);
    const showSortFilter = ref(false);
    const showPriceRangeFilter = ref(false);
    const showAttributeFilter = ref(false);
    const selectedAttribute = ref({});
    const selectedPriceRange = ref(
      props.appliedFilters.min_price != null && props.appliedFilters.max_price != null ? ((_a = props.filterOptions.price_ranges.find(
        (r) => r.min === props.appliedFilters.min_price && r.max === props.appliedFilters.max_price
      )) == null ? void 0 : _a.label) || null : null
    );
    watch(showCategoryFilter, (val) => {
      if (val) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    watch(showSortFilter, (val) => {
      if (val) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    watch(showPriceRangeFilter, (val) => {
      if (val) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    watch(showAttributeFilter, (val) => {
      if (val) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    const search = () => {
      router.get("/products", filters.value, {
        preserveState: true,
        replace: true
      });
    };
    const paginate = (page) => {
      router.get("/products", { ...filters.value, page }, {
        preserveState: true,
        replace: true
      });
    };
    const applyCategoryFilter = (selectedCategories) => {
      filters.value.categories = selectedCategories;
      search();
    };
    const applyAttributeFilter = (selectedAttributes) => {
      filters.value.attributes = selectedAttributes;
      search();
    };
    const applyPriceFilter = (selected) => {
      if (selected) {
        selectedPriceRange.value = selected;
        const range = props.filterOptions.price_ranges.find((r) => r.label === selected);
        filters.value.min_price = range.min;
        filters.value.max_price = range.max;
      } else {
        selectedPriceRange.value = null;
        filters.value.min_price = null;
        filters.value.max_price = null;
      }
      search();
    };
    const applySort = (selected) => {
      filters.value.sort_by = selected;
      search();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div>`);
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
      _push(`<div class="section-padding"><section class="mb-3 md:mb-6"><div class="container"><nav class="text-sm mb-3 lg:mb-4" aria-label="Breadcrumb"><ol class="list-reset flex text-gray-600"><li>`);
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
      _push(`<span class="mx-2">&gt;</span></li><li class="text-gray-800 font-semibold">Products</li></ol></nav></div></section><section class=""><div class="container"><div class=""><h2 class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-2">${ssrInterpolate(__props.appliedFilters.featured ? "Featured Products" : __props.appliedFilters.sale ? "Discounted Products" : "Products")}</h2></div><div class="my-4 sm:my-6 lg:my-8 bg-[#FFF8F3] p-3 sm:p-4 lg:p-6 rounded-lg lg:rounded-xl"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"><div class="relative w-full"><button class="button bg-white w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-primary-gray text-sm sm:text-base text-primary-gray rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-primary-black/20 transition-all duration-300 hover:border-primary-black">Category</button></div><!--[-->`);
      ssrRenderList(__props.filterOptions.attributes, (attribute) => {
        _push(`<div class="relative w-full"><button class="button bg-white w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-primary-gray text-sm sm:text-base text-primary-gray rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-primary-black/20 transition-all duration-300 hover:border-primary-black">${ssrInterpolate(attribute.name)}</button></div>`);
      });
      _push(`<!--]--><div class="relative w-full"><button class="button bg-white w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-primary-gray text-sm sm:text-base text-primary-gray rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-primary-black/20 transition-all duration-300 hover:border-primary-black">Price Range</button></div><div class="relative w-full"><button class="button bg-white w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-primary-gray text-sm sm:text-base text-primary-gray rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-primary-black/20 transition-all duration-300 hover:border-primary-black">Sort By</button></div><div class="flex justify-center"><button class="primary-button w-full !rounded-full !py-2.5 !sm:py-3">Clear Filters</button></div></div></div><div class=""><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-8 mb-6 lg:mb-8"><!--[-->`);
      ssrRenderList(__props.products, (product) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        meta: __props.meta,
        onPaginate: paginate
      }, null, _parent));
      _push(`</div></section></div><div class="absolute product-page-shape -left-60 w-full overflow-hidden leading-[0] -z-10"><img${ssrRenderAttr("src", unref(circleLogo))} alt=""></div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        show: showCategoryFilter.value,
        "onUpdate:show": ($event) => showCategoryFilter.value = $event,
        categories: __props.filterOptions.categories,
        "selected-values": __props.appliedFilters.categories,
        onApply: applyCategoryFilter
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        show: showAttributeFilter.value,
        "onUpdate:show": ($event) => showAttributeFilter.value = $event,
        attribute: selectedAttribute.value,
        "selected-values": __props.appliedFilters.attributes,
        onApply: applyAttributeFilter
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        show: showPriceRangeFilter.value,
        "onUpdate:show": ($event) => showPriceRangeFilter.value = $event,
        "price-ranges": __props.filterOptions.price_ranges,
        "selected-value": selectedPriceRange.value,
        onApply: applyPriceFilter
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        show: showSortFilter.value,
        "onUpdate:show": ($event) => showSortFilter.value = $event,
        "sort-options": __props.filterOptions.sort,
        "selected-value": __props.appliedFilters.sort_by,
        onApply: applySort
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/Products/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
