import {
  PropType,
  defineComponent,
  renderSlot,
  provide,
  App,
  getCurrentInstance,
  ref,
  onMounted
} from "vue";

import {
  CONFIG_PROVIDER
} from "../const";
import {
  EUiType
} from "../enum";
import {
  IProps
} from "../types";

const ConfigProvider = defineComponent({
  name: "ConfigProvider",
  props: {
    app: {
      type: Object as PropType<App>,
      default: () => {
        const instance = getCurrentInstance();

        if (instance) {
          return instance.appContext.app;
        }
      }
    },
    type: {
      type: String as PropType<IProps["type"]>
    }
  },

  setup(props, {
    slots
  }) {
    provide(CONFIG_PROVIDER, props);

    const isLoaded = ref(false); // 用于跟踪加载状态

    const el = async () => {
      const tasks = [];

      if (props.type === EUiType.ELEMENT) {
        tasks.push(
            import("element-plus").then(module => {
              props.app?.use(module.default);
            }),
            import("element-plus/dist/index.css")
        );
      } else {
        tasks.push(
            import("@arco-design/web-vue").then(module => {
              props.app?.use(module.default);
            }),
            import("@arco-design/web-vue/dist/arco.css")
        );
      }

      // 等待所有导入完成
      await Promise.all(tasks);
      isLoaded.value = true; // 标记为加载完成
    };

    onMounted(async () => {
      await el();
    });

    return () => (isLoaded.value
      ? renderSlot(slots, "default", {
        config: props
      }) // 加载完成后渲染内容
      : null); // 加载未完成时返回 null 或一个加载中的状态
  }
});

export type TConfigProviderInstance = InstanceType<typeof ConfigProvider>;

export default ConfigProvider;
