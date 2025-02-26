import { defineComponent, onMounted, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { createHighlighter } from "shiki";
import { Head, Link } from "@inertiajs/vue3";
import { i as initMonospaceScript } from "./utils-QeSxawLU.js";
import "clsx";
import "tailwind-merge";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PostDetail",
  __ssrInlineRender: true,
  props: {
    post: {}
  },
  setup(__props) {
    const formattedDate = (date) => {
      const dateObj = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return dateObj.toLocaleDateString("en-US", options);
    };
    async function initHighlighter() {
      return await createHighlighter({
        themes: ["github-dark", "github-light"],
        langs: ["php", "js", "ts", "html", "css", "scss", "json", "md", "bash", "vue"]
      });
    }
    onMounted(() => {
      initMonospaceScript();
      document.querySelectorAll("code").forEach((block) => {
        const code = block.innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        const lang = block.getAttribute("class");
        if (!lang) {
          return;
        }
        initHighlighter().then((highlighter) => {
          const html = highlighter.codeToHtml(code, {
            theme: "github-light",
            lang: lang.split("-")[1]
          });
          block.outerHTML = html;
        });
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.post.title
      }, null, _parent));
      _push(`<main class="h-full flex flex-col"><header><h1 class="!mb-3">${ssrInterpolate(_ctx.post.title)}</h1><div class="flex justify-between items-center"><span>${ssrInterpolate(formattedDate(_ctx.post.date))}</span>`);
      _push(ssrRenderComponent(unref(Link), {
        class: "no-underline hover:underline",
        href: _ctx.route("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`(←) Back`);
          } else {
            return [
              createTextVNode("(←) Back")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><section class="flex-1"><div>${_ctx.post.content ?? ""}</div></section><footer class="flex justify-between items-center"><span class="!m-0"> Copyright © 2025 <a href="https://radenadri.xyz"><cite>radenadri</cite></a></span><span class="!m-0"><a href="https://github.com/radenadri/whatsnew"><cite>this site repo</cite></a></span></footer></main><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/PostDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
