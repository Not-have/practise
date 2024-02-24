<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
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
        
    </nav>
    <br />
    
    <RouterView />
</template>

<style>

</style>
