import { unref } from 'vue';
import { parseRowKeyValue } from '../helper';
export function useCustomRow(propsRef, { setSelectedRowKeys, getSelectRowKeys, getAutoCreateKey, clearSelectedRowKeys, emit }) {
    const customRow = (record, index) => {
        return {
            onClick: (e) => {
                e?.stopPropagation();
                function handleClick() {
                    const { rowSelection, rowKey, clickToRowSelect } = unref(propsRef);
                    if (!rowSelection || !clickToRowSelect)
                        return;
                    const keyValues = getSelectRowKeys() || [];
                    const keyValue = parseRowKeyValue(rowKey, record, unref(getAutoCreateKey));
                    if (!keyValue)
                        return;
                    const isCheckbox = rowSelection.type === 'checkbox';
                    if (isCheckbox) {
                        const tr = e
                            .composedPath?.()
                            .find(dom => dom.tagName === 'TR');
                        if (!tr)
                            return;
                        const checkBox = tr.querySelector('input[type=checkbox]');
                        if (!checkBox || checkBox.hasAttribute('disabled'))
                            return;
                        if (!keyValues.includes(keyValue)) {
                            keyValues.push(keyValue);
                            setSelectedRowKeys(keyValues);
                            return;
                        }
                        const keyIndex = keyValues.findIndex(item => item === keyValue);
                        keyValues.splice(keyIndex, 1);
                        setSelectedRowKeys(keyValues);
                        return;
                    }
                    const isRadio = rowSelection.type === 'radio';
                    if (isRadio) {
                        if (!keyValues.includes(keyValue)) {
                            if (keyValues.length) {
                                clearSelectedRowKeys();
                            }
                            setSelectedRowKeys([keyValue]);
                            return;
                        }
                        clearSelectedRowKeys();
                    }
                }
                handleClick();
                emit('row-click', record, index, e);
            },
            onDblclick: (event) => {
                emit('row-dbClick', record, index, event);
            },
            onContextmenu: (event) => {
                emit('row-contextmenu', record, index, event);
            },
            onMouseenter: (event) => {
                emit('row-mouseenter', record, index, event);
            },
            onMouseleave: (event) => {
                emit('row-mouseleave', record, index, event);
            }
        };
    };
    return {
        customRow
    };
}
