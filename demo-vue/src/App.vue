<script setup lang="ts">

import {
  RouterLink,
  RouterView
} from "vue-router";

import ConfigProvider, {
  EUiType
} from "@/components/config-provider";

</script>

<template>
  <header>
    <RouterLink to="/">
      Home
    </RouterLink>
    |
    <RouterLink to="/about">
      About
    </RouterLink>
  </header>
  <br />
  <hr />

  <ConfigProvider :type="EUiType.ARCO_DESIGN">
    <RouterView />
  </ConfigProvider>
</template>
<style>
#app {
  padding: 10px;
  box-sizing: border-box;
}
</style>
