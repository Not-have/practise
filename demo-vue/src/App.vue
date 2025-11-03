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
    <RouterLink to="/video">
      Video
    </RouterLink>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  max-height: 100vh;
  line-height: 1.5;
}

nav {
  margin-top: 2rem;
  width: 100%;
  font-size: 12px;
  text-align: center;
}

a.router-link-exact-active {
  color: hsl(160deg 100% 37% / 100%);
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
