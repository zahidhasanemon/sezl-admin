import { ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import moment from "moment";
import "vue3-toastify";
import "@inertiajs/core";
import "lodash-es";
import "pinia";
const _sfc_main = {
  __name: "TrackOrder",
  __ssrInlineRender: true,
  props: {
    order: Object,
    transaction: Object,
    seo: Object
  },
  setup(__props) {
    const props = __props;
    const getEstimatedDays = () => {
      const startDate = moment(props.order.created_at).add(2, "days");
      const endDate = moment().add(5, "days");
      return `${startDate.format("MMM D")} - ${endDate.format("MMM D")}`;
    };
    const formatDate = (date) => {
      return moment(date).format("DD MMM YYYY, hh:mm a");
    };
    const statusMap = {
      pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
      confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800", icon: "✔️" },
      processing: { label: "Processing", color: "bg-indigo-100 text-indigo-800", icon: "🔄" },
      in_transit: { label: "In Transit", color: "bg-purple-100 text-purple-800", icon: "🚚" },
      delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: "✅" },
      cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: "❌" }
    };
    const formatStatus = (status) => {
      var _a;
      return ((_a = statusMap[status]) == null ? void 0 : _a.label) || "";
    };
    const statusColor = (status) => {
      var _a;
      return ((_a = statusMap[status]) == null ? void 0 : _a.color) || "text-gray-500";
    };
    ref(false);
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
      _push(`<section class="section-padding mx-auto max-w-4xl"><div class="container"><nav class="text-xs sm:text-xs lg:text-sm mb-3 lg:mb-4" aria-label="Breadcrumb"><ol class="list-reset flex text-primary-gray flex-wrap"><li>`);
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
      _push(`<span class="mx-2">&gt;</span></li><li class="text-gray-800 font-semibold">Track Order</li></ol></nav><div class="space-y-4 lg:space-y-6"><div class="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6"><svg width="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"><path d="M10.5 13.5V4.5C10.5 3.67213 9.82787 3 9 3H3C2.17213 3 1.5 3.67213 1.5 4.5V12.75C1.5 13.1639 1.83606 13.5 2.25 13.5H3.75M11.25 13.5H6.75M14.25 13.5H15.75C16.1639 13.5 16.5 13.1639 16.5 12.75V10.0125C16.4997 9.8423 16.4415 9.67726 16.335 9.5445L13.725 6.282C13.5829 6.10407 13.3677 6.00032 13.14 6H10.5" stroke="#0F1724" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.25 13.5C11.25 14.3279 11.9221 15 12.75 15C13.5779 15 14.25 14.3279 14.25 13.5C14.25 12.6721 13.5779 12 12.75 12C11.9221 12 11.25 12.6721 11.25 13.5" stroke="#0F1724" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.75 13.5C3.75 14.3279 4.42213 15 5.25 15C6.07787 15 6.75 14.3279 6.75 13.5C6.75 12.6721 6.07787 12 5.25 12C4.42213 12 3.75 12.6721 3.75 13.5" stroke="#0F1724" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-black">Track Order</h1></div><div class="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 lg:gap-4 mb-4 lg:mb-6"><div><h2 class="text-sm sm:text-sm lg:text-base font-semibold text-primary-black"> Order #${ssrInterpolate(__props.order.id)} • Est. delivery: ${ssrInterpolate(getEstimatedDays())}</h2><p class="text-xs sm:text-xs lg:text-sm text-primary-gray mt-1"> Tracking ID: <span class="font-medium text-primary-black">${ssrInterpolate(__props.order.tracking_number)}</span></p></div><div class="flex items-center gap-2"><span class="${ssrRenderClass(["inline-flex items-center px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs sm:text-xs lg:text-sm font-medium", statusColor(__props.order.status)])}">${ssrInterpolate(formatStatus(__props.order.status))}</span></div></div><!--[-->`);
      ssrRenderList(__props.order.items, (item) => {
        var _a, _b;
        _push(`<div class="flex items-start gap-3 lg:gap-4 p-3 sm:p-4 lg:p-4 bg-gray-50 rounded-lg mb-4 lg:mb-6"><img${ssrRenderAttr("src", item.product.default_image)} alt="Floral Summer Dress" class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg object-cover flex-shrink-0"><div class="flex-1 min-w-0"><h3 class="font-semibold text-primary-black mb-1 text-xs sm:text-xs lg:text-sm">${ssrInterpolate(item.product.name)}</h3>`);
        if ((_b = (_a = item.variation) == null ? void 0 : _a.variation_attributes) == null ? void 0 : _b.length) {
          _push(`<p class="text-xs sm:text-xs lg:text-sm text-primary-gray mb-2">Qty ${ssrInterpolate(item.quantity)} • ${ssrInterpolate(item.variation.variation_attributes.map((attr) => `${attr.attribute.name}: ${attr.attribute_item.name}`).join(" • "))}</p>`);
        } else {
          _push(`<p class="text-xs sm:text-xs lg:text-sm text-primary-gray mb-2">Qty ${ssrInterpolate(item.quantity)}</p>`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div class="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6"><h3 class="text-sm sm:text-sm lg:text-base font-semibold text-primary-black mb-4 lg:mb-6"> Tracking Order </h3><div class="space-y-4 lg:space-y-6"><!--[-->`);
      ssrRenderList(__props.order.logs, (log) => {
        _push(`<div class="flex items-start gap-3 lg:gap-4"><div class="flex flex-col items-center"><div class="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"><svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div><div class="w-0.5 h-8 sm:h-10 lg:h-12 bg-green-600 mt-2"></div></div><div class="flex-1 pb-4 lg:pb-6"><div class="flex items-center justify-between mb-1"><h4 class="font-semibold text-primary-black text-xs sm:text-xs lg:text-sm">${ssrInterpolate(log.action)}</h4><span class="text-xs sm:text-xs lg:text-sm text-primary-gray">${ssrInterpolate(formatDate(log.created_at))}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/TrackOrder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
