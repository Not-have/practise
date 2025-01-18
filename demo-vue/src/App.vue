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
    </RouterLink> |
    <RouterLink to="/element">
      Element
    </RouterLink> |
    <RouterLink to="/arco">
      Arco Design
    </RouterLink> |
    <RouterLink to="/othder">
      Other
    </RouterLink> |
    <RouterLink to="/json">
      Json
    </RouterLink>
  </header>
  <br />
  <hr />

  <ConfigProvider :type="EUiType.ELEMENT">
    <RouterView />
  </ConfigProvider>
</template>
<style>
#app {
  padding: 10px;
  box-sizing: border-box;
}
</style>
