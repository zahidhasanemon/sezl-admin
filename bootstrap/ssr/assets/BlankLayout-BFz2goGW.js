import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { u as usePage } from "./FrontendLayout-D9w5YXg3.js";
import { useSSRContext } from "vue";
const _sfc_main = {
  __name: "BlankLayout",
  __ssrInlineRender: true,
  setup(__props) {
    usePage();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/frontend/Layouts/BlankLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
