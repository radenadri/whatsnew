<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { PostItem } from '../types/front';
import { onMounted } from 'vue';
import { initMonospaceScript } from '../lib/utils';

defineProps<{
    posts: Array<PostItem>
}>();

onMounted(() => {
    initMonospaceScript();
});
</script>

<template>

    <Head title="home" />
    <main class="h-full flex flex-col">
        <header>
            <h1 class="!mb-3">whats.new 🖥️</h1>
            <p>A cozy corner where I drop my random thoughts and share some cool coding tricks ✨</p>
            <p>(this is an example of creating blog using Laravel 12 and use markdown as data source)</p>
            <h2>Recent writings 🚀</h2>
            <hr />
        </header>
        <section class="!mt-0 flex-1">
            <div class="flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-8" v-for="(post, index) in posts"
                :key="index">
                <span class="md:w-[15%]">{{ post.date }}</span>
                <Link class="flex-1 !m-0 no-underline hover:underline" :href="route('show', { slug: post.slug })">
                <h4 class="!m-0">{{ post.title }}</h4>
                </Link>
            </div>
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
