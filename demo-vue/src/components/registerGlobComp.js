import { Button } from './Button';
import { Input, Layout } from 'ant-design-vue';
import VXETable from 'vxe-table';
export function registerGlobComp(app) {
    app.use(Input).use(Button).use(Layout).use(VXETable);
}
