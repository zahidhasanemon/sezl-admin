import { ref, watch, useSSRContext, unref, withCtx, createVNode, toDisplayString, createTextVNode } from "vue";
import { ssrRenderTeleport, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderClass, ssrRenderAttrs, ssrRenderComponent, ssrLooseContain } from "vue/server-renderer";
import { d as _export_sfc, h as head_default, l as link_default } from "./FrontendLayout-D9w5YXg3.js";
import { _ as _sfc_main$2 } from "./Pagination-BwGsZojQ.js";
import moment from "moment";
import { toast } from "vue3-toastify";
import { router } from "@inertiajs/core";
import "lodash-es";
import "pinia";
const _sfc_main$1 = {
  __name: "CancelConfirmation",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false },
    orderId: { type: [Number, String], default: null }
  },
  emits: ["update:show", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selectedReason = ref("");
    const additionalDetails = ref("");
    const isSubmitting = ref(false);
    const reasons = [
      { value: "Ordered by mistake", label: "Ordered by mistake" },
      { value: "Found a better price", label: "Found a better price" },
      { value: "Delivery time too long", label: "Delivery time too long" },
      { value: "Payment issue", label: "Payment issue" },
      { value: "Other", label: "Other" }
    ];
    watch(
      () => props.show,
      (val) => {
        if (!val) {
          selectedReason.value = "";
          additionalDetails.value = "";
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4 py-6" data-v-9a41af00><div class="bg-white p-4 sm:p-6 relative rounded-lg max-h-[90vh] w-full max-w-lg flex flex-col overflow-hidden" data-v-9a41af00><div class="flex items-center justify-between mb-4 sm:mb-6" data-v-9a41af00><h2 class="text-xl sm:text-2xl font-bold text-primary-black" data-v-9a41af00> Cancel Order </h2><button aria-label="Close modal" class="hover:bg-gray-100 rounded-full p-1 transition-colors" data-v-9a41af00><svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-v-9a41af00><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z" data-v-9a41af00></path></svg></button></div><div class="overflow-y-auto flex-grow" data-v-9a41af00><form class="space-y-6" data-v-9a41af00><div data-v-9a41af00><label class="block text-sm font-medium text-primary-black mb-3" data-v-9a41af00> Reason for cancellation </label><div class="space-y-3" data-v-9a41af00><!--[-->`);
          ssrRenderList(reasons, (reason) => {
            _push2(`<label class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" data-v-9a41af00><input type="radio"${ssrRenderAttr("value", reason.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(selectedReason.value, reason.value)) ? " checked" : ""} class="w-4 h-4 text-primary-black border-gray-300 focus:ring-primary-black" data-v-9a41af00><span class="ml-3 text-sm text-primary-black" data-v-9a41af00>${ssrInterpolate(reason.label)}</span></label>`);
          });
          _push2(`<!--]--></div></div><div data-v-9a41af00><label for="details" class="block text-sm font-medium text-primary-black mb-2" data-v-9a41af00> Additional details (optional) </label><textarea id="details" rows="3" placeholder="Tell us more about your reason for cancellation..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-black focus:border-transparent resize-none" data-v-9a41af00>${ssrInterpolate(additionalDetails.value)}</textarea></div><div class="flex flex-col sm:flex-row gap-3 pt-2" data-v-9a41af00><button type="button" class="primary-button-outline flex-1 !w-full text-center !px-2"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-9a41af00> Keep my order </button><button type="submit"${ssrIncludeBooleanAttr(!selectedReason.value || isSubmitting.value) ? " disabled" : ""} class="${ssrRenderClass([{
            "opacity-50 cursor-not-allowed": !selectedReason.value || isSubmitting.value
          }, "danger-button flex-1 !w-full font-medium !text-base !py-3"])}" data-v-9a41af00>${ssrInterpolate(isSubmitting.value ? "Processing..." : "Confirm cancellation")}</button></div></form></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/CancelConfirmation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CancelConfirmation = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9a41af00"]]);
const _sfc_main = {
  __name: "MyOrder",
  __ssrInlineRender: true,
  props: {
    seo: Object,
    orders: Array,
    meta: Object,
    appliedFilters: Object
  },
  setup(__props) {
    const props = __props;
    const filters = ref(props.appliedFilters);
    const paginate = (page) => {
      router.get("/my-orders", { ...filters.value, page }, {
        preserveState: true,
        replace: true
      });
    };
    watch(filters, (value) => {
      router.get("/my-orders", value, {
        preserveState: true,
        replace: true
      });
    }, { deep: true });
    const formatDate = (date, format = "DD MMM, YYYY") => {
      return moment(date).format(format);
    };
    const statusMap = {
      pending: { label: "Pending", color: "text-yellow-500", icon: "⏳" },
      confirmed: { label: "Confirmed", color: "text-blue-500", icon: "✔️" },
      processing: { label: "Processing", color: "text-indigo-500", icon: "🔄" },
      in_transit: { label: "In Transit", color: "text-purple-500", icon: "🚚" },
      delivered: { label: "Delivered", color: "text-green-600", icon: "✅" },
      cancelled: { label: "Cancelled", color: "text-red-500", icon: "❌" }
    };
    const formatStatus = (status) => {
      var _a;
      return ((_a = statusMap[status]) == null ? void 0 : _a.label) || "";
    };
    const statusColor = (status) => {
      var _a;
      return ((_a = statusMap[status]) == null ? void 0 : _a.color) || "text-gray-500";
    };
    const statusIcon = (status) => {
      var _a;
      return ((_a = statusMap[status]) == null ? void 0 : _a.icon) || "";
    };
    const toCancelOrderID = ref();
    const showCancelModal = ref(false);
    const handleCancelOrder = (data) => {
      router.post(`/orders/${data.orderId}/cancel`, {
        reason: data.reason,
        details: data.details
      }, {
        preserveScroll: true,
        onSuccess: () => {
          showCancelModal.value = false;
          toast.success("Order cancelled successfully");
        },
        onError: (errors) => {
          if (errors.error) {
            toast.error(errors.error);
          } else {
            toast.error(errors.message || "Failed to cancel order");
          }
        }
      });
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
      _push(`<span class="mx-2">&gt;</span></li><li class="text-gray-800 font-semibold">Order History</li></ol></nav><div class="space-y-4 sm:space-y-6"><div class="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8"><h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-black mb-4 sm:mb-6">My orders</h1><div class="flex flex-col gap-3 sm:gap-4 mb-6 lg:flex-row lg:items-center"><div class="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:flex lg:gap-4"><div class="relative flex-shrink-0 min-w-48"><svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg><select class="form-control w-full sm:w-auto min-w-[160px] !pl-10 !py-2"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(filters.value.dateRange) ? ssrLooseContain(filters.value.dateRange, "all") : ssrLooseEqual(filters.value.dateRange, "all")) ? " selected" : ""}>All</option><option value="30d"${ssrIncludeBooleanAttr(Array.isArray(filters.value.dateRange) ? ssrLooseContain(filters.value.dateRange, "30d") : ssrLooseEqual(filters.value.dateRange, "30d")) ? " selected" : ""}>Last 30 days</option><option value="6m"${ssrIncludeBooleanAttr(Array.isArray(filters.value.dateRange) ? ssrLooseContain(filters.value.dateRange, "6m") : ssrLooseEqual(filters.value.dateRange, "6m")) ? " selected" : ""}>Last 6 months</option><option value="1y"${ssrIncludeBooleanAttr(Array.isArray(filters.value.dateRange) ? ssrLooseContain(filters.value.dateRange, "1y") : ssrLooseEqual(filters.value.dateRange, "1y")) ? " selected" : ""}>Last year</option></select></div><div class="relative flex-shrink-0"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none z-10"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg><svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg><select class="form-control w-full sm:w-auto min-w-[160px] !pl-10 !py-2"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "all") : ssrLooseEqual(filters.value.status, "all")) ? " selected" : ""}>All</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "pending") : ssrLooseEqual(filters.value.status, "pending")) ? " selected" : ""}>Pending</option><option value="confirmed"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "confirmed") : ssrLooseEqual(filters.value.status, "confirmed")) ? " selected" : ""}>Confirmed</option><option value="processing"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "processing") : ssrLooseEqual(filters.value.status, "processing")) ? " selected" : ""}>Processing</option><option value="in_transit"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "in_transit") : ssrLooseEqual(filters.value.status, "in_transit")) ? " selected" : ""}>In Transit</option><option value="delivered"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "delivered") : ssrLooseEqual(filters.value.status, "delivered")) ? " selected" : ""}>Delivered</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "cancelled") : ssrLooseEqual(filters.value.status, "cancelled")) ? " selected" : ""}>Cancelled</option></select></div><div class="relative flex-shrink-0"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 12L5.25 15L8.25 12M5.25 15V3M8.25 3H15.75M8.25 6H13.5M8.25 9H11.25" stroke="currentColor" stroke-opacity="0.64" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-primary-gray pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg><select class="form-control w-full sm:w-auto min-w-[160px] !pl-10 !py-2"><option value="latest"${ssrIncludeBooleanAttr(Array.isArray(filters.value.sort) ? ssrLooseContain(filters.value.sort, "latest") : ssrLooseEqual(filters.value.sort, "latest")) ? " selected" : ""}>Recent</option><option value="oldest"${ssrIncludeBooleanAttr(Array.isArray(filters.value.sort) ? ssrLooseContain(filters.value.sort, "oldest") : ssrLooseEqual(filters.value.sort, "oldest")) ? " selected" : ""}>Oldest</option><option value="price_low_high"${ssrIncludeBooleanAttr(Array.isArray(filters.value.sort) ? ssrLooseContain(filters.value.sort, "price_low_high") : ssrLooseEqual(filters.value.sort, "price_low_high")) ? " selected" : ""}>Total (Low to High)</option><option value="price_high_low"${ssrIncludeBooleanAttr(Array.isArray(filters.value.sort) ? ssrLooseContain(filters.value.sort, "price_high_low") : ssrLooseEqual(filters.value.sort, "price_high_low")) ? " selected" : ""}>Total (High to Low)</option></select></div></div></div><div class="hidden lg:grid grid-cols-6 gap-4 pb-3 border-b border-gray-200 text-sm font-medium text-primary-gray"><div>Order</div><div>Status</div><div>Total</div><div>Date &amp; Time</div><div class="text-center col-span-2">Action</div></div><div class="space-y-3 sm:space-y-4 mt-4">`);
      if (__props.orders.length) {
        _push(`<div class="bg-white border border-gray-200 rounded-lg p-4 lg:p-0 lg:border-0 lg:rounded-none lg:grid lg:grid-cols-6 lg:gap-4 lg:py-4 hover:bg-gray-50 transition-colors"><!--[-->`);
        ssrRenderList(__props.orders, (order) => {
          _push(`<div class="lg:hidden"><div class="flex items-start gap-3 sm:gap-4 mb-4">`);
          if (order.items && order.items.length && order.items[0].product && order.items[0].product.default_image) {
            _push(`<img${ssrRenderAttr("src", order.items[0].product.default_image)} alt="Product" class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0">`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex-1 min-w-0"><div class="flex items-start justify-between mb-2"><h3 class="font-semibold text-primary-black text-sm sm:text-base">#${ssrInterpolate(order.id)}</h3><span class="${ssrRenderClass(["flex items-center gap-1 text-sm", statusColor(order.status)])}"><span>${ssrInterpolate(statusIcon(order.status))}</span> ${ssrInterpolate(formatStatus(order.status))}</span></div><p class="text-xs sm:text-sm text-primary-gray mb-1">${ssrInterpolate(order.items.length == 1 ? "1 Item" : `${order.items.length} Items`)}</p><div class="flex items-center justify-between"><div><p class="text-base sm:text-lg font-semibold text-primary-black">$${ssrInterpolate(order.total_amount)}</p>`);
          if (order.transactions && order.transactions.length) {
            _push(`<p class="text-xs sm:text-sm text-primary-gray">••••${ssrInterpolate(order.transactions[0].card_number)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div></div><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm"><div><p class="text-primary-gray text-xs sm:text-sm">${ssrInterpolate(formatDate(order.created_at, "DD MMM, YYYY"))}</p><p class="text-primary-gray text-xs sm:text-sm">Order placed ${ssrInterpolate(formatDate(
            order.created_at,
            "hh:mm a"
          ))}</p></div><div class="flex flex-wrap items-center gap-2 mb-2">`);
          if (order.status != "cancelled") {
            _push(`<button class="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 text-primary-black rounded-lg hover:bg-gray-50 transition-colors"><svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Invoice </button>`);
          } else {
            _push(`<!---->`);
          }
          if (order.status != "cancelled") {
            _push(`<button${ssrRenderAttr("href", `/orders/${order.id}/track`)} class="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-primary-black text-white rounded-lg hover:bg-primary-black/90 transition-colors"> Track order </button>`);
          } else {
            _push(`<!---->`);
          }
          if (order.status != "cancelled" && order.payment_status != "paid") {
            _push(`<button class="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-primary-black text-white rounded-lg hover:bg-primary-black/90 transition-colors"> Pay </button>`);
          } else {
            _push(`<!---->`);
          }
          if (order.status != "cancelled" && order.status != "delivered") {
            _push(`<button class="px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 text-primary-black rounded-lg hover:bg-gray-50 transition-colors"> Cancel </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(__props.orders, (order) => {
          _push(`<!--[--><div class="hidden lg:flex lg:items-center lg:gap-4">`);
          if (order.items && order.items.length && order.items[0].product && order.items[0].product.default_image) {
            _push(`<img${ssrRenderAttr("src", order.items[0].product.default_image)} alt="Product" class="w-12 h-12 rounded-lg object-cover flex-shrink-0">`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div><h3 class="font-semibold text-primary-black">#${ssrInterpolate(order.id)}</h3><p class="text-sm text-primary-gray">${ssrInterpolate(order.items.length == 1 ? "1 Item" : `${order.items.length} Items`)}</p></div></div><div class="hidden lg:flex lg:items-center"><span class="${ssrRenderClass(["flex items-center gap-1 text-sm", statusColor(order.status)])}"><span>${ssrInterpolate(statusIcon(order.status))}</span> ${ssrInterpolate(formatStatus(order.status))}</span></div><div class="hidden lg:flex flex-col justify-center"><p class="text-sm font-semibold text-primary-black">$${ssrInterpolate(order.total_amount)}</p>`);
          if (order.transactions && order.transactions.length) {
            _push(`<p class="text-sm text-primary-gray">••••${ssrInterpolate(order.transactions[0].card_number)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="hidden lg:flex flex-col justify-center"><p class="text-sm text-primary-black">${ssrInterpolate(formatDate(order.created_at, "DD MMM, YYYY"))}</p><p class="text-sm text-primary-gray">Order placed ${ssrInterpolate(formatDate(order.created_at, "hh:mm a"))}</p></div><div class="hidden lg:flex lg:items-center lg:justify-center lg:gap-2 lg:flex-wrap col-span-2">`);
          if (order.status != "cancelled") {
            _push(`<button class="flex items-center gap-1 !px-3 !py-1 primary-button-outline !font-normal !text-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Invoice </button>`);
          } else {
            _push(`<!---->`);
          }
          if (order.status != "cancelled") {
            _push(ssrRenderComponent(unref(link_default), {
              href: `/orders/${order.id}/track`,
              class: "flex items-center gap-1 !px-3 !py-1 primary-button !font-normal !text-sm"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Track order `);
                } else {
                  return [
                    createTextVNode(" Track order ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (order.status != "cancelled" && order.payment_status != "paid") {
            _push(`<button class="flex items-center gap-1 !px-3 !py-1 primary-button !font-normal !text-sm"> Pay </button>`);
          } else {
            _push(`<!---->`);
          }
          if (order.status != "cancelled" && order.status != "delivered") {
            _push(`<button class="flex items-center gap-1 !px-3 !py-1 primary-button-outline !font-normal !text-sm"> Cancel </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        meta: __props.meta,
        onPaginate: paginate
      }, null, _parent));
      _push(`</div></div></div></section>`);
      _push(ssrRenderComponent(CancelConfirmation, {
        show: showCancelModal.value,
        "onUpdate:show": ($event) => showCancelModal.value = $event,
        "order-id": toCancelOrderID.value,
        onCancel: handleCancelOrder
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/MyOrder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
