<script setup lang="tsx">
import Loading from "@/components/loading/index.vue";
import {
  defineProps,
  computed,
  ref,
  onMounted
} from "vue";

import {
  COMPONENT_MAP as ArcoComponentMap
} from "@/components/arco-design-x";
import {
  getConfigProviderProps
} from "@/components/config-provider";
import {
  EUiType
} from "@/components/config-provider/enum";
import {
  COMPONENT_MAP as ElementComponentMap
} from "@/components/element-x";

import {
  TProps
} from "../types";

const props = defineProps<TProps>();

const configProps = getConfigProviderProps();

const cssLoaded = ref(false);

const componentMap = computed(() => (configProps.type === EUiType.ARCO_DESIGN
  ? ArcoComponentMap
  : ElementComponentMap));

onMounted(() => {
  if (configProps.type === EUiType.ARCO_DESIGN) {
    import("@arco-design/web-vue/dist/arco.css").then(() => {
      cssLoaded.value = true;
    });
  } else {
    import("element-plus/dist/index.css").then(() => {
      cssLoaded.value = true;
    });
  }
});

const DOM = () => {
  if (!cssLoaded.value) {
    return <Loading />;
  }

  const Component = componentMap.value[props.type as keyof typeof componentMap.value];

  if (!Component) {
    console.warn(`组件 ${props.type} 在当前UI框架中未找到`);

    return <div>组件 {props.type} 未找到</div>;
  }

  return <Component {...props.options}>
    {props.label}
  </Component>;
};

</script>
<template>
  <DOM />
</template>
