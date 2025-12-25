import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    meta: {
      type: Object,
      required: true
    }
  },
  emits: ["paginate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const pages = computed(() => {
      const current = props.meta.current_page;
      const last = props.meta.last_page;
      const pageNumbers = [];
      const maxPageShown = Math.min(current + 2, last);
      for (let i = 1; i <= maxPageShown; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    });
    const showLastPage = computed(() => {
      return props.meta.last_page > 6 && props.meta.current_page + 2 < props.meta.last_page;
    });
    const lastPageGap = computed(() => {
      return props.meta.last_page > 6 && props.meta.current_page + 2 < props.meta.last_page;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.meta.last_page > 1) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center mt-6 lg:mt-8 gap-1 sm:gap-2" }, _attrs))}><button class="flex items-center gap-1 cursor-pointer px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-primary-gray rounded-lg hover:bg-gray-50 transition-colors"${ssrIncludeBooleanAttr(__props.meta.current_page === 1) ? " disabled" : ""}><svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg><span class="hidden sm:inline">Previous</span><span class="sm:hidden">Prev</span></button><!--[-->`);
        ssrRenderList(pages.value, (page) => {
          _push(`<button class="${ssrRenderClass([
            "px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg min-w-6 sm:min-w-8 cursor-pointer transition-colors",
            page === __props.meta.current_page ? "bg-primary-black text-white" : "text-primary-gray hover:bg-gray-50"
          ])}"${ssrRenderAttr("aria-current", page === __props.meta.current_page ? "page" : null)}>${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]-->`);
        if (lastPageGap.value) {
          _push(`<span class="px-1 sm:px-2 text-xs sm:text-sm text-primary-gray">...</span>`);
        } else {
          _push(`<!---->`);
        }
        if (showLastPage.value) {
          _push(`<button class="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-primary-gray hover:bg-gray-50 rounded-lg min-w-6 sm:min-w-8 cursor-pointer transition-colors">${ssrInterpolate(__props.meta.last_page)}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="flex cursor-pointer items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-primary-gray rounded-lg hover:bg-gray-50 transition-colors"${ssrIncludeBooleanAttr(__props.meta.current_page === __props.meta.last_page) ? " disabled" : ""}><span class="hidden sm:inline">Next</span><span class="sm:hidden">Next</span><svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
