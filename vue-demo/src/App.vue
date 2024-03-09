<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import {
    ERouter
} from '@/router/enum';
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        &nbsp;
        &nbsp;
        <RouterLink to="/about">About</RouterLink>
        &nbsp;
        &nbsp;
        <RouterLink to="/router">router</RouterLink>
        &nbsp;
        &nbsp;
        <RouterLink :to="ERouter.COMPOSITION">Vue3 Composition(组合式) API使用</RouterLink>
        &nbsp;
        &nbsp;
        <RouterLink :to="ERouter.PROVIDE">provide</RouterLink>

        &nbsp;
        &nbsp;
        <RouterLink :to="ERouter.DIRECTIVES">自定义指令</RouterLink>
        
        &nbsp;
        &nbsp;
        <RouterLink :to="ERouter.COMPUTED">computed</RouterLink>

    </nav>
    <br />

    <RouterView />
</template>

<style></style>
