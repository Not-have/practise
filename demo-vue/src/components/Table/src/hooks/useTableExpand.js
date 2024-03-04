import { computed, unref, ref, toRaw, nextTick } from 'vue';
import { ROW_KEY } from '../const';
import { parseRowKeyValue } from '../helper';
export function useTableExpand(propsRef, tableData, emit) {
    const expandedRowKeys = ref([]);
    const getAutoCreateKey = computed(() => {
        return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
    });
    const getRowKey = computed(() => {
        const { rowKey } = unref(propsRef);
        return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
    });
    const getExpandOption = computed(() => {
        const { isTreeTable, expandRowByClick } = unref(propsRef);
        if (!isTreeTable && !expandRowByClick)
            return {};
        return {
            expandedRowKeys: unref(expandedRowKeys),
            onExpandedRowsChange: (keyValues) => {
                expandedRowKeys.value = keyValues;
                emit('expanded-rows-change', keyValues);
            }
        };
    });
    function expandAll() {
        const keyValues = getAllKeys();
        expandedRowKeys.value = keyValues;
    }
    function collapseAll() {
        expandedRowKeys.value = [];
    }
    function expandRows(keyValues) {
        const { isTreeTable, expandRowByClick } = unref(propsRef);
        if (!isTreeTable && !expandRowByClick)
            return;
        expandedRowKeys.value = [...expandedRowKeys.value, ...keyValues];
    }
    function collapseRows(keyValues) {
        const { isTreeTable, expandRowByClick } = unref(propsRef);
        if (!isTreeTable && !expandRowByClick)
            return;
        expandedRowKeys.value = unref(expandedRowKeys).filter(keyValue => !keyValues.includes(keyValue));
    }
    function getAllKeys(data) {
        const keyValues = [];
        const { childrenColumnName } = unref(propsRef);
        toRaw(data || unref(tableData)).forEach(item => {
            keyValues.push(parseRowKeyValue(unref(getRowKey), item));
            const children = item[childrenColumnName || 'children'];
            if (children?.length) {
                keyValues.push(...getAllKeys(children));
            }
        });
        return keyValues;
    }
    function getKeyPaths(records, childrenColumnName, keyValue, paths) {
        if (records.findIndex(record => parseRowKeyValue(unref(getRowKey), record) === keyValue) >
            -1) {
            paths.push(keyValue);
            return true;
        }
        else {
            for (const record of records) {
                const children = record[childrenColumnName];
                if (Array.isArray(children) &&
                    getKeyPaths(children, childrenColumnName, keyValue, paths)) {
                    paths.push(parseRowKeyValue(unref(getRowKey), record));
                    return true;
                }
            }
        }
        return false;
    }
    function expandRowAccordion(keyValue) {
        const { childrenColumnName } = unref(propsRef);
        const paths = [];
        getKeyPaths(tableData.value, childrenColumnName || 'children', keyValue, paths);
        expandedRowKeys.value = paths;
    }
    function handleTableExpand(expanded, record) {
        if (propsRef.value.accordion &&
            (propsRef.value.isTreeTable || propsRef.value.expandRowByClick) &&
            expanded) {
            nextTick(() => {
                expandRowAccordion(parseRowKeyValue(unref(getRowKey), record));
            });
        }
    }
    return {
        getExpandOption,
        expandAll,
        collapseAll,
        expandRows,
        collapseRows,
        expandRowAccordion,
        handleTableExpand
    };
}
