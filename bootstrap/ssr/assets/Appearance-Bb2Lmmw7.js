import { defineComponent, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext, withCtx } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { u as useAppearance } from "../app.js";
import { Sun, Moon, Monitor } from "lucide-vue-next";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./Layout-DHOvJi-W.js";
import { _ as _sfc_main$2 } from "./AppLayout-BOjmAFA8.js";
import "./AppLogoIcon-xe2zDqH9.js";
import "clsx";
import "tailwind-merge";
import "radix-vue";
import "class-variance-authority";
import "./Input-D5Mz7eRZ.js";
import "@vueuse/core";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppearanceTabs",
  __ssrInlineRender: true,
  props: {
    class: { default: "" }
  },
  setup(__props) {
    const { appearance } = useAppearance();
    const tabs = [
      { value: "light", Icon: Sun, label: "Light" },
      { value: "dark", Icon: Moon, label: "Dark" },
      { value: "system", Icon: Monitor, label: "System" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800", __props.class]
      }, _attrs))}><!--[-->`);
      ssrRenderList(tabs, ({ value, Icon, label }) => {
        _push(`<button class="${ssrRenderClass([
          "flex items-center rounded-md px-3.5 py-1.5 transition-colors",
          unref(appearance) === value ? "bg-white shadow-sm dark:bg-neutral-700 dark:text-neutral-100" : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"
        ])}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(Icon), { class: "-ml-1 h-4 w-4" }, null), _parent);
        _push(`<span class="ml-1.5 text-sm">${ssrInterpolate(label)}</span></button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AppearanceTabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Appearance",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbItems = [
      {
        title: "Appearance settings",
        href: "/settings/appearance"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({ breadcrumbs: breadcrumbItems }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Appearance settings" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    title: "Appearance settings",
                    description: "Update your account's appearance settings"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode(_sfc_main$4, {
                        title: "Appearance settings",
                        description: "Update your account's appearance settings"
                      }),
                      createVNode(_sfc_main$1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Appearance settings" }),
              createVNode(_sfc_main$3, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(_sfc_main$4, {
                      title: "Appearance settings",
                      description: "Update your account's appearance settings"
                    }),
                    createVNode(_sfc_main$1)
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/settings/Appearance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
