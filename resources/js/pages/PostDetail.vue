<script setup lang="ts">
import { createHighlighter } from 'shiki'
import { Head, Link } from '@inertiajs/vue3';
import { PostItem } from '../types/front';
import { onMounted } from 'vue';
import { initMonospaceScript } from '../lib/utils';

defineProps<{
    post: PostItem
}>();

const formattedDate = (date: string) => {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return dateObj.toLocaleDateString('en-US', options);
};

async function initHighlighter() {
    return await createHighlighter({
        themes: ['github-dark', 'github-light'],
        langs: ['php', 'js', 'ts', 'html', 'css', 'scss', 'json', 'md', 'bash', 'vue'],
    });
}

onMounted(() => {
    initMonospaceScript();

    document.querySelectorAll('code').forEach((block) => {
        // get the element
        const code = block.innerHTML.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');

        // get language
        const lang = block.getAttribute('class');

        if (!lang) {
            return;
        }

        // create highlighter
        initHighlighter().then((highlighter) => {
            // highlight code
            const html = highlighter.codeToHtml(code, {
                theme: 'github-light',
                lang: lang.split('-')[1],
            });

            // replace code block with highlighted code
            block.outerHTML = html;
        });

    });
});

</script>

<template>

    <Head :title="post.title" />
    <main class="h-full flex flex-col">
        <header>
            <h1 class="!mb-3">{{ post.title }}</h1>
            <div class="flex justify-between items-center">
                <span>{{ formattedDate(post.date) }}</span>
                <Link class="no-underline hover:underline" :href="route('home')">(←) Back</Link>
            </div>
        </header>
        <section class="flex-1">
            <div v-html="post.content"></div>
        </section>
        <footer class="flex justify-between items-center">
            <span class="!m-0">
                Copyright © 2025 <a href="https://radenadri.xyz"><cite>radenadri</cite></a>
            </span>
            <span class="!m-0">
                <a href="https://github.com/radenadri/whatsnew"><cite>this site repo</cite></a>
            </span>
        </footer>
    </main>
</template>
