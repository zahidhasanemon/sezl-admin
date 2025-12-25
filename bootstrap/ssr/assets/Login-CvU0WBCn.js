import "@inertiajs/core";
import "lodash-es";
import "ofetch";
import "pinia";
import {
  createTextVNode,
  createVNode,
  ref,
  toDisplayString,
  unref,
  useSSRContext,
  withCtx,
} from "vue";
import {
  ssrIncludeBooleanAttr,
  ssrInterpolate,
  ssrRenderAttr,
  ssrRenderAttrs,
  ssrRenderClass,
  ssrRenderComponent,
  ssrRenderDynamicModel,
} from "vue/server-renderer";
import "vue3-toastify";
import { _ as _sfc_main$1 } from "./BlankLayout-BFz2goGW.js";
import {
  h as head_default,
  l as link_default,
  a as useCartStore,
  b as useForm,
  u as usePage,
} from "./FrontendLayout-D9w5YXg3.js";
import { l as logo } from "./logo-round-CdrsOhxv.js";
import { u as useApi } from "./useApi-Krv8pagn.js";
const __default__ = {
  layout: _sfc_main$1,
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    seo: Object,
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
    });
    usePage();
    useCartStore();
    const isPasswordVisible = ref(false);
    const { loading } = useApi();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(
        ssrRenderComponent(
          unref(head_default),
          null,
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(
                  `<title${_scopeId}>${ssrInterpolate(
                    __props.seo.title
                  )}</title><meta name="description"${ssrRenderAttr(
                    "content",
                    __props.seo.description
                  )}${_scopeId}>`
                );
              } else {
                return [
                  createVNode(
                    "title",
                    null,
                    toDisplayString(__props.seo.title),
                    1
                  ),
                  createVNode(
                    "meta",
                    {
                      name: "description",
                      content: __props.seo.description,
                    },
                    null,
                    8,
                    ["content"]
                  ),
                ];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(
        `<section class="bg-gray-50 min-h-screen flex items-center justify-center p-4"><div class="w-full max-w-[480px]"><div class="text-center mb-7">`
      );
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/",
            class: "logo-circle mx-auto",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(
                  `<img${ssrRenderAttr(
                    "src",
                    unref(logo)
                  )} alt="" class="size-25 mx-auto block"${_scopeId}>`
                );
              } else {
                return [
                  createVNode(
                    "img",
                    {
                      src: unref(logo),
                      alt: "",
                      class: "size-25 mx-auto block",
                    },
                    null,
                    8,
                    ["src"]
                  ),
                ];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(
        `<h1 class="text-2xl font-semibold text-primary-black">Welcome to VuexyAdmin</h1></div><div class="login-card"><h2 class="text-xl font-semibold text-primary-black mb-2">Sign in</h2><p class="text-primary-gray text-sm mb-6">Use your email and password to continue.</p><form><div class="mb-4"><label for="email" class="block text-sm font-medium text-primary-black mb-2">Email</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#11182799]"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path></svg></span><input type="email" id="email"${ssrRenderAttr(
          "value",
          unref(form).email
        )} placeholder="you@example.com" class="${ssrRenderClass([
          { "border-red-500": unref(form).errors.email },
          "form-control !pl-12",
        ])}" required></div>`
      );
      if (unref(form).errors.email) {
        _push(
          `<span class="text-red-500 text-sm">${ssrInterpolate(
            unref(form).errors.email
          )}</span>`
        );
      } else {
        _push(`<!---->`);
      }
      _push(
        `</div><div class="mb-4"><label for="password" class="block text-sm font-medium text-primary-black mb-2">Password</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#11182799]"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 7H12V5C12 2.79 10.21 1 8 1C5.79 1 4 2.79 4 5V7H3.5C2.67 7 2 7.67 2 8.5V13.5C2 14.33 2.67 15 3.5 15H12.5C13.33 15 14 14.33 14 13.5V8.5C14 7.67 13.33 7 12.5 7ZM8 11.5C7.17 11.5 6.5 10.83 6.5 10C6.5 9.17 7.17 8.5 8 8.5C8.83 8.5 9.5 9.17 9.5 10C9.5 10.83 8.83 11.5 8 11.5ZM10.1 7H5.9V5C5.9 3.84 6.84 2.9 8 2.9C9.16 2.9 10.1 3.84 10.1 5V7Z" fill="currentColor"></path></svg></span><input${ssrRenderAttr(
          "type",
          isPasswordVisible.value ? "text" : "password"
        )} id="password" placeholder="********"${ssrRenderDynamicModel(
          isPasswordVisible.value ? "text" : "password",
          unref(form).password,
          null
        )} class="${ssrRenderClass([
          { "border-red-500": unref(form).errors.password },
          "form-control !pl-12",
        ])}" required><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#11182799] hover:text-primary-black">`
      );
      if (isPasswordVisible.value) {
        _push(
          `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
        );
      } else {
        _push(
          `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path><path d="M3 3l18 18"></path></svg>`
        );
      }
      _push(`</button></div>`);
      if (unref(form).errors.password) {
        _push(
          `<span class="text-red-500 text-sm">${ssrInterpolate(
            unref(form).errors.password
          )}</span>`
        );
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="text-right mb-3">`);
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/forget-password",
            class: "text-sm font-medium text-primary-black hover:underline",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Forget password?`);
              } else {
                return [createTextVNode("Forget password?")];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(
        `</div><button type="submit" class="primary-button w-full"${
          ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""
        }>Sign in</button><button type="button" class="primary-button-outline w-full mt-4 flex items-center justify-center gap-2"><svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"></path><path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"></path><path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path><path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"></path></svg> Sign in with Google </button></form></div><p class="text-center text-primary-gray text-sm"> Don&#39;t have an account? `
      );
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/signup",
            class: "font-semibold text-primary-black hover:underline",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Sign up`);
              } else {
                return [createTextVNode("Sign up")];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(`</p></div></section></div>`);
    };
  },
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/frontend/Pages/Login.vue"
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export { _sfc_main as default };
