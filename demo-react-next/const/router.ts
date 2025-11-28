import type {
  MenuProps
} from "antd";
import { ERouter } from "@/enum";

const ROUTER_CONFIG: MenuProps['items'] = [
  {
    key: ERouter.DEMO_PAGE01,
    label: 'Demo Page 01',
  },
  {
    key: ERouter.DEMO_PAGE02,
    label: 'Demo Page 02',
  },
]

export default ROUTER_CONFIG;
