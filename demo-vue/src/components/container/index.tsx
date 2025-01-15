import {
  defineComponent,
  computed,
  ref,
  VNode,
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

import "./style.css";

// 添加一个简单的 Loading 组件
const LoadingComponent = (): VNode => (
  <div class="vc-container-loading">
    <div class="loading-spinner"></div>
    <span>加载中...</span>
  </div>
);

export const Container = defineComponent({
  name: "vc-container",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
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

    return (): VNode => {
      const {
        config
      } = props;

      if (!cssLoaded.value) {
        return <LoadingComponent />;
      }

      const Component = componentMap.value[config.type as keyof typeof componentMap.value];

      if (!Component) {
        console.warn(`组件 ${config.type} 在当前UI框架中未找到`);

        return <div>组件 {config.type} 未找到</div>;
      }

      return <Component {...config.options}>
        {config.label}
      </Component>;
    };
  }
});

export default Container;
