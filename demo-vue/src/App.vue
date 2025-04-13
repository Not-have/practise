<script setup lang="ts">
import {
  RouterLink,
  RouterView
} from "vue-router";
</script>

<template>
  <header>
    <RouterLink to="/">
      Home
    </RouterLink>
    <RouterLink to="/about">
      About
    </RouterLink>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

a.router-link-exact-active:hover {
  background-color: transparent;
}

a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

a:first-of-type {
  border: 0;
}

</style>
