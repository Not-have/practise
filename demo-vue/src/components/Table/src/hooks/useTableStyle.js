import { unref } from 'vue';
import { isFunction } from '@/utils/is';
export function useTableStyle(propsRef, prefixCls) {
    function getRowClassName(record, index) {
        const { striped, rowClassName } = unref(propsRef);
        const classNames = [];
        if (striped) {
            classNames.push((index || 0) % 2 === 1 ? `${prefixCls}-row__striped` : '');
        }
        if (rowClassName && isFunction(rowClassName)) {
            classNames.push(rowClassName(record, index));
        }
        return classNames.filter(cls => !!cls).join(' ');
    }
    return { getRowClassName };
}
