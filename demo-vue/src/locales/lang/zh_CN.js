import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import { deepMerge } from '@/utils';
const modules = import.meta.glob('./zh-CN/**/*.{json,ts,js}', { eager: true });
export default {
    message: {
        ...genMessage(modules, 'zh-CN'),
        antdLocale: {
            ...antdLocale,
            DatePicker: deepMerge(antdLocale.DatePicker, genMessage(modules, 'zh-CN').antdLocale.DatePicker)
        }
    }
};
