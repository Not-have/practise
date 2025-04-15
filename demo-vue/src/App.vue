<script setup lang="ts">
import {
  onMounted,
  onUnmounted
} from "vue";
import {
  RouterLink,
  RouterView
} from "vue-router";

import {
  IframeCommunicator
} from "@/utils";
import {
  localStorageHelper
} from "@mt-kit/utils";

const ifram = new IframeCommunicator();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleMessage = (event: any ): void => {
  localStorageHelper.set({
    key: "message-test",
    value: event.data
  });

  // eslint-disable-next-line no-console
  console.log(event.data);
};

onMounted(() => {

  // window.addEventListener("message", handleMessage);
  ifram.onMessage(handleMessage);
});

onUnmounted(() => {

  // window.addEventListener("message", handleMessage);
  ifram.removeMessageListener(handleMessage);
});

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
