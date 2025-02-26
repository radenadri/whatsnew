import { defineComponent, onMounted, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { i as initMonospaceScript } from "./utils-QeSxawLU.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    posts: {}
  },
  setup(__props) {
    onMounted(() => {
      initMonospaceScript();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "home" }, null, _parent));
      _push(`<main class="h-full flex flex-col"><header><h1 class="!mb-3">whats.new 🖥️</h1><p>A cozy corner where I drop my random thoughts and share some cool coding tricks ✨</p><p>(this is an example of creating blog using Laravel 12 and use markdown as data source)</p><h2>Recent writings 🚀</h2><hr></header><section class="!mt-0 flex-1"><!--[-->`);
      ssrRenderList(_ctx.posts, (post, index) => {
        _push(`<div class="flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-8"><span class="md:w-[15%]">${ssrInterpolate(post.date)}</span>`);
        _push(ssrRenderComponent(unref(Link), {
          class: "flex-1 !m-0 no-underline hover:underline",
          href: _ctx.route("show", { slug: post.slug })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h4 class="!m-0"${_scopeId}>${ssrInterpolate(post.title)}</h4>`);
            } else {
              return [
                createVNode("h4", { class: "!m-0" }, toDisplayString(post.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></section><footer class="flex justify-between items-center"><span class="!m-0"> Copyright © 2025 <a href="https://radenadri.xyz"><cite>radenadri</cite></a></span><span class="!m-0"><a href="https://github.com/radenadri/whatsnew"><cite>this site repo</cite></a></span></footer></main><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
