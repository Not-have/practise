import { h } from 'vue';
import { isString } from 'lodash-es';
import Icon from '@/components/Icon/Icon.vue';
export const TreeIcon = ({ icon }) => {
    if (!icon)
        return null;
    if (isString(icon)) {
        return h(Icon, { icon, class: 'mr-2' });
    }
    return h(Icon);
};