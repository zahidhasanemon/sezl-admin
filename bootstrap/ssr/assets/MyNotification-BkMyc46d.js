import { ref, watch, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Pagination-BwGsZojQ.js";
import { h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import moment from "moment";
import { router } from "@inertiajs/core";
import "lodash-es";
import "pinia";
import "vue3-toastify";
const _sfc_main = {
  __name: "MyNotification",
  __ssrInlineRender: true,
  props: {
    seo: Object,
    notifications: Array,
    meta: Object,
    appliedFilters: Object
  },
  setup(__props) {
    const props = __props;
    const filters = ref(props.appliedFilters);
    const paginate = (page) => {
      router.get("/notifications", { ...filters.value, page }, {
        preserveState: true,
        replace: true
      });
    };
    watch(filters, (value) => {
      router.get("/notifications", value, {
        preserveState: true,
        replace: true
      });
    }, { deep: true });
    const formatDate = (date) => {
      return moment(date).fromNow();
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
      _push(`<section class="section-padding mx-auto max-w-4xl"><div class="container"><nav class="text-sm mb-4 sm:mb-6" aria-label="Breadcrumb"><ol class="list-reset flex text-primary-gray flex-wrap"><li>`);
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
      _push(`<span class="mx-2">&gt;</span></li><li class="text-gray-800 font-semibold">Notifications</li></ol></nav><div class="space-y-4 lg:space-y-6"><div class="mb-4 lg:mb-6"><h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black mb-3 lg:mb-4"> Notifications </h1><p class="text-sm sm:text-sm lg:text-base"> Stay updated with your latest orders, payments, and account activities. </p></div><div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"><div class="relative flex-shrink-0 min-w-56"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 12L5.25 15L8.25 12M5.25 15V3M8.25 3H15.75M8.25 6H13.5M8.25 9H11.25" stroke="currentColor" stroke-opacity="0.64" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg><select class="form-control w-full sm:w-auto min-w-[220px] !pl-10 !py-2.5"><option value="latest"${ssrIncludeBooleanAttr(Array.isArray(filters.value.sort) ? ssrLooseContain(filters.value.sort, "latest") : ssrLooseEqual(filters.value.sort, "latest")) ? " selected" : ""}>Recent</option><option value="oldest"${ssrIncludeBooleanAttr(Array.isArray(filters.value.sort) ? ssrLooseContain(filters.value.sort, "oldest") : ssrLooseEqual(filters.value.sort, "oldest")) ? " selected" : ""}>Oldest</option></select></div></div><div class="space-y-3 lg:space-y-4"><!--[-->`);
      ssrRenderList(__props.notifications, (notification) => {
        _push(`<div class="border border-border-primary rounded-lg p-3 sm:p-4 lg:p-6 hover:bg-border-primary/10 transition-all"><div class="flex items-start gap-3 lg:gap-4"><div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 relative bg-border-primary rounded-full flex items-center justify-center flex-shrink-0"><svg width="20" height="20" sm:width="20" sm:height="20" lg:width="22" lg:height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.584 19.4798H6.41732C3.07148 19.4798 1.14648 17.5548 1.14648 14.209V7.79232C1.14648 4.44648 3.07148 2.52148 6.41732 2.52148H15.584C18.9298 2.52148 20.8548 4.44648 20.8548 7.79232V14.209C20.8548 17.5548 18.9298 19.4798 15.584 19.4798ZM6.41732 3.89648C3.79565 3.89648 2.52148 5.17065 2.52148 7.79232V14.209C2.52148 16.8307 3.79565 18.1048 6.41732 18.1048H15.584C18.2057 18.1048 19.4798 16.8307 19.4798 14.209V7.79232C19.4798 5.17065 18.2057 3.89648 15.584 3.89648H6.41732Z" fill="#0F0F0F"></path><path d="M11 14.4375C9.1025 14.4375 7.5625 12.8975 7.5625 11C7.5625 9.1025 9.1025 7.5625 11 7.5625C12.8975 7.5625 14.4375 9.1025 14.4375 11C14.4375 12.8975 12.8975 14.4375 11 14.4375ZM11 8.9375C9.86333 8.9375 8.9375 9.86333 8.9375 11C8.9375 12.1367 9.86333 13.0625 11 13.0625C12.1367 13.0625 13.0625 12.1367 13.0625 11C13.0625 9.86333 12.1367 8.9375 11 8.9375Z" fill="#0F0F0F"></path><path d="M5.04102 13.9798C4.66518 13.9798 4.35352 13.6682 4.35352 13.2923V8.70898C4.35352 8.33315 4.66518 8.02148 5.04102 8.02148C5.41685 8.02148 5.72852 8.33315 5.72852 8.70898V13.2923C5.72852 13.6682 5.41685 13.9798 5.04102 13.9798Z" fill="#404040"></path><path d="M16.959 13.9798C16.5832 13.9798 16.2715 13.6682 16.2715 13.2923V8.70898C16.2715 8.33315 16.5832 8.02148 16.959 8.02148C17.3348 8.02148 17.6465 8.33315 17.6465 8.70898V13.2923C17.6465 13.6682 17.3348 13.9798 16.959 13.9798Z" fill="#404040"></path></svg><div class="absolute right-0.5 top-0.5 sm:right-1 sm:top-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></div></div><div class="flex-1 min-w-0"><h3 class="text-primary-gray text-xs sm:text-sm lg:text-base mb-1">${ssrInterpolate(notification.data.title)}</h3><p class="text-primary-black font-semibold text-sm sm:text-sm lg:text-base leading-relaxed">${ssrInterpolate(notification.data.body)}</p><span class="text-xs sm:text-xs lg:text-sm text-primary-gray whitespace-nowrap">${ssrInterpolate(formatDate(notification.created_at))}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/MyNotification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
