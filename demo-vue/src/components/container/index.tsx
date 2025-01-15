import {
  defineComponent
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
    return () => {
      const {
        type
      } = getConfigProviderProps();

      const {
        config
      } = props;

      // 根据框架类型选择对应的组件映射
      let componentMap;

      if(type === EUiType.ARCO_DESIGN) {
        import("@arco-design/web-vue/dist/arco.css");
        componentMap = ArcoComponentMap;
      } else {
        import("element-plus/dist/index.css");
        componentMap = ElementComponentMap;
      }

      const Component = componentMap[config.type as keyof typeof componentMap];

      if (!Component) {
        console.warn(`Component ${config.type} not found in current UI framework`);

        return null;
      }

      return <Component {...config.options}>
        {config.label}
      </Component>;
    };
  }
});

export default Container;
