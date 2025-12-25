import { unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext, computed, ref, watch, onUnmounted, onMounted, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderTeleport } from "vue/server-renderer";
import { l as link_default, d as _export_sfc, h as head_default } from "./FrontendLayout-D9w5YXg3.js";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { _ as _sfc_main$4 } from "./ProductCard-tz37HsYK.js";
import { c as circleLogo } from "./circle-logo-DiIfBNPn.js";
import "@inertiajs/core";
import "lodash-es";
import "pinia";
import "vue3-toastify";
const _sfc_main$3 = {
  __name: "CategorySlider",
  __ssrInlineRender: true,
  props: {
    categories: Array
  },
  setup(__props) {
    const modules = [Navigation, Pagination, Autoplay];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(Swiper), {
        modules,
        "slides-per-view": 3,
        "space-between": 2,
        navigation: true,
        pagination: false,
        autoplay: { delay: 5e3, disableOnInteraction: false },
        class: "showcase-slider"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.categories, (slide, index) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: index,
                class: "swiper-slide"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(link_default), {
                      href: `/categories/${slide.slug}`
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img${ssrRenderAttr("src", slide.image)}${ssrRenderAttr("alt", slide.name)} class="category-card-image"${_scopeId3}><div class="category-card-overlay"${_scopeId3}><h3 class="text-xl sm:text-2xl md:text-3xl"${_scopeId3}>${ssrInterpolate(slide.name)}</h3></div>`);
                        } else {
                          return [
                            createVNode("img", {
                              src: slide.image,
                              alt: slide.name,
                              class: "category-card-image"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", { class: "category-card-overlay" }, [
                              createVNode("h3", { class: "text-xl sm:text-2xl md:text-3xl" }, toDisplayString(slide.name), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(link_default), {
                        href: `/categories/${slide.slug}`
                      }, {
                        default: withCtx(() => [
                          createVNode("img", {
                            src: slide.image,
                            alt: slide.name,
                            class: "category-card-image"
                          }, null, 8, ["src", "alt"]),
                          createVNode("div", { class: "category-card-overlay" }, [
                            createVNode("h3", { class: "text-xl sm:text-2xl md:text-3xl" }, toDisplayString(slide.name), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (slide, index) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: index,
                  class: "swiper-slide"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(link_default), {
                      href: `/categories/${slide.slug}`
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          src: slide.image,
                          alt: slide.name,
                          class: "category-card-image"
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "category-card-overlay" }, [
                          createVNode("h3", { class: "text-xl sm:text-2xl md:text-3xl" }, toDisplayString(slide.name), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["href"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/CategorySlider.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "HeroSlider",
  __ssrInlineRender: true,
  props: {
    slides: Array
  },
  setup(__props) {
    const modules = [Navigation, Pagination, Autoplay];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(Swiper), {
        modules,
        "slides-per-view": 1,
        "space-between": 0,
        navigation: false,
        pagination: { clickable: true },
        autoplay: { delay: 5e3, disableOnInteraction: false },
        class: "showcase-slider"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.slides, (slide, index) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                key: index,
                class: "swiper-slide"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="h-120 md:h-156 w-full bg-center bg-cover bg-no-repeat flex items-center justify-start text-white" style="${ssrRenderStyle(`background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.3) 100%), url(${slide.image})`)}"${_scopeId2}><div class="container"${_scopeId2}><div class="max-w-2xl"${_scopeId2}><h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight line-clamp-2"${_scopeId2}>${ssrInterpolate(slide.title)}</h1><p class="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed line-clamp-3"${_scopeId2}>${ssrInterpolate(slide.description)}</p></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: "h-120 md:h-156 w-full bg-center bg-cover bg-no-repeat flex items-center justify-start text-white",
                        style: `background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.3) 100%), url(${slide.image})`
                      }, [
                        createVNode("div", { class: "container" }, [
                          createVNode("div", { class: "max-w-2xl" }, [
                            createVNode("h1", { class: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight line-clamp-2" }, toDisplayString(slide.title), 1),
                            createVNode("p", { class: "text-lg md:text-xl text-gray-300 mb-8 leading-relaxed line-clamp-3" }, toDisplayString(slide.description), 1)
                          ])
                        ])
                      ], 4)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.slides, (slide, index) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  key: index,
                  class: "swiper-slide"
                }, {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: "h-120 md:h-156 w-full bg-center bg-cover bg-no-repeat flex items-center justify-start text-white",
                      style: `background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.3) 100%), url(${slide.image})`
                    }, [
                      createVNode("div", { class: "container" }, [
                        createVNode("div", { class: "max-w-2xl" }, [
                          createVNode("h1", { class: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight line-clamp-2" }, toDisplayString(slide.title), 1),
                          createVNode("p", { class: "text-lg md:text-xl text-gray-300 mb-8 leading-relaxed line-clamp-3" }, toDisplayString(slide.description), 1)
                        ])
                      ])
                    ], 4)
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/HeroSlider.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "WelcomeBanner",
  __ssrInlineRender: true,
  props: {
    modelValue: Boolean,
    notice: Object
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isOpen = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    });
    const targetDate = ref(null);
    let timerId = null;
    const timeLeft = ref({
      days: { value: "00", label: "Days" },
      hours: { value: "00", label: "Hours" },
      minutes: { value: "00", label: "Min" },
      seconds: { value: "00", label: "Sec" }
    });
    function setTargetDate() {
      var _a;
      if ((_a = props.notice) == null ? void 0 : _a.end_date) {
        const parsed = new Date(props.notice.end_date);
        if (!isNaN(parsed)) {
          targetDate.value = parsed;
          return;
        }
      }
      const fallback = /* @__PURE__ */ new Date();
      fallback.setDate(fallback.getDate() + 2);
      fallback.setHours(23, 59, 59, 0);
      targetDate.value = fallback;
    }
    function updateCountdown() {
      if (!targetDate.value) return;
      const now = Date.now();
      const distance = targetDate.value.getTime() - now;
      if (distance <= 0) {
        Object.values(timeLeft.value).forEach((unit) => unit.value = "00");
        clearInterval(timerId);
        timerId = null;
        return;
      }
      const days = Math.floor(distance / (1e3 * 60 * 60 * 24));
      const hours = Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
      const minutes = Math.floor(distance % (1e3 * 60 * 60) / (1e3 * 60));
      const seconds = Math.floor(distance % (1e3 * 60) / 1e3);
      timeLeft.value.days.value = days.toString().padStart(2, "0");
      timeLeft.value.hours.value = hours.toString().padStart(2, "0");
      timeLeft.value.minutes.value = minutes.toString().padStart(2, "0");
      timeLeft.value.seconds.value = seconds.toString().padStart(2, "0");
    }
    watch(
      () => {
        var _a;
        return [isOpen.value, (_a = props.notice) == null ? void 0 : _a.end_date];
      },
      ([open, endDate]) => {
        if (!open) {
          if (timerId) clearInterval(timerId);
          timerId = null;
          return;
        }
        setTargetDate();
        updateCountdown();
        if (timerId) clearInterval(timerId);
        timerId = setInterval(updateCountdown, 1e3);
      },
      { immediate: true }
    );
    onUnmounted(() => {
      if (timerId) clearInterval(timerId);
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-8" data-v-f4538c15>`);
          if (isOpen.value) {
            _push2(`<div class="grid grid-cols-12 min-h-[500px] w-full max-w-6xl overflow-hidden rounded-3xl bg-white" data-v-f4538c15><div class="col-span-12 flex flex-col justify-center bg-white p-6 md:col-span-7 md:p-10" data-v-f4538c15><div class="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-product-bg px-4 py-2 text-sm" data-v-f4538c15><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-f4538c15><path d="M3.6 7.725L0.75 15.75L8.775 12.9075M2.25 1.5H2.2575M15.75 5.25H15.7575M10.5 0.75H10.5075M15.75 14.25H15.7575M15.75 0.75L14.07 1.3125C13.0838 1.64101 12.4679 2.62144 12.6 3.6525C12.675 4.2975 12.1725 4.875 11.5125 4.875H11.2275C10.5825 4.875 10.0275 5.325 9.9075 5.955L9.75 6.75M15.75 9L15.135 8.7525C14.49 8.4975 13.77 8.9025 13.65 9.585C13.5675 10.11 13.11 10.5 12.5775 10.5H12M7.5 0.75L7.7475 1.365C8.0025 2.01 7.5975 2.73 6.915 2.85C6.39 2.925 6 3.39 6 3.9225V4.5" stroke="#0F1724" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-f4538c15></path></svg> ${ssrInterpolate(__props.notice.badge_text)}</div><h2 class="mb-4 text-2xl font-bold leading-tight text-primary-black md:text-3xl lg:text-4xl" data-v-f4538c15>${ssrInterpolate(__props.notice.title)}</h2><p class="mb-8 text-sm leading-relaxed text-primary-gray" data-v-f4538c15>${ssrInterpolate(__props.notice.description)}</p><div class="mb-8" data-v-f4538c15><div class="grid grid-cols-4 gap-3" data-v-f4538c15><!--[-->`);
            ssrRenderList(timeLeft.value, (unit, key) => {
              _push2(`<div class="rounded-lg border border-border-gray bg-white p-4 text-center" data-v-f4538c15><span class="block text-xl font-bold text-primary-black md:text-2xl" data-v-f4538c15>${ssrInterpolate(unit.value)}</span><span class="text-xs uppercase tracking-wider text-primary-gray" data-v-f4538c15>${ssrInterpolate(unit.label)}</span></div>`);
            });
            _push2(`<!--]--></div></div><p class="mt-3 text-center text-xs text-primary-gray" data-v-f4538c15>Discover our most popular items</p></div>`);
            if (__props.notice.image) {
              _push2(`<div class="relative col-span-5 hidden overflow-hidden md:block" data-v-f4538c15><img${ssrRenderAttr("src", __props.notice.image)} alt="Fashion Model wearing stylish clothing" class="h-full w-full object-cover object-center" data-v-f4538c15></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Components/WelcomeBanner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const WelcomeBanner = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f4538c15"]]);
const storyImage = "/build/assets/sustainability-banner-D2dWMiBM.jpg";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    featuredProducts: Array,
    categories: Array,
    slides: Array,
    seo: Object,
    notice: Object || null
  },
  setup(__props) {
    const props = __props;
    const showSaleModal = ref(false);
    onMounted(() => {
      if (!sessionStorage.getItem("saleModalSeen") && props.notice) {
        showSaleModal.value = true;
      }
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
      _push(ssrRenderComponent(_sfc_main$2, { slides: __props.slides }, null, _parent));
      _push(`<section class="section-padding"><div class="container"><h2 class="section-title mb-2 md:mb-4">Featured Products</h2><p class="section-subtitle">Discover our most popular items</p><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 md:mt-12 mb-8 md:mb-15"><!--[-->`);
      ssrRenderList(__props.featuredProducts, (product) => {
        _push(ssrRenderComponent(_sfc_main$4, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="flex justify-center">`);
      _push(ssrRenderComponent(unref(link_default), {
        href: "/products",
        class: "primary-button !rounded-full !px-20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`See All Products`);
          } else {
            return [
              createTextVNode("See All Products")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="absolute home-shape -left-40 w-full overflow-hidden leading-[0] -z-10"><img${ssrRenderAttr("src", unref(circleLogo))} alt=""></div></section><section class="section-padding bg-[#FFF8F3]"><div class="container"><div><h2 class="section-title mb-2 md:mb-4">Shop by Category</h2><p class="section-subtitle">Find exactly what you&#39;re looking for</p></div><div class="mt-6 md:mt-12">`);
      _push(ssrRenderComponent(_sfc_main$3, { categories: __props.categories }, null, _parent));
      _push(`</div></div></section><section class="section-padding"><div class="container"><div class="text-center mb-6 md:mb-12"><h2 class="section-title mb-2 md:mb-4">From ocean waste to your feet</h2><p class="section-subtitle max-w-2xl mx-auto mb-4 md:mb-8"> Discover how our eco-friendly sneakers are making a difference in style and sustainability. Each pair is crafted from recycled ocean plastics, turning environmental challenges into fashion-forward solutions. </p><a href="#" class="primary-button !rounded-full !px-20 inline-block">View our stories</a></div><div class="relative rounded-lg overflow-hidden"><img${ssrRenderAttr("src", unref(storyImage))} alt="Sustainable Fashion - People wearing eco-friendly clothing" class="max-h-[500px] sm:max-h-[600px] lg:max-h-[70vh] rounded-lg h-full w-full object-cover object-top"><div class="absolute inset-0 bg-primary-black/50"></div></div></div></section>`);
      _push(ssrRenderComponent(WelcomeBanner, {
        modelValue: showSaleModal.value,
        "onUpdate:modelValue": ($event) => showSaleModal.value = $event,
        notice: props.notice
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
