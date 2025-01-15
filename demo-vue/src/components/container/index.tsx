import {
  defineComponent,
  computed,
  VNode
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

    const componentMap = computed(() => {
      if(configProps.type === EUiType.ARCO_DESIGN) {
        import("@arco-design/web-vue/dist/arco.css");

        return ArcoComponentMap;
      }

      import("element-plus/dist/index.css");

      return ElementComponentMap;
    });

    return (): VNode | null => {
      const {
        config
      } = props;

      const Component = componentMap.value[config.type as keyof typeof componentMap.value];

      if (!Component) {
        console.warn(`组件 ${config.type} 在当前UI框架中未找到`);

        return null;
      }

      return <Component {...config.options}>
        {config.label}
      </Component>;
    };
  }
});

export default Container;
