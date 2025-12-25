import {
  config as config$1,
  createHeadManager,
  formDataToObject,
  getScrollableParent,
  isUrlMethodPair,
  mergeDataIntoQueryString,
  resetFormFields,
  router,
  setupProgress,
  shouldIntercept,
  shouldNavigate,
  useInfiniteScroll,
} from "@inertiajs/core";
import { cloneDeep, escape, get, has, isEqual, set } from "lodash-es";
import { defineStore } from "pinia";
import {
  computed,
  createBlock,
  createCommentVNode,
  createSSRApp,
  createTextVNode,
  createVNode,
  defineComponent,
  Fragment,
  h,
  markRaw,
  mergeProps,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  openBlock,
  reactive,
  ref,
  shallowRef,
  toDisplayString,
  unref,
  useSSRContext,
  watch,
  withCtx,
} from "vue";
import {
  ssrInterpolate,
  ssrRenderAttr,
  ssrRenderAttrs,
  ssrRenderClass,
  ssrRenderComponent,
  ssrRenderList,
  ssrRenderSlot,
  ssrRenderStyle,
} from "vue/server-renderer";
import "vue3-toastify";
var remember = {
  created() {
    if (!this.$options.remember) {
      return;
    }
    if (Array.isArray(this.$options.remember)) {
      this.$options.remember = { data: this.$options.remember };
    }
    if (typeof this.$options.remember === "string") {
      this.$options.remember = { data: [this.$options.remember] };
    }
    if (typeof this.$options.remember.data === "string") {
      this.$options.remember = { data: [this.$options.remember.data] };
    }
    const rememberKey =
      this.$options.remember.key instanceof Function
        ? this.$options.remember.key.call(this)
        : this.$options.remember.key;
    const restored = router.restore(rememberKey);
    const rememberable = this.$options.remember.data.filter((key2) => {
      return !(
        this[key2] !== null &&
        typeof this[key2] === "object" &&
        this[key2].__rememberable === false
      );
    });
    const hasCallbacks = (key2) => {
      return (
        this[key2] !== null &&
        typeof this[key2] === "object" &&
        typeof this[key2].__remember === "function" &&
        typeof this[key2].__restore === "function"
      );
    };
    rememberable.forEach((key2) => {
      if (
        this[key2] !== void 0 &&
        restored !== void 0 &&
        restored[key2] !== void 0
      ) {
        hasCallbacks(key2)
          ? this[key2].__restore(restored[key2])
          : (this[key2] = restored[key2]);
      }
      this.$watch(
        key2,
        () => {
          router.remember(
            rememberable.reduce(
              (data, key3) => ({
                ...data,
                [key3]: cloneDeep(
                  hasCallbacks(key3) ? this[key3].__remember() : this[key3]
                ),
              }),
              {}
            ),
            rememberKey
          );
        },
        { immediate: true, deep: true }
      );
    });
  },
};
var remember_default = remember;
function useForm(rememberKeyOrData, maybeData) {
  const rememberKey =
    typeof rememberKeyOrData === "string" ? rememberKeyOrData : null;
  const data =
    (typeof rememberKeyOrData === "string" ? maybeData : rememberKeyOrData) ??
    {};
  const restored = rememberKey ? router.restore(rememberKey) : null;
  let defaults =
    typeof data === "function" ? cloneDeep(data()) : cloneDeep(data);
  let cancelToken = null;
  let recentlySuccessfulTimeoutId;
  let transform = (data2) => data2;
  let defaultsCalledInOnSuccess = false;
  const form = reactive({
    ...(restored ? restored.data : cloneDeep(defaults)),
    isDirty: false,
    errors: restored ? restored.errors : {},
    hasErrors: false,
    processing: false,
    progress: null,
    wasSuccessful: false,
    recentlySuccessful: false,
    data() {
      return Object.keys(defaults).reduce((carry, key2) => {
        return set(carry, key2, get(this, key2));
      }, {});
    },
    transform(callback) {
      transform = callback;
      return this;
    },
    defaults(fieldOrFields, maybeValue) {
      if (typeof data === "function") {
        throw new Error(
          "You cannot call `defaults()` when using a function to define your form data."
        );
      }
      defaultsCalledInOnSuccess = true;
      if (typeof fieldOrFields === "undefined") {
        defaults = cloneDeep(this.data());
        this.isDirty = false;
      } else {
        defaults =
          typeof fieldOrFields === "string"
            ? set(cloneDeep(defaults), fieldOrFields, maybeValue)
            : Object.assign({}, cloneDeep(defaults), fieldOrFields);
      }
      return this;
    },
    reset(...fields) {
      const resolvedData =
        typeof data === "function" ? cloneDeep(data()) : cloneDeep(defaults);
      const clonedData = cloneDeep(resolvedData);
      if (fields.length === 0) {
        defaults = clonedData;
        Object.assign(this, resolvedData);
      } else {
        fields
          .filter((key2) => has(clonedData, key2))
          .forEach((key2) => {
            set(defaults, key2, get(clonedData, key2));
            set(this, key2, get(resolvedData, key2));
          });
      }
      return this;
    },
    setError(fieldOrFields, maybeValue) {
      Object.assign(
        this.errors,
        typeof fieldOrFields === "string"
          ? { [fieldOrFields]: maybeValue }
          : fieldOrFields
      );
      this.hasErrors = Object.keys(this.errors).length > 0;
      return this;
    },
    clearErrors(...fields) {
      this.errors = Object.keys(this.errors).reduce(
        (carry, field) => ({
          ...carry,
          ...(fields.length > 0 && !fields.includes(field)
            ? { [field]: this.errors[field] }
            : {}),
        }),
        {}
      );
      this.hasErrors = Object.keys(this.errors).length > 0;
      return this;
    },
    resetAndClearErrors(...fields) {
      this.reset(...fields);
      this.clearErrors(...fields);
      return this;
    },
    submit(...args) {
      const objectPassed = args[0] !== null && typeof args[0] === "object";
      const method = objectPassed ? args[0].method : args[0];
      const url = objectPassed ? args[0].url : args[1];
      const options = (objectPassed ? args[1] : args[2]) ?? {};
      defaultsCalledInOnSuccess = false;
      const _options = {
        ...options,
        onCancelToken: (token) => {
          cancelToken = token;
          if (options.onCancelToken) {
            return options.onCancelToken(token);
          }
        },
        onBefore: (visit) => {
          this.wasSuccessful = false;
          this.recentlySuccessful = false;
          clearTimeout(recentlySuccessfulTimeoutId);
          if (options.onBefore) {
            return options.onBefore(visit);
          }
        },
        onStart: (visit) => {
          this.processing = true;
          if (options.onStart) {
            return options.onStart(visit);
          }
        },
        onProgress: (event) => {
          this.progress = event;
          if (options.onProgress) {
            return options.onProgress(event);
          }
        },
        onSuccess: async (page2) => {
          this.processing = false;
          this.progress = null;
          this.clearErrors();
          this.wasSuccessful = true;
          this.recentlySuccessful = true;
          recentlySuccessfulTimeoutId = setTimeout(
            () => (this.recentlySuccessful = false),
            config.get("form.recentlySuccessfulDuration")
          );
          const onSuccess = options.onSuccess
            ? await options.onSuccess(page2)
            : null;
          if (!defaultsCalledInOnSuccess) {
            defaults = cloneDeep(this.data());
            this.isDirty = false;
          }
          return onSuccess;
        },
        onError: (errors) => {
          this.processing = false;
          this.progress = null;
          this.clearErrors().setError(errors);
          if (options.onError) {
            return options.onError(errors);
          }
        },
        onCancel: () => {
          this.processing = false;
          this.progress = null;
          if (options.onCancel) {
            return options.onCancel();
          }
        },
        onFinish: (visit) => {
          this.processing = false;
          this.progress = null;
          cancelToken = null;
          if (options.onFinish) {
            return options.onFinish(visit);
          }
        },
      };
      const transformedData = transform(this.data());
      if (method === "delete") {
        router.delete(url, { ..._options, data: transformedData });
      } else {
        router[method](url, transformedData, _options);
      }
    },
    get(url, options) {
      this.submit("get", url, options);
    },
    post(url, options) {
      this.submit("post", url, options);
    },
    put(url, options) {
      this.submit("put", url, options);
    },
    patch(url, options) {
      this.submit("patch", url, options);
    },
    delete(url, options) {
      this.submit("delete", url, options);
    },
    cancel() {
      if (cancelToken) {
        cancelToken.cancel();
      }
    },
    __rememberable: rememberKey === null,
    __remember() {
      return { data: this.data(), errors: this.errors };
    },
    __restore(restored2) {
      Object.assign(this, restored2.data);
      this.setError(restored2.errors);
    },
  });
  watch(
    form,
    (newValue) => {
      form.isDirty = !isEqual(form.data(), defaults);
      if (rememberKey) {
        router.remember(cloneDeep(newValue.__remember()), rememberKey);
      }
    },
    { immediate: true, deep: true }
  );
  return form;
}
var component = ref(void 0);
var page = ref();
var layout = shallowRef(null);
var key = ref(void 0);
var headManager;
var App = defineComponent({
  name: "Inertia",
  props: {
    initialPage: {
      type: Object,
      required: true,
    },
    initialComponent: {
      type: Object,
      required: false,
    },
    resolveComponent: {
      type: Function,
      required: false,
    },
    titleCallback: {
      type: Function,
      required: false,
      default: (title) => title,
    },
    onHeadUpdate: {
      type: Function,
      required: false,
      default: () => () => {},
    },
  },
  setup({
    initialPage,
    initialComponent,
    resolveComponent,
    titleCallback,
    onHeadUpdate,
  }) {
    component.value = initialComponent ? markRaw(initialComponent) : void 0;
    page.value = initialPage;
    key.value = void 0;
    const isServer = typeof window === "undefined";
    headManager = createHeadManager(
      isServer,
      titleCallback || ((title) => title),
      onHeadUpdate || (() => {})
    );
    if (!isServer) {
      router.init({
        initialPage,
        resolveComponent,
        swapComponent: async (options) => {
          component.value = markRaw(options.component);
          page.value = options.page;
          key.value = options.preserveState ? key.value : Date.now();
        },
      });
      router.on("navigate", () => headManager.forceUpdate());
    }
    return () => {
      if (component.value) {
        component.value.inheritAttrs = !!component.value.inheritAttrs;
        const child = h(component.value, {
          ...page.value.props,
          key: key.value,
        });
        if (layout.value) {
          component.value.layout = layout.value;
          layout.value = null;
        }
        if (component.value.layout) {
          if (typeof component.value.layout === "function") {
            return component.value.layout(h, child);
          }
          return (
            Array.isArray(component.value.layout)
              ? component.value.layout
              : [component.value.layout]
          )
            .concat(child)
            .reverse()
            .reduce((child2, layout2) => {
              layout2.inheritAttrs = !!layout2.inheritAttrs;
              return h(layout2, { ...page.value.props }, () => child2);
            });
        }
        return child;
      }
    };
  },
});
var app_default = App;
var plugin = {
  install(app) {
    router.form = useForm;
    Object.defineProperty(app.config.globalProperties, "$inertia", {
      get: () => router,
    });
    Object.defineProperty(app.config.globalProperties, "$page", {
      get: () => page.value,
    });
    Object.defineProperty(app.config.globalProperties, "$headManager", {
      get: () => headManager,
    });
    app.mixin(remember_default);
  },
};
function usePage() {
  return reactive({
    props: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.props;
    }),
    url: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.url;
    }),
    component: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.component;
    }),
    version: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.version;
    }),
    clearHistory: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.clearHistory;
    }),
    deferredProps: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.deferredProps;
    }),
    mergeProps: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.mergeProps;
    }),
    prependProps: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.prependProps;
    }),
    deepMergeProps: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.deepMergeProps;
    }),
    matchPropsOn: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.matchPropsOn;
    }),
    rememberedState: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.rememberedState;
    }),
    encryptHistory: computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.encryptHistory;
    }),
  });
}
async function createInertiaApp({
  id = "app",
  resolve,
  setup,
  title,
  progress: progress2 = {},
  page: page2,
  render,
  defaults = {},
}) {
  config.replace(defaults);
  const isServer = typeof window === "undefined";
  const el = isServer ? null : document.getElementById(id);
  const initialPage =
    page2 || JSON.parse((el == null ? void 0 : el.dataset.page) || "{}");
  const resolveComponent = (name) =>
    Promise.resolve(resolve(name)).then((module) => module.default || module);
  let head = [];
  const vueApp = await Promise.all([
    resolveComponent(initialPage.component),
    router.decryptHistory().catch(() => {}),
  ]).then(([initialComponent]) => {
    const props = {
      initialPage,
      initialComponent,
      resolveComponent,
      titleCallback: title,
    };
    if (isServer) {
      const ssrSetup = setup;
      return ssrSetup({
        el: null,
        App: app_default,
        props: { ...props, onHeadUpdate: (elements) => (head = elements) },
        plugin,
      });
    }
    const csrSetup = setup;
    return csrSetup({
      el,
      App: app_default,
      props,
      plugin,
    });
  });
  if (!isServer && progress2) {
    setupProgress(progress2);
  }
  if (isServer && render) {
    const body = await render(
      createSSRApp({
        render: () =>
          h("div", {
            id,
            "data-page": JSON.stringify(initialPage),
            innerHTML: vueApp ? render(vueApp) : "",
          }),
      })
    );
    return { head, body };
  }
}
defineComponent({
  name: "Deferred",
  props: {
    data: {
      type: [String, Array],
      required: true,
    },
  },
  render() {
    var _a, _b;
    const keys = Array.isArray(this.$props.data)
      ? this.$props.data
      : [this.$props.data];
    if (!this.$slots.fallback) {
      throw new Error("`<Deferred>` requires a `<template #fallback>` slot");
    }
    return keys.every((key2) => this.$page.props[key2] !== void 0)
      ? (_b = (_a = this.$slots).default) == null
        ? void 0
        : _b.call(_a)
      : this.$slots.fallback();
  },
});
var noop = () => void 0;
defineComponent({
  name: "Form",
  slots: Object,
  props: {
    action: {
      type: [String, Object],
      default: "",
    },
    method: {
      type: String,
      default: "get",
    },
    headers: {
      type: Object,
      default: () => ({}),
    },
    queryStringArrayFormat: {
      type: String,
      default: "brackets",
    },
    errorBag: {
      type: [String, null],
      default: null,
    },
    showProgress: {
      type: Boolean,
      default: true,
    },
    transform: {
      type: Function,
      default: (data) => data,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    resetOnError: {
      type: [Boolean, Array],
      default: false,
    },
    resetOnSuccess: {
      type: [Boolean, Array],
      default: false,
    },
    setDefaultsOnSuccess: {
      type: Boolean,
      default: false,
    },
    onCancelToken: {
      type: Function,
      default: noop,
    },
    onBefore: {
      type: Function,
      default: noop,
    },
    onStart: {
      type: Function,
      default: noop,
    },
    onProgress: {
      type: Function,
      default: noop,
    },
    onFinish: {
      type: Function,
      default: noop,
    },
    onCancel: {
      type: Function,
      default: noop,
    },
    onSuccess: {
      type: Function,
      default: noop,
    },
    onError: {
      type: Function,
      default: noop,
    },
    onSubmitComplete: {
      type: Function,
      default: noop,
    },
    disableWhileProcessing: {
      type: Boolean,
      default: false,
    },
    invalidateCacheTags: {
      type: [String, Array],
      default: () => [],
    },
  },
  setup(props, { slots, attrs, expose }) {
    const form = useForm({});
    const formElement = ref();
    const method = computed(() =>
      isUrlMethodPair(props.action)
        ? props.action.method
        : props.method.toLowerCase()
    );
    const isDirty = ref(false);
    const defaultData = ref(new FormData());
    const onFormUpdate = (event) => {
      isDirty.value =
        event.type === "reset"
          ? false
          : !isEqual(getData(), formDataToObject(defaultData.value));
    };
    const formEvents = ["input", "change", "reset"];
    onMounted(() => {
      defaultData.value = getFormData();
      formEvents.forEach((e) =>
        formElement.value.addEventListener(e, onFormUpdate)
      );
    });
    onBeforeUnmount(() =>
      formEvents.forEach((e) => {
        var _a;
        return (_a = formElement.value) == null
          ? void 0
          : _a.removeEventListener(e, onFormUpdate);
      })
    );
    const getFormData = () => new FormData(formElement.value);
    const getData = () => formDataToObject(getFormData());
    const submit = () => {
      const [action, data] = mergeDataIntoQueryString(
        method.value,
        isUrlMethodPair(props.action) ? props.action.url : props.action,
        getData(),
        props.queryStringArrayFormat
      );
      const maybeReset = (resetOption) => {
        if (!resetOption) {
          return;
        }
        if (resetOption === true) {
          reset();
        } else if (resetOption.length > 0) {
          reset(...resetOption);
        }
      };
      const submitOptions = {
        headers: props.headers,
        errorBag: props.errorBag,
        showProgress: props.showProgress,
        invalidateCacheTags: props.invalidateCacheTags,
        onCancelToken: props.onCancelToken,
        onBefore: props.onBefore,
        onStart: props.onStart,
        onProgress: props.onProgress,
        onFinish: props.onFinish,
        onCancel: props.onCancel,
        onSuccess: (...args) => {
          var _a, _b;
          (_a = props.onSuccess) == null ? void 0 : _a.call(props, ...args);
          (_b = props.onSubmitComplete) == null
            ? void 0
            : _b.call(props, exposed);
          maybeReset(props.resetOnSuccess);
          if (props.setDefaultsOnSuccess === true) {
            defaults();
          }
        },
        onError: (...args) => {
          var _a;
          (_a = props.onError) == null ? void 0 : _a.call(props, ...args);
          maybeReset(props.resetOnError);
        },
        ...props.options,
      };
      form
        .transform(() => props.transform(data))
        .submit(method.value, action, submitOptions);
    };
    const reset = (...fields) => {
      resetFormFields(formElement.value, defaultData.value, fields);
    };
    const resetAndClearErrors = (...fields) => {
      form.clearErrors(...fields);
      reset(...fields);
    };
    const defaults = () => {
      defaultData.value = getFormData();
      isDirty.value = false;
    };
    const exposed = {
      get errors() {
        return form.errors;
      },
      get hasErrors() {
        return form.hasErrors;
      },
      get processing() {
        return form.processing;
      },
      get progress() {
        return form.progress;
      },
      get wasSuccessful() {
        return form.wasSuccessful;
      },
      get recentlySuccessful() {
        return form.recentlySuccessful;
      },
      clearErrors: (...fields) => form.clearErrors(...fields),
      resetAndClearErrors,
      setError: (fieldOrFields, maybeValue) =>
        form.setError(
          typeof fieldOrFields === "string"
            ? { [fieldOrFields]: maybeValue }
            : fieldOrFields
        ),
      get isDirty() {
        return isDirty.value;
      },
      reset,
      submit,
      defaults,
    };
    expose(exposed);
    return () => {
      return h(
        "form",
        {
          ...attrs,
          ref: formElement,
          action: isUrlMethodPair(props.action)
            ? props.action.url
            : props.action,
          method: method.value,
          onSubmit: (event) => {
            event.preventDefault();
            submit();
          },
          inert: props.disableWhileProcessing && form.processing,
        },
        slots.default ? slots.default(exposed) : []
      );
    };
  },
});
var Head = defineComponent({
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      provider: this.$headManager.createProvider(),
    };
  },
  beforeUnmount() {
    this.provider.disconnect();
  },
  methods: {
    isUnaryTag(node) {
      return (
        typeof node.type === "string" &&
        [
          "area",
          "base",
          "br",
          "col",
          "embed",
          "hr",
          "img",
          "input",
          "keygen",
          "link",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
        ].indexOf(node.type) > -1
      );
    },
    renderTagStart(node) {
      node.props = node.props || {};
      node.props.inertia =
        node.props["head-key"] !== void 0 ? node.props["head-key"] : "";
      const attrs = Object.keys(node.props).reduce((carry, name) => {
        const value = String(node.props[name]);
        if (["key", "head-key"].includes(name)) {
          return carry;
        } else if (value === "") {
          return carry + ` ${name}`;
        } else {
          return carry + ` ${name}="${escape(value)}"`;
        }
      }, "");
      return `<${String(node.type)}${attrs}>`;
    },
    renderTagChildren(node) {
      const { children } = node;
      if (typeof children === "string") {
        return children;
      }
      if (Array.isArray(children)) {
        return children.reduce((html, child) => {
          return html + this.renderTag(child);
        }, "");
      }
      return "";
    },
    isFunctionNode(node) {
      return typeof node.type === "function";
    },
    isComponentNode(node) {
      return typeof node.type === "object";
    },
    isCommentNode(node) {
      return /(comment|cmt)/i.test(node.type.toString());
    },
    isFragmentNode(node) {
      return /(fragment|fgt|symbol\(\))/i.test(node.type.toString());
    },
    isTextNode(node) {
      return /(text|txt)/i.test(node.type.toString());
    },
    renderTag(node) {
      if (this.isTextNode(node)) {
        return String(node.children);
      } else if (this.isFragmentNode(node)) {
        return "";
      } else if (this.isCommentNode(node)) {
        return "";
      }
      let html = this.renderTagStart(node);
      if (node.children) {
        html += this.renderTagChildren(node);
      }
      if (!this.isUnaryTag(node)) {
        html += `</${String(node.type)}>`;
      }
      return html;
    },
    addTitleElement(elements) {
      if (this.title && !elements.find((tag) => tag.startsWith("<title"))) {
        elements.push(`<title inertia>${this.title}</title>`);
      }
      return elements;
    },
    renderNodes(nodes) {
      const elements = nodes
        .flatMap((node) => this.resolveNode(node))
        .map((node) => this.renderTag(node))
        .filter((node) => node);
      return this.addTitleElement(elements);
    },
    resolveNode(node) {
      if (this.isFunctionNode(node)) {
        return this.resolveNode(node.type());
      } else if (this.isComponentNode(node)) {
        console.warn(
          `Using components in the <Head> component is not supported.`
        );
        return [];
      } else if (this.isTextNode(node) && node.children) {
        return node;
      } else if (this.isFragmentNode(node) && node.children) {
        return node.children.flatMap((child) => this.resolveNode(child));
      } else if (this.isCommentNode(node)) {
        return [];
      } else {
        return node;
      }
    },
  },
  render() {
    this.provider.update(
      this.renderNodes(this.$slots.default ? this.$slots.default() : [])
    );
  },
});
var head_default = Head;
var resolveHTMLElement = (value, fallback) => {
  if (!value) {
    return fallback;
  }
  if (typeof value === "string") {
    return document.querySelector(value);
  }
  if (typeof value === "function") {
    return value() || null;
  }
  return fallback;
};
defineComponent({
  name: "InfiniteScroll",
  slots: Object,
  props: {
    data: {
      type: String,
      required: true,
    },
    buffer: {
      type: Number,
      default: 0,
    },
    onlyNext: {
      type: Boolean,
      default: false,
    },
    onlyPrevious: {
      type: Boolean,
      default: false,
    },
    as: {
      type: String,
      default: "div",
    },
    manual: {
      type: Boolean,
      default: false,
    },
    manualAfter: {
      type: Number,
      default: 0,
    },
    preserveUrl: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    autoScroll: {
      type: Boolean,
      default: void 0,
    },
    itemsElement: {
      type: [String, Function, Object],
      default: null,
    },
    startElement: {
      type: [String, Function, Object],
      default: null,
    },
    endElement: {
      type: [String, Function, Object],
      default: null,
    },
  },
  inheritAttrs: false,
  setup(props, { slots, attrs, expose }) {
    const itemsElementRef = ref(null);
    const startElementRef = ref(null);
    const endElementRef = ref(null);
    const itemsElement = computed(() =>
      resolveHTMLElement(props.itemsElement, itemsElementRef.value)
    );
    const scrollableParent = computed(() =>
      getScrollableParent(itemsElement.value)
    );
    const startElement = computed(() =>
      resolveHTMLElement(props.startElement, startElementRef.value)
    );
    const endElement = computed(() =>
      resolveHTMLElement(props.endElement, endElementRef.value)
    );
    const loadingPrevious = ref(false);
    const loadingNext = ref(false);
    const requestCount = ref(0);
    const {
      dataManager,
      elementManager,
      flush: flushInfiniteScroll,
    } = useInfiniteScroll({
      // Data
      getPropName: () => props.data,
      inReverseMode: () => props.reverse,
      shouldFetchNext: () => !props.onlyPrevious,
      shouldFetchPrevious: () => !props.onlyNext,
      shouldPreserveUrl: () => props.preserveUrl,
      // Elements
      getTriggerMargin: () => props.buffer,
      getStartElement: () => startElement.value,
      getEndElement: () => endElement.value,
      getItemsElement: () => itemsElement.value,
      getScrollableParent: () => scrollableParent.value,
      // Request callbacks
      onBeforePreviousRequest: () => (loadingPrevious.value = true),
      onBeforeNextRequest: () => (loadingNext.value = true),
      onCompletePreviousRequest: () => {
        requestCount.value = dataManager.getRequestCount();
        loadingPrevious.value = false;
      },
      onCompleteNextRequest: () => {
        requestCount.value = dataManager.getRequestCount();
        loadingNext.value = false;
      },
    });
    requestCount.value = dataManager.getRequestCount();
    const autoLoad = computed(() => !manualMode.value);
    const manualMode = computed(
      () =>
        props.manual ||
        (props.manualAfter > 0 && requestCount.value >= props.manualAfter)
    );
    const scrollToBottom = () => {
      if (scrollableParent.value) {
        scrollableParent.value.scrollTo({
          top: scrollableParent.value.scrollHeight,
          behavior: "instant",
        });
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "instant",
        });
      }
    };
    onMounted(() => {
      elementManager.setupObservers();
      elementManager.processServerLoadedElements(
        dataManager.getLastLoadedPage()
      );
      const shouldAutoScroll =
        props.autoScroll !== void 0 ? props.autoScroll : props.reverse;
      if (shouldAutoScroll) {
        scrollToBottom();
      }
      if (autoLoad.value) {
        elementManager.enableTriggers();
      }
    });
    onUnmounted(flushInfiniteScroll);
    watch(
      () => [autoLoad.value, props.onlyNext, props.onlyPrevious],
      ([enabled]) => {
        enabled
          ? elementManager.enableTriggers()
          : elementManager.disableTriggers();
      }
    );
    expose({
      fetchNext: dataManager.fetchNext,
      fetchPrevious: dataManager.fetchPrevious,
      hasPrevious: dataManager.hasPrevious,
      hasNext: dataManager.hasNext,
    });
    return () => {
      var _a, _b, _c;
      const renderElements = [];
      const sharedExposed = {
        loadingPrevious: loadingPrevious.value,
        loadingNext: loadingNext.value,
        hasPrevious: dataManager.hasPrevious(),
        hasNext: dataManager.hasNext(),
      };
      if (!props.startElement) {
        const headerAutoMode = autoLoad.value && !props.onlyNext;
        const exposedPrevious = {
          loading: loadingPrevious.value,
          fetch: dataManager.fetchPrevious,
          autoMode: headerAutoMode,
          manualMode: !headerAutoMode,
          hasMore: dataManager.hasPrevious(),
          ...sharedExposed,
        };
        renderElements.push(
          h(
            "div",
            { ref: startElementRef },
            slots.previous
              ? slots.previous(exposedPrevious)
              : loadingPrevious.value
              ? (_a = slots.loading) == null
                ? void 0
                : _a.call(slots, exposedPrevious)
              : void 0
          )
        );
      }
      renderElements.push(
        h(
          props.as,
          { ...attrs, ref: itemsElementRef },
          (_b = slots.default) == null
            ? void 0
            : _b.call(slots, {
                loading: loadingPrevious.value || loadingNext.value,
                loadingPrevious: loadingPrevious.value,
                loadingNext: loadingNext.value,
              })
        )
      );
      if (!props.endElement) {
        const footerAutoMode = autoLoad.value && !props.onlyPrevious;
        const exposedNext = {
          loading: loadingNext.value,
          fetch: dataManager.fetchNext,
          autoMode: footerAutoMode,
          manualMode: !footerAutoMode,
          hasMore: dataManager.hasNext(),
          ...sharedExposed,
        };
        renderElements.push(
          h(
            "div",
            { ref: endElementRef },
            slots.next
              ? slots.next(exposedNext)
              : loadingNext.value
              ? (_c = slots.loading) == null
                ? void 0
                : _c.call(slots, exposedNext)
              : void 0
          )
        );
      }
      return h(
        Fragment,
        {},
        props.reverse ? [...renderElements].reverse() : renderElements
      );
    };
  },
});
var noop2 = () => {};
var Link = defineComponent({
  name: "Link",
  props: {
    as: {
      type: [String, Object],
      default: "a",
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    href: {
      type: [String, Object],
      default: "",
    },
    method: {
      type: String,
      default: "get",
    },
    replace: {
      type: Boolean,
      default: false,
    },
    preserveScroll: {
      type: Boolean,
      default: false,
    },
    preserveState: {
      type: Boolean,
      default: null,
    },
    preserveUrl: {
      type: Boolean,
      default: false,
    },
    only: {
      type: Array,
      default: () => [],
    },
    except: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Object,
      default: () => ({}),
    },
    queryStringArrayFormat: {
      type: String,
      default: "brackets",
    },
    async: {
      type: Boolean,
      default: false,
    },
    prefetch: {
      type: [Boolean, String, Array],
      default: false,
    },
    cacheFor: {
      type: [Number, String, Array],
      default: 0,
    },
    onStart: {
      type: Function,
      default: noop2,
    },
    onProgress: {
      type: Function,
      default: noop2,
    },
    onFinish: {
      type: Function,
      default: noop2,
    },
    onBefore: {
      type: Function,
      default: noop2,
    },
    onCancel: {
      type: Function,
      default: noop2,
    },
    onSuccess: {
      type: Function,
      default: noop2,
    },
    onError: {
      type: Function,
      default: noop2,
    },
    onCancelToken: {
      type: Function,
      default: noop2,
    },
    onPrefetching: {
      type: Function,
      default: noop2,
    },
    onPrefetched: {
      type: Function,
      default: noop2,
    },
    cacheTags: {
      type: [String, Array],
      default: () => [],
    },
  },
  setup(props, { slots, attrs }) {
    const inFlightCount = ref(0);
    const hoverTimeout = ref();
    const prefetchModes = computed(() => {
      if (props.prefetch === true) {
        return ["hover"];
      }
      if (props.prefetch === false) {
        return [];
      }
      if (Array.isArray(props.prefetch)) {
        return props.prefetch;
      }
      return [props.prefetch];
    });
    const cacheForValue = computed(() => {
      if (props.cacheFor !== 0) {
        return props.cacheFor;
      }
      if (
        prefetchModes.value.length === 1 &&
        prefetchModes.value[0] === "click"
      ) {
        return 0;
      }
      return config.get("prefetch.cacheFor");
    });
    onMounted(() => {
      if (prefetchModes.value.includes("mount")) {
        prefetch();
      }
    });
    onUnmounted(() => {
      clearTimeout(hoverTimeout.value);
    });
    const method = computed(() =>
      isUrlMethodPair(props.href)
        ? props.href.method
        : (props.method ?? "get").toLowerCase()
    );
    const as = computed(() => {
      if (typeof props.as !== "string" || props.as.toLowerCase() !== "a") {
        return props.as;
      }
      return method.value !== "get" ? "button" : props.as.toLowerCase();
    });
    const mergeDataArray = computed(() =>
      mergeDataIntoQueryString(
        method.value,
        isUrlMethodPair(props.href) ? props.href.url : props.href,
        props.data || {},
        props.queryStringArrayFormat
      )
    );
    const href = computed(() => mergeDataArray.value[0]);
    const data = computed(() => mergeDataArray.value[1]);
    const elProps = computed(() => {
      if (as.value === "button") {
        return { type: "button" };
      }
      if (as.value === "a" || typeof as.value !== "string") {
        return { href: href.value };
      }
      return {};
    });
    const baseParams = computed(() => ({
      data: data.value,
      method: method.value,
      replace: props.replace,
      preserveScroll: props.preserveScroll,
      preserveState: props.preserveState ?? method.value !== "get",
      preserveUrl: props.preserveUrl,
      only: props.only,
      except: props.except,
      headers: props.headers,
      async: props.async,
    }));
    const visitParams = computed(() => ({
      ...baseParams.value,
      onCancelToken: props.onCancelToken,
      onBefore: props.onBefore,
      onStart: (visit) => {
        var _a;
        inFlightCount.value++;
        (_a = props.onStart) == null ? void 0 : _a.call(props, visit);
      },
      onProgress: props.onProgress,
      onFinish: (visit) => {
        var _a;
        inFlightCount.value--;
        (_a = props.onFinish) == null ? void 0 : _a.call(props, visit);
      },
      onCancel: props.onCancel,
      onSuccess: props.onSuccess,
      onError: props.onError,
    }));
    const prefetch = () => {
      router.prefetch(
        href.value,
        {
          ...baseParams.value,
          onPrefetching: props.onPrefetching,
          onPrefetched: props.onPrefetched,
        },
        {
          cacheFor: cacheForValue.value,
          cacheTags: props.cacheTags,
        }
      );
    };
    const regularEvents = {
      onClick: (event) => {
        if (shouldIntercept(event)) {
          event.preventDefault();
          router.visit(href.value, visitParams.value);
        }
      },
    };
    const prefetchHoverEvents = {
      onMouseenter: () => {
        hoverTimeout.value = setTimeout(() => {
          prefetch();
        }, 75);
      },
      onMouseleave: () => {
        clearTimeout(hoverTimeout.value);
      },
      onClick: regularEvents.onClick,
    };
    const prefetchClickEvents = {
      onMousedown: (event) => {
        if (shouldIntercept(event)) {
          event.preventDefault();
          prefetch();
        }
      },
      onKeydown: (event) => {
        if (shouldNavigate(event)) {
          event.preventDefault();
          prefetch();
        }
      },
      onMouseup: (event) => {
        event.preventDefault();
        router.visit(href.value, visitParams.value);
      },
      onKeyup: (event) => {
        if (shouldNavigate(event)) {
          event.preventDefault();
          router.visit(href.value, visitParams.value);
        }
      },
      onClick: (event) => {
        if (shouldIntercept(event)) {
          event.preventDefault();
        }
      },
    };
    return () => {
      return h(
        as.value,
        {
          ...attrs,
          ...elProps.value,
          "data-loading": inFlightCount.value > 0 ? "" : void 0,
          ...(() => {
            if (prefetchModes.value.includes("hover")) {
              return prefetchHoverEvents;
            }
            if (prefetchModes.value.includes("click")) {
              return prefetchClickEvents;
            }
            return regularEvents;
          })(),
        },
        slots
      );
    };
  },
});
var link_default = Link;
defineComponent({
  name: "WhenVisible",
  props: {
    data: {
      type: [String, Array],
    },
    params: {
      type: Object,
    },
    buffer: {
      type: Number,
      default: 0,
    },
    as: {
      type: String,
      default: "div",
    },
    always: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loaded: false,
      fetching: false,
      observer: null,
    };
  },
  unmounted() {
    var _a;
    (_a = this.observer) == null ? void 0 : _a.disconnect();
  },
  mounted() {
    this.observer = new IntersectionObserver(
      (entries) => {
        var _a;
        if (!entries[0].isIntersecting) {
          return;
        }
        if (!this.$props.always) {
          (_a = this.observer) == null ? void 0 : _a.disconnect();
        }
        if (this.fetching) {
          return;
        }
        this.fetching = true;
        const reloadParams = this.getReloadParams();
        router.reload({
          ...reloadParams,
          onStart: (e) => {
            var _a2;
            this.fetching = true;
            (_a2 = reloadParams.onStart) == null
              ? void 0
              : _a2.call(reloadParams, e);
          },
          onFinish: (e) => {
            var _a2;
            this.loaded = true;
            this.fetching = false;
            (_a2 = reloadParams.onFinish) == null
              ? void 0
              : _a2.call(reloadParams, e);
          },
        });
      },
      {
        rootMargin: `${this.$props.buffer}px`,
      }
    );
    this.observer.observe(this.$el.nextSibling);
  },
  methods: {
    getReloadParams() {
      if (this.$props.data) {
        return {
          only: Array.isArray(this.$props.data)
            ? this.$props.data
            : [this.$props.data],
        };
      }
      if (!this.$props.params) {
        throw new Error("You must provide either a `data` or `params` prop.");
      }
      return this.$props.params;
    },
  },
  render() {
    const els = [];
    if (this.$props.always || !this.loaded) {
      els.push(h(this.$props.as));
    }
    if (!this.loaded) {
      els.push(this.$slots.fallback ? this.$slots.fallback() : null);
    } else if (this.$slots.default) {
      els.push(this.$slots.default());
    }
    return els;
  },
});
var config = config$1.extend({});
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page2 = pages[p];
    if (typeof page2 === "undefined") {
      continue;
    }
    return typeof page2 === "function" ? page2() : page2;
  }
  throw new Error(`Page not found: ${path}`);
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key2, val] of props) {
    target[key2] = val;
  }
  return target;
};
const _sfc_main$3 = {
  __name: "CookieConsent",
  __ssrInlineRender: true,
  setup(__props) {
    const consentSet = ref(false);
    onMounted(() => {
      const consent = localStorage.getItem("cookie_consent");
      consentSet.value = consent !== null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (!consentSet.value) {
        _push(
          `<div${ssrRenderAttrs(
            mergeProps({ class: "cookie-banner" }, _attrs)
          )} data-v-6f98018f><p class="cookie-text" data-v-6f98018f> By clicking &quot;Accept All Cookies&quot;, you agree to the storing of cookies in your device to enhance site navigation, analyze site usage and assist in our marketing efforts. </p><div class="cookie-actions" data-v-6f98018f><button class="primary-button" data-v-6f98018f>Accept All</button><button class="ml-2 px-4 py-2 border rounded-lg transition-colors border-gray-500 hover:border-primary-black" data-v-6f98018f> Deny </button></div></div>`
        );
      } else {
        _push(`<!---->`);
      }
    };
  },
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/frontend/Components/CookieConsent.vue"
  );
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CookieConsent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [
  ["__scopeId", "data-v-6f98018f"],
]);
const mainLogo = "/build/assets/logo-main-Q1PMOcA9.png";
const defaultMessage =
  "Your premier destination for fashion and style.Discover timeless pieces that redefine elegance and bring luxury to everyday life.";
const _sfc_main$2 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const page2 = usePage();
    const site = computed(() => page2.props.site || {});
    const emailList = computed(() => {
      return site.value.email.split(",");
    });
    const contactList = computed(() => {
      return site.value.phone.split(",");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<footer${ssrRenderAttrs(
          mergeProps(
            { class: "bg-primary-black text-[#FFFFFF99] py-12 md:py-16" },
            _attrs
          )
        )}><div class="container"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"><div>`
      );
      _push(
        ssrRenderComponent(
          unref(link_default),
          { href: "/" },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(
                  `<img${ssrRenderAttr("src", unref(mainLogo))}${ssrRenderAttr(
                    "alt",
                    `${site.value.name} Logo`
                  )} class="mb-4 w-32 sm:w-40 md:w-48 lg:w-52"${_scopeId}>`
                );
              } else {
                return [
                  createVNode(
                    "img",
                    {
                      src: unref(mainLogo),
                      alt: `${site.value.name} Logo`,
                      class: "mb-4 w-32 sm:w-40 md:w-48 lg:w-52",
                    },
                    null,
                    8,
                    ["src", "alt"]
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
        `<p class="leading-relaxed">${ssrInterpolate(
          site.value.description || defaultMessage
        )}</p></div><div><h3 class="font-semibold mb-4 text-white">Quick Links</h3><ul class="space-y-2"><li>`
      );
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/about-us",
            class: "hover:text-white transition-colors",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`About Us`);
              } else {
                return [createTextVNode("About Us")];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(`</li><li>`);
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/contact-us",
            class: "hover:text-white transition-colors",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Contact Us`);
              } else {
                return [createTextVNode("Contact Us")];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(`</li><li>`);
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/faq",
            class: "hover:text-white transition-colors",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`FAQ`);
              } else {
                return [createTextVNode("FAQ")];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(`</li><li>`);
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/testimonials",
            class: "hover:text-white transition-colors",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Testimonials`);
              } else {
                return [createTextVNode("Testimonials")];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(`</li><li>`);
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/privacy",
            class: "hover:text-white transition-colors",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Privacy Policy`);
              } else {
                return [createTextVNode("Privacy Policy")];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(`</li><li>`);
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/terms",
            class: "hover:text-white transition-colors",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Terms &amp; Conditions`);
              } else {
                return [createTextVNode("Terms & Conditions")];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(
        `</li></ul></div><div><h3 class="font-semibold mb-4 text-white">Contact</h3><ul class="space-y-2">`
      );
      if (site.value.email) {
        _push(
          `<li class="flex items-start gap-3"><svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><div class="flex flex-col gap-1"><!--[-->`
        );
        ssrRenderList(emailList.value, (email) => {
          _push(
            `<a${ssrRenderAttr(
              "href",
              `mailto:${email.trim()}`
            )} class="hover:text-white transition-colors">${ssrInterpolate(
              email.trim()
            )}</a>`
          );
        });
        _push(`<!--]--></div></li>`);
      } else {
        _push(`<!---->`);
      }
      if (site.value.phone) {
        _push(
          `<li class="flex items-start gap-3"><svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg><div class="flex flex-col gap-1"><!--[-->`
        );
        ssrRenderList(contactList.value, (contact) => {
          _push(
            `<a${ssrRenderAttr(
              "href",
              `tel:${contact.trim().replace(/\s/g, "")}`
            )} class="hover:text-white transition-colors">${ssrInterpolate(
              contact.trim()
            )}</a>`
          );
        });
        _push(`<!--]--></div></li>`);
      } else {
        _push(`<!---->`);
      }
      if (site.value.address) {
        _push(
          `<li class="flex items-start gap-3"><svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span class="hover:text-white transition-colors">${ssrInterpolate(
            site.value.address
          )}</span></li>`
        );
      } else {
        _push(`<!---->`);
      }
      _push(
        `</ul></div><div><h3 class="font-semibold mb-4 text-white">Follow Us</h3><div class="flex gap-3 mb-6">`
      );
      if (site.value.facebook) {
        _push(
          `<a${ssrRenderAttr(
            "href",
            site.value.facebook
          )} target="_blank" rel="noopener noreferrer" class="size-8 rounded-full border border-[#FFFFFF99] flex items-center justify-center hover:bg-white/10 transition-colors"><svg class="size-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg></a>`
        );
      } else {
        _push(`<!---->`);
      }
      if (site.value.instagram) {
        _push(
          `<a${ssrRenderAttr(
            "href",
            site.value.instagram
          )} target="_blank" rel="noopener noreferrer" class="size-8 rounded-full border border-[#FFFFFF99] flex items-center justify-center hover:bg-white/10 transition-colors"><svg class="size-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg></a>`
        );
      } else {
        _push(`<!---->`);
      }
      if (site.value.twitter) {
        _push(
          `<a${ssrRenderAttr(
            "href",
            site.value.twitter
          )} target="_blank" rel="noopener noreferrer" class="size-8 rounded-full border border-[#FFFFFF99] flex items-center justify-center hover:bg-white/10 transition-colors"><svg class="size-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22L13.6 13.3L22.6 22H18.1L12.3 15.8L6 22H2L10.9 10.9L2.3 2H6.9L12.2 7.7L18.9 2Z"></path></svg></a>`
        );
      } else {
        _push(`<!---->`);
      }
      if (site.value.linkedin) {
        _push(
          `<a${ssrRenderAttr(
            "href",
            site.value.linkedin
          )} target="_blank" rel="noopener noreferrer" class="size-8 rounded-full border border-[#FFFFFF99] flex items-center justify-center hover:bg-white/10 transition-colors"><svg class="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a>`
        );
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (site.value.play_store_url || site.value.app_store_url) {
        _push(
          `<div><p class="font-semibold mb-4 text-white">${ssrInterpolate(
            site.value.app_download_text
          )}</p><div class="flex flex-row gap-2">`
        );
        if (site.value.play_store_url) {
          _push(
            `<a${ssrRenderAttr(
              "href",
              site.value.play_store_url
            )} target="_blank" rel="noopener noreferrer" class="inline-block hover:-translate-y-0.5 transition-transform"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" class="h-10"></a>`
          );
        } else {
          _push(`<!---->`);
        }
        if (site.value.app_store_url) {
          _push(
            `<a${ssrRenderAttr(
              "href",
              site.value.app_store_url
            )} target="_blank" rel="noopener noreferrer" class="inline-block hover:-translate-y-0.5 transition-transform"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" class="h-10"></a>`
          );
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(
        `</div></div><div class="border-t border-[#FFFFFF99] mt-12 pt-8 text-center"><p>© ${ssrInterpolate(
          /* @__PURE__ */ new Date().getFullYear()
        )} ${ssrInterpolate(
          site.value.name || "VuexyAdmin"
        )}. All rights reserved.</p></div></div></footer>`
      );
    };
  },
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/frontend/Components/Footer.vue"
  );
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart") || "[]"),
  }),
  getters: {
    count: (state) => state.items.length,
  },
  actions: {
    loadFromLocalStorage() {
      this.items = JSON.parse(localStorage.getItem("cart") || "[]");
    },
    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    addItem(item) {
      const existing = this.items.find(
        (c) =>
          c.product_id === item.product_id &&
          c.variation_id === item.variation_id
      );
      if (existing) {
        existing.quantity += item.quantity;
        existing.total_price = (
          existing.quantity * existing.final_price
        ).toFixed(2);
      } else {
        this.items.push(item);
      }
      this.saveToLocalStorage();
    },
    updateItemQuantity(id, quantity) {
      const item = this.items.find((c) => c.id === id);
      if (item) {
        item.quantity = quantity;
        item.total_price = (quantity * item.final_price).toFixed(2);
        this.saveToLocalStorage();
      }
    },
    removeItem(id) {
      this.items = this.items.filter((c) => c.id !== id);
      this.saveToLocalStorage();
    },
    removeAllItems() {
      this.items = [];
      this.saveToLocalStorage();
    },
  },
});
const _sfc_main$1 = {
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    user: Object,
  },
  setup(__props) {
    const page2 = usePage();
    const cartStore = useCartStore();
    const categories = computed(() => {
      var _a;
      return (
        ((_a = page2.props.navigation) == null ? void 0 : _a.categories) || []
      );
    });
    const wishlistCount = computed(() => {
      var _a, _b;
      return (
        ((_b = (_a = page2.props.auth) == null ? void 0 : _a.user) == null
          ? void 0
          : _b.wishlist_count) || 0
      );
    });
    const notificationCount = computed(() => {
      var _a, _b;
      return (
        ((_b = (_a = page2.props.auth) == null ? void 0 : _a.user) == null
          ? void 0
          : _b.notifications_count) || 0
      );
    });
    const cartCount = computed(() => {
      var _a;
      if ((_a = page2.props.auth) == null ? void 0 : _a.user) {
        return page2.props.auth.user.cart_count || 0;
      } else {
        return cartStore.count;
      }
    });
    const isMobileMenuOpen = ref(false);
    const searchQuery = ref("");
    onMounted(() => {
      var _a;
      searchQuery.value =
        ((_a = page2.props.appliedFilters) == null ? void 0 : _a.search) || "";
    });
    watch(
      () => {
        var _a;
        return (_a = page2.props.appliedFilters) == null ? void 0 : _a.search;
      },
      (newSearch) => {
        searchQuery.value = newSearch || "";
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<header${ssrRenderAttrs(
          mergeProps(
            { class: "bg-primary-black text-white sticky top-0 z-10" },
            _attrs
          )
        )}><nav class="container"><div class="flex items-center justify-between py-2.5 lg:py-4 gap-3">`
      );
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/",
            class: "",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(
                  `<img${ssrRenderAttr(
                    "src",
                    unref(mainLogo)
                  )} alt="VuexyAdmin" class="h-10 md:h-14"${_scopeId}>`
                );
              } else {
                return [
                  createVNode(
                    "img",
                    {
                      src: unref(mainLogo),
                      alt: "VuexyAdmin",
                      class: "h-10 md:h-14",
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
        `<div class="hidden lg:flex items-center gap-8 max-[1150px]:gap-4"><!--[-->`
      );
      ssrRenderList(categories.value, (category) => {
        _push(`<!--[-->`);
        if (category.children && category.children.length) {
          _push(
            `<div class="relative group"><button class="nav-link flex items-center gap-1 hover:text-gray-300 transition-colors">${ssrInterpolate(
              category.name
            )} <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button><div class="absolute top-full left-0 mt-2 w-56 bg-white text-primary-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"><div class="py-2"><!--[-->`
          );
          ssrRenderList(category.children, (subCategory) => {
            _push(
              ssrRenderComponent(
                unref(link_default),
                {
                  key: "child" + subCategory.id,
                  href: `/categories/${subCategory.slug}`,
                  class:
                    "block px-4 py-2 hover:bg-gray-100 transition-colors text-primary-gray",
                },
                {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`${ssrInterpolate(subCategory.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(subCategory.name), 1),
                      ];
                    }
                  }),
                  _: 2,
                },
                _parent
              )
            );
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(
            ssrRenderComponent(
              unref(link_default),
              {
                key: category.id,
                href: `/categories/${category.slug}`,
                class: "nav-link hover:text-gray-300 transition-colors",
              },
              {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(category.name)}`);
                  } else {
                    return [createTextVNode(toDisplayString(category.name), 1)];
                  }
                }),
                _: 2,
              },
              _parent
            )
          );
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]-->`);
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/products?sale=true",
            class: "nav-link hover:text-gray-300 transition-colors",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Sale `);
              } else {
                return [createTextVNode(" Sale ")];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(
        `</div><div class="hidden lg:flex items-center gap-4"><form class="relative"><input${ssrRenderAttr(
          "value",
          searchQuery.value
        )} type="text" placeholder="Search products..." class="w-52 px-4 py-2 pl-10 bg-transparent border border-white rounded-full text-white placeholder-white focus:outline-none transition-colors"><svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></form>`
      );
      if (!__props.user) {
        _push(
          ssrRenderComponent(
            unref(link_default),
            {
              href: "/login",
              class:
                "flex items-center gap-2 px-4 py-2 border border-white rounded-full hover:bg-white/10 transition-colors",
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(
                    `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg> Signup/ Signin `
                  );
                } else {
                  return [
                    (openBlock(),
                    createBlock(
                      "svg",
                      {
                        class: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                      },
                      [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                        }),
                      ]
                    )),
                    createTextVNode(" Signup/ Signin "),
                  ];
                }
              }),
              _: 1,
            },
            _parent
          )
        );
      } else {
        _push(
          `<div class="relative group"><button class="nav-link flex items-center gap-1 hover:text-gray-300 transition-colors"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" class="size-7" xmlns="http://www.w3.org/2000/svg"><path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 16 8 C 13.25 8 11 10.25 11 13 C 11 14.515625 11.707031 15.863281 12.78125 16.78125 C 10.53125 17.949219 9 20.300781 9 23 L 11 23 C 11 20.226563 13.226563 18 16 18 C 18.773438 18 21 20.226563 21 23 L 23 23 C 23 20.300781 21.46875 17.949219 19.21875 16.78125 C 20.292969 15.863281 21 14.515625 21 13 C 21 10.25 18.75 8 16 8 Z M 16 10 C 17.667969 10 19 11.332031 19 13 C 19 14.667969 17.667969 16 16 16 C 14.332031 16 13 14.667969 13 13 C 13 11.332031 14.332031 10 16 10 Z"></path></svg> ${ssrInterpolate(
            __props.user.name
          )}</button><div class="absolute top-full left-0 mt-2 w-56 bg-white text-primary-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"><div class="py-2">`
        );
        _push(
          ssrRenderComponent(
            unref(link_default),
            {
              href: "/profile",
              class:
                "block px-4 py-2 hover:bg-gray-100 transition-colors text-primary-gray",
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Profile `);
                } else {
                  return [createTextVNode(" Profile ")];
                }
              }),
              _: 1,
            },
            _parent
          )
        );
        _push(
          `<button class="w-full text-left block px-4 py-2 hover:bg-gray-100 transition-colors text-primary-gray"> Logout </button></div></div></div>`
        );
      }
      if (__props.user) {
        _push(`<!--[-->`);
        _push(
          ssrRenderComponent(
            unref(link_default),
            {
              href: "/notifications",
              class: "relative hover:text-gray-300 transition-colors mr-2",
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(
                    `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M2.59961 15.6001V6.6001C2.59961 5.0088 3.23175 3.48268 4.35697 2.35746C5.48219 1.23224 7.00831 0.600098 8.59961 0.600098C10.1909 0.600098 11.717 1.23224 12.8423 2.35746C13.9675 3.48268 14.5996 5.0088 14.5996 6.6001V15.6001M2.59961 15.6001H14.5996M2.59961 15.6001H0.599609M14.5996 15.6001H16.5996M7.59961 18.6001H9.59961" stroke="#E9E9E9" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg>`
                  );
                  if (notificationCount.value > 0) {
                    _push2(
                      `<span class="absolute top-0 right-0 inline-flex items-center justify-center p-1 min-w-5 text-xs font-bold leading-none bg-success rounded-full transform translate-x-1/2 -translate-y-1/2"${_scopeId}>${ssrInterpolate(
                        notificationCount.value
                      )}</span>`
                    );
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    (openBlock(),
                    createBlock(
                      "svg",
                      {
                        width: "18",
                        height: "20",
                        viewBox: "0 0 18 20",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                      },
                      [
                        createVNode("path", {
                          d: "M2.59961 15.6001V6.6001C2.59961 5.0088 3.23175 3.48268 4.35697 2.35746C5.48219 1.23224 7.00831 0.600098 8.59961 0.600098C10.1909 0.600098 11.717 1.23224 12.8423 2.35746C13.9675 3.48268 14.5996 5.0088 14.5996 6.6001V15.6001M2.59961 15.6001H14.5996M2.59961 15.6001H0.599609M14.5996 15.6001H16.5996M7.59961 18.6001H9.59961",
                          stroke: "#E9E9E9",
                          "stroke-width": "1.2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                        }),
                      ]
                    )),
                    notificationCount.value > 0
                      ? (openBlock(),
                        createBlock(
                          "span",
                          {
                            key: 0,
                            class:
                              "absolute top-0 right-0 inline-flex items-center justify-center p-1 min-w-5 text-xs font-bold leading-none bg-success rounded-full transform translate-x-1/2 -translate-y-1/2",
                          },
                          toDisplayString(notificationCount.value),
                          1
                        ))
                      : createCommentVNode("", true),
                  ];
                }
              }),
              _: 1,
            },
            _parent
          )
        );
        _push(
          ssrRenderComponent(
            unref(link_default),
            {
              href: "/wishlist",
              class: "hover:text-gray-300 transition-colors relative",
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(
                    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M2.35789 9.75178C1.94169 9.28752 1.61194 8.73488 1.38784 8.12607C1.16375 7.51725 1.0498 6.86445 1.05263 6.20569C1.05263 4.87334 1.52397 3.59556 2.36294 2.65344C3.20192 1.71133 4.33982 1.18205 5.52632 1.18205C7.18947 1.18205 8.64211 2.1986 9.41053 3.7116H10.5895C10.9801 2.94217 11.5454 2.30272 12.2277 1.85838C12.91 1.41404 13.6849 1.18068 14.4737 1.18205C15.6602 1.18205 16.7981 1.71133 17.6371 2.65344C18.476 3.59556 18.9474 4.87334 18.9474 6.20569C18.9474 7.58867 18.4211 8.86526 17.6421 9.75178L10 18.3215L2.35789 9.75178ZM18.3789 10.591C19.3789 9.45628 20 7.91963 20 6.20569C20 4.55984 19.4178 2.98141 18.3814 1.81762C17.345 0.653831 15.9394 2.13381e-05 14.4737 2.13381e-05C12.6316 2.13381e-05 11 1.00475 10 2.56503C9.48958 1.76893 8.81748 1.12096 8.03945 0.674877C7.26142 0.22879 6.39989 -0.00255828 5.52632 2.13381e-05C4.06065 2.13381e-05 2.65501 0.653831 1.61862 1.81762C0.582235 2.98141 0 4.55984 0 6.20569C0 7.91963 0.621053 9.45628 1.62105 10.591L10 20L18.3789 10.591Z" fill="#E9E9E9"${_scopeId}></path></svg>`
                  );
                  if (wishlistCount.value > 0) {
                    _push2(
                      `<span class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-error rounded-full"${_scopeId}>${ssrInterpolate(
                        wishlistCount.value
                      )}</span>`
                    );
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    (openBlock(),
                    createBlock(
                      "svg",
                      {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 20 20",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                      },
                      [
                        createVNode("path", {
                          d: "M2.35789 9.75178C1.94169 9.28752 1.61194 8.73488 1.38784 8.12607C1.16375 7.51725 1.0498 6.86445 1.05263 6.20569C1.05263 4.87334 1.52397 3.59556 2.36294 2.65344C3.20192 1.71133 4.33982 1.18205 5.52632 1.18205C7.18947 1.18205 8.64211 2.1986 9.41053 3.7116H10.5895C10.9801 2.94217 11.5454 2.30272 12.2277 1.85838C12.91 1.41404 13.6849 1.18068 14.4737 1.18205C15.6602 1.18205 16.7981 1.71133 17.6371 2.65344C18.476 3.59556 18.9474 4.87334 18.9474 6.20569C18.9474 7.58867 18.4211 8.86526 17.6421 9.75178L10 18.3215L2.35789 9.75178ZM18.3789 10.591C19.3789 9.45628 20 7.91963 20 6.20569C20 4.55984 19.4178 2.98141 18.3814 1.81762C17.345 0.653831 15.9394 2.13381e-05 14.4737 2.13381e-05C12.6316 2.13381e-05 11 1.00475 10 2.56503C9.48958 1.76893 8.81748 1.12096 8.03945 0.674877C7.26142 0.22879 6.39989 -0.00255828 5.52632 2.13381e-05C4.06065 2.13381e-05 2.65501 0.653831 1.61862 1.81762C0.582235 2.98141 0 4.55984 0 6.20569C0 7.91963 0.621053 9.45628 1.62105 10.591L10 20L18.3789 10.591Z",
                          fill: "#E9E9E9",
                        }),
                      ]
                    )),
                    wishlistCount.value > 0
                      ? (openBlock(),
                        createBlock(
                          "span",
                          {
                            key: 0,
                            class:
                              "absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-error rounded-full",
                          },
                          toDisplayString(wishlistCount.value),
                          1
                        ))
                      : createCommentVNode("", true),
                  ];
                }
              }),
              _: 1,
            },
            _parent
          )
        );
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/cart",
            class: "hover:text-gray-300 transition-colors relative",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(
                  `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z" stroke="#E9E9E9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path><path d="M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z" stroke="#E9E9E9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path><path d="M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348" stroke="#E9E9E9" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg>`
                );
                if (cartCount.value > 0) {
                  _push2(
                    `<span class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-error rounded-full"${_scopeId}>${ssrInterpolate(
                      cartCount.value
                    )}</span>`
                  );
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  (openBlock(),
                  createBlock(
                    "svg",
                    {
                      width: "22",
                      height: "22",
                      viewBox: "0 0 22 22",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                    [
                      createVNode("path", {
                        d: "M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z",
                        stroke: "#E9E9E9",
                        "stroke-width": "1.4",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                      }),
                      createVNode("path", {
                        d: "M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z",
                        stroke: "#E9E9E9",
                        "stroke-width": "1.4",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                      }),
                      createVNode("path", {
                        d: "M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348",
                        stroke: "#E9E9E9",
                        "stroke-width": "1.2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                      }),
                    ]
                  )),
                  cartCount.value > 0
                    ? (openBlock(),
                      createBlock(
                        "span",
                        {
                          key: 0,
                          class:
                            "absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-error rounded-full",
                        },
                        toDisplayString(cartCount.value),
                        1
                      ))
                    : createCommentVNode("", true),
                ];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(`</div><div class="flex lg:hidden items-center gap-3">`);
      if (__props.user) {
        _push(`<!--[-->`);
        _push(
          ssrRenderComponent(
            unref(link_default),
            {
              href: "/notifications",
              class: "relative hover:text-gray-300 transition-colors mr-2",
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(
                    `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M2.59961 15.6001V6.6001C2.59961 5.0088 3.23175 3.48268 4.35697 2.35746C5.48219 1.23224 7.00831 0.600098 8.59961 0.600098C10.1909 0.600098 11.717 1.23224 12.8423 2.35746C13.9675 3.48268 14.5996 5.0088 14.5996 6.6001V15.6001M2.59961 15.6001H14.5996M2.59961 15.6001H0.599609M14.5996 15.6001H16.5996M7.59961 18.6001H9.59961" stroke="#E9E9E9" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg>`
                  );
                  if (notificationCount.value > 0) {
                    _push2(
                      `<span class="absolute top-0 right-0 inline-flex items-center justify-center p-1 min-w-5 text-xs font-bold leading-none bg-success rounded-full transform translate-x-1/2 -translate-y-1/2"${_scopeId}>${ssrInterpolate(
                        notificationCount.value
                      )}</span>`
                    );
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    (openBlock(),
                    createBlock(
                      "svg",
                      {
                        width: "18",
                        height: "20",
                        viewBox: "0 0 18 20",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                      },
                      [
                        createVNode("path", {
                          d: "M2.59961 15.6001V6.6001C2.59961 5.0088 3.23175 3.48268 4.35697 2.35746C5.48219 1.23224 7.00831 0.600098 8.59961 0.600098C10.1909 0.600098 11.717 1.23224 12.8423 2.35746C13.9675 3.48268 14.5996 5.0088 14.5996 6.6001V15.6001M2.59961 15.6001H14.5996M2.59961 15.6001H0.599609M14.5996 15.6001H16.5996M7.59961 18.6001H9.59961",
                          stroke: "#E9E9E9",
                          "stroke-width": "1.2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                        }),
                      ]
                    )),
                    notificationCount.value > 0
                      ? (openBlock(),
                        createBlock(
                          "span",
                          {
                            key: 0,
                            class:
                              "absolute top-0 right-0 inline-flex items-center justify-center p-1 min-w-5 text-xs font-bold leading-none bg-success rounded-full transform translate-x-1/2 -translate-y-1/2",
                          },
                          toDisplayString(notificationCount.value),
                          1
                        ))
                      : createCommentVNode("", true),
                  ];
                }
              }),
              _: 1,
            },
            _parent
          )
        );
        _push(
          ssrRenderComponent(
            unref(link_default),
            {
              href: "/wishlist",
              class: "hover:text-gray-300 transition-colors",
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(
                    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M2.35789 9.75178C1.94169 9.28752 1.61194 8.73488 1.38784 8.12607C1.16375 7.51725 1.0498 6.86445 1.05263 6.20569C1.05263 4.87334 1.52397 3.59556 2.36294 2.65344C3.20192 1.71133 4.33982 1.18205 5.52632 1.18205C7.18947 1.18205 8.64211 2.1986 9.41053 3.7116H10.5895C10.9801 2.94217 11.5454 2.30272 12.2277 1.85838C12.91 1.41404 13.6849 1.18068 14.4737 1.18205C15.6602 1.18205 16.7981 1.71133 17.6371 2.65344C18.476 3.59556 18.9474 4.87334 18.9474 6.20569C18.9474 7.58867 18.4211 8.86526 17.6421 9.75178L10 18.3215L2.35789 9.75178ZM18.3789 10.591C19.3789 9.45628 20 7.91963 20 6.20569C20 4.55984 19.4178 2.98141 18.3814 1.81762C17.345 0.653831 15.9394 2.13381e-05 14.4737 2.13381e-05C12.6316 2.13381e-05 11 1.00475 10 2.56503C9.48958 1.76893 8.81748 1.12096 8.03945 0.674877C7.26142 0.22879 6.39989 -0.00255828 5.52632 2.13381e-05C4.06065 2.13381e-05 2.65501 0.653831 1.61862 1.81762C0.582235 2.98141 0 4.55984 0 6.20569C0 7.91963 0.621053 9.45628 1.62105 10.591L10 20L18.3789 10.591Z" fill="#E9E9E9"${_scopeId}></path></svg>`
                  );
                } else {
                  return [
                    (openBlock(),
                    createBlock(
                      "svg",
                      {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 20 20",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                      },
                      [
                        createVNode("path", {
                          d: "M2.35789 9.75178C1.94169 9.28752 1.61194 8.73488 1.38784 8.12607C1.16375 7.51725 1.0498 6.86445 1.05263 6.20569C1.05263 4.87334 1.52397 3.59556 2.36294 2.65344C3.20192 1.71133 4.33982 1.18205 5.52632 1.18205C7.18947 1.18205 8.64211 2.1986 9.41053 3.7116H10.5895C10.9801 2.94217 11.5454 2.30272 12.2277 1.85838C12.91 1.41404 13.6849 1.18068 14.4737 1.18205C15.6602 1.18205 16.7981 1.71133 17.6371 2.65344C18.476 3.59556 18.9474 4.87334 18.9474 6.20569C18.9474 7.58867 18.4211 8.86526 17.6421 9.75178L10 18.3215L2.35789 9.75178ZM18.3789 10.591C19.3789 9.45628 20 7.91963 20 6.20569C20 4.55984 19.4178 2.98141 18.3814 1.81762C17.345 0.653831 15.9394 2.13381e-05 14.4737 2.13381e-05C12.6316 2.13381e-05 11 1.00475 10 2.56503C9.48958 1.76893 8.81748 1.12096 8.03945 0.674877C7.26142 0.22879 6.39989 -0.00255828 5.52632 2.13381e-05C4.06065 2.13381e-05 2.65501 0.653831 1.61862 1.81762C0.582235 2.98141 0 4.55984 0 6.20569C0 7.91963 0.621053 9.45628 1.62105 10.591L10 20L18.3789 10.591Z",
                          fill: "#E9E9E9",
                        }),
                      ]
                    )),
                  ];
                }
              }),
              _: 1,
            },
            _parent
          )
        );
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/cart",
            class: "hover:text-gray-300 transition-colors",
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(
                  `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z" stroke="#E9E9E9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path><path d="M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z" stroke="#E9E9E9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path><path d="M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348" stroke="#E9E9E9" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg>`
                );
              } else {
                return [
                  (openBlock(),
                  createBlock(
                    "svg",
                    {
                      width: "22",
                      height: "22",
                      viewBox: "0 0 22 22",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                    [
                      createVNode("path", {
                        d: "M6.53804 20.6001C7.08923 20.6001 7.53605 20.1513 7.53605 19.5977C7.53605 19.044 7.08923 18.5952 6.53804 18.5952C5.98686 18.5952 5.54004 19.044 5.54004 19.5977C5.54004 20.1513 5.98686 20.6001 6.53804 20.6001Z",
                        stroke: "#E9E9E9",
                        "stroke-width": "1.4",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                      }),
                      createVNode("path", {
                        d: "M17.5166 20.6001C18.0677 20.6001 18.5146 20.1513 18.5146 19.5977C18.5146 19.044 18.0677 18.5952 17.5166 18.5952C16.9654 18.5952 16.5186 19.044 16.5186 19.5977C16.5186 20.1513 16.9654 20.6001 17.5166 20.6001Z",
                        stroke: "#E9E9E9",
                        "stroke-width": "1.4",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                      }),
                      createVNode("path", {
                        d: "M0.599609 0.600098H2.59562L5.25031 13.0507C5.34769 13.5067 5.60028 13.9143 5.96459 14.2034C6.3289 14.4925 6.78215 14.645 7.24632 14.6346H17.0068C17.4611 14.6339 17.9015 14.4775 18.2553 14.1914C18.6092 13.9052 18.8552 13.5064 18.9529 13.0608L20.5996 5.61243H3.66348",
                        stroke: "#E9E9E9",
                        "stroke-width": "1.2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                      }),
                    ]
                  )),
                ];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(`<button class="text-white cursor-pointer">`);
      if (!isMobileMenuOpen.value) {
        _push(
          `<svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`
        );
      } else {
        _push(
          `<svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`
        );
      }
      _push(
        `</button></div></div><div class="${ssrRenderClass([
          isMobileMenuOpen.value ? "max-h-96" : "max-h-0",
          "transition-all duration-300 ease-in-out lg:hidden overflow-hidden",
        ])}"><div class="pb-4 pt-2 overflow-y-auto mobile-menu-scrollbar" style="${ssrRenderStyle(
          { "max-block-size": "400px" }
        )}"><form class="relative mb-4"><input${ssrRenderAttr(
          "value",
          searchQuery.value
        )} type="text" placeholder="Search products..." class="w-full px-4 py-2 pl-10 bg-transparent border border-white/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white"><svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></form><div class="space-y-2"><!--[-->`
      );
      ssrRenderList(categories.value, (category) => {
        _push(`<!--[-->`);
        if (category.children && category.children.length) {
          _push(
            `<div><button class="w-full text-left py-2 flex items-center justify-between hover:text-gray-300 transition-colors">${ssrInterpolate(
              category.name
            )} <svg class="${ssrRenderClass([
              { "rotate-180": category.showChildren },
              "w-4 h-4 transition-transform duration-300",
            ])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="${ssrRenderClass(
              [
                category.showChildren ? "max-h-96" : "max-h-0",
                "transition-all duration-300 ease-in-out overflow-hidden",
              ]
            )}"><div class="pl-4 space-y-2 mt-2 pb-2"><!--[-->`
          );
          ssrRenderList(category.children, (child) => {
            _push(
              ssrRenderComponent(
                unref(link_default),
                {
                  key: "mobile-child-" + child.id,
                  href: `/categories/${child.slug}`,
                  class:
                    "block py-1 text-gray-300 hover:text-white transition-colors",
                  onClick: ($event) => (isMobileMenuOpen.value = false),
                },
                {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`${ssrInterpolate(child.name)}`);
                    } else {
                      return [createTextVNode(toDisplayString(child.name), 1)];
                    }
                  }),
                  _: 2,
                },
                _parent
              )
            );
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(
            ssrRenderComponent(
              unref(link_default),
              {
                key: "mobile-" + category.id,
                href: `/categories/${category.slug}`,
                class: "block py-2 hover:text-gray-300 transition-colors",
                onClick: ($event) => (isMobileMenuOpen.value = false),
              },
              {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(category.name)}`);
                  } else {
                    return [createTextVNode(toDisplayString(category.name), 1)];
                  }
                }),
                _: 2,
              },
              _parent
            )
          );
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]-->`);
      _push(
        ssrRenderComponent(
          unref(link_default),
          {
            href: "/products?sale=true",
            class: "block py-2 hover:text-gray-300 transition-colors",
            onClick: ($event) => (isMobileMenuOpen.value = false),
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Sale `);
              } else {
                return [createTextVNode(" Sale ")];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      if (!__props.user) {
        _push(
          ssrRenderComponent(
            unref(link_default),
            {
              href: "/login",
              class:
                "block py-2 hover:text-gray-300 transition-colors mt-4 border-t border-white/20 pt-4",
              onClick: ($event) => (isMobileMenuOpen.value = false),
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Signup/Signin `);
                } else {
                  return [createTextVNode(" Signup/Signin ")];
                }
              }),
              _: 1,
            },
            _parent
          )
        );
      } else {
        _push(`<!--[-->`);
        _push(
          ssrRenderComponent(
            unref(link_default),
            {
              href: "/profile",
              class:
                "block py-2 hover:text-gray-300 transition-colors mt-4 border-t border-white/20 pt-4",
              onClick: ($event) => (isMobileMenuOpen.value = false),
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Profile (${ssrInterpolate(__props.user.name)}) `);
                } else {
                  return [
                    createTextVNode(
                      " Profile (" + toDisplayString(__props.user.name) + ") ",
                      1
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
          ssrRenderComponent(
            unref(link_default),
            {
              href: "/logout",
              method: "post",
              as: "button",
              class:
                "block w-full text-left py-2 hover:text-gray-300 transition-colors",
              onClick: ($event) => (isMobileMenuOpen.value = false),
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Logout `);
                } else {
                  return [createTextVNode(" Logout ")];
                }
              }),
              _: 1,
            },
            _parent
          )
        );
        _push(`<!--]-->`);
      }
      _push(`</div></div></div></nav></header>`);
    };
  },
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/frontend/Components/Header.vue"
  );
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "FrontendLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page2 = usePage();
    const user = computed(() => {
      var _a;
      return (_a = page2.props.auth) == null ? void 0 : _a.user;
    });
    const hideHeaderFooter = computed(() => {
      const url = new URL(page2.url, window.location.origin);
      return url.searchParams.get("hideHeaderFooter") === "true";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<div${ssrRenderAttrs(
          mergeProps({ class: "min-h-screen flex flex-col" }, _attrs)
        )}>`
      );
      if (!hideHeaderFooter.value) {
        _push(
          ssrRenderComponent(_sfc_main$1, { user: user.value }, null, _parent)
        );
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-grow">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      if (!hideHeaderFooter.value) {
        _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(CookieConsent, null, null, _parent));
      _push(`</div>`);
    };
  },
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/frontend/Layouts/FrontendLayout.vue"
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  useCartStore as a,
  useForm as b,
  createInertiaApp as c,
  _export_sfc as d,
  head_default as h,
  link_default as l,
  resolvePageComponent as r,
  usePage as u,
};
