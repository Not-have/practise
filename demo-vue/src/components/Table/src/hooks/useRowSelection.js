import { isFunction } from '@/utils/is';
import { computed, nextTick, ref, toRaw, unref, watch } from 'vue';
import { ROW_KEY } from '../const';
import { omit } from 'lodash-es';
import { findNodeAll } from '@/utils/helper/treeHelper';
import { parseRowKey, parseRowKeyValue } from '../helper';
export function useRowSelection(propsRef, tableData, emit) {
    const selectedRowKeysRef = ref([]);
    const selectedRowRef = ref([]);
    const getRowSelectionRef = computed(() => {
        const { rowSelection } = unref(propsRef);
        if (!rowSelection) {
            return null;
        }
        return {
            selectedRowKeys: unref(selectedRowKeysRef),
            onChange: (selectedRowKeys, selectedRows, isClickCustomRow) => {
                if (isClickCustomRow) {
                    rowSelection.onChange?.(selectedRowKeys, selectedRows);
                }
                else {
                    const currentPageKeys = tableData.value.map(o => parseRowKeyValue(unref(getRowKey), o));
                    for (const selectedKey of selectedRowKeysRef.value.filter(k => currentPageKeys.includes(k))) {
                        if (selectedRowKeys.findIndex(k => k === selectedKey) < 0) {
                            const removeIndex = selectedRowKeysRef.value.findIndex(k => k === selectedKey);
                            if (removeIndex > -1) {
                                selectedRowKeysRef.value.splice(removeIndex, 1);
                                selectedRowRef.value.splice(removeIndex, 1);
                            }
                        }
                    }
                    for (const selectedKey of selectedRowKeys) {
                        const existIndex = selectedRowKeysRef.value.findIndex(k => k === selectedKey);
                        if (existIndex < 0) {
                            selectedRowKeysRef.value.push(selectedKey);
                            const record = selectedRows.find(o => parseRowKeyValue(unref(getRowKey), o) === selectedKey);
                            if (record) {
                                selectedRowRef.value.push(record);
                            }
                        }
                    }
                    setSelectedRowKeys(selectedRowKeysRef.value);
                    rowSelection.onChange?.(selectedRowKeysRef.value, selectedRowRef.value);
                }
            },
            ...omit(rowSelection, ['onChange'])
        };
    });
    watch(() => unref(propsRef).rowSelection?.selectedRowKeys, (v) => {
        setSelectedRowKeys(v);
    });
    watch(() => unref(selectedRowKeysRef), () => {
        nextTick(() => {
            const { rowSelection } = unref(propsRef);
            if (rowSelection) {
                const { onChange } = rowSelection;
                if (onChange && isFunction(onChange))
                    onChange(getSelectRowKeys(), getSelectRows(), true);
            }
            emit('selection-change', {
                keys: getSelectRowKeys(),
                rows: getSelectRows()
            });
        });
    }, { deep: true });
    const getAutoCreateKey = computed(() => {
        return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
    });
    const getRowKey = computed(() => {
        const { rowKey } = unref(propsRef);
        return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
    });
    function setSelectedRowKeys(keyValues) {
        selectedRowKeysRef.value = keyValues || [];
        const rows = toRaw(unref(tableData)).concat(toRaw(unref(selectedRowRef)));
        const allSelectedRows = findNodeAll(rows, item => keyValues?.includes(parseRowKeyValue(unref(getRowKey), item)), {
            children: propsRef.value.childrenColumnName ?? 'children'
        });
        const trueSelectedRows = [];
        keyValues?.forEach((keyValue) => {
            const found = allSelectedRows.find(item => parseRowKeyValue(unref(getRowKey), item) === keyValue);
            if (found) {
                trueSelectedRows.push(found);
            }
            else {
                if (rows[0]) {
                    trueSelectedRows.push({ [parseRowKey(unref(getRowKey), rows[0])]: keyValue });
                }
            }
        });
        selectedRowRef.value = trueSelectedRows;
    }
    function setSelectedRows(rows) {
        selectedRowRef.value = rows;
        selectedRowKeysRef.value = selectedRowRef.value.map(o => parseRowKeyValue(unref(getRowKey), o));
    }
    function clearSelectedRowKeys() {
        selectedRowRef.value = [];
        selectedRowKeysRef.value = [];
    }
    function deleteSelectRowByKey(key) {
        const selectedRowKeys = unref(selectedRowKeysRef);
        const index = selectedRowKeys.findIndex(item => item === key);
        if (index !== -1) {
            unref(selectedRowKeysRef).splice(index, 1);
        }
    }
    function getSelectRowKeys() {
        return unref(selectedRowKeysRef);
    }
    function getSelectRows() {
        return unref(selectedRowRef);
    }
    function getRowSelection() {
        return unref(getRowSelectionRef);
    }
    return {
        getRowSelection,
        getRowSelectionRef,
        getSelectRows,
        getSelectRowKeys,
        setSelectedRowKeys,
        clearSelectedRowKeys,
        deleteSelectRowByKey,
        setSelectedRows
    };
}
