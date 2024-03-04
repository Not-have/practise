import { ref, unref, computed, onMounted, watch, reactive, watchEffect } from 'vue';
import { useTimeoutFn } from '@vben/hooks';
import { buildUUID } from '@/utils/uuid';
import { isFunction, isBoolean, isObject } from '@/utils/is';
import { get, cloneDeep, merge } from 'lodash-es';
import { FETCH_SETTING, ROW_KEY, PAGE_SIZE } from '../const';
import { parseRowKeyValue } from '../helper';
export function useDataSource(propsRef, { getPaginationInfo, setPagination, setLoading, getFieldsValue, clearSelectedRowKeys, tableData }, emit) {
    const searchState = reactive({
        sortInfo: {},
        filterInfo: {}
    });
    const dataSourceRef = ref([]);
    const rawDataSourceRef = ref({});
    watchEffect(() => {
        tableData.value = unref(dataSourceRef);
    });
    watch(() => unref(propsRef).dataSource, () => {
        const { dataSource, api } = unref(propsRef);
        !api && dataSource && (dataSourceRef.value = dataSource);
    }, {
        immediate: true
    });
    function handleTableChange(pagination, filters, sorter) {
        const { clearSelectOnPageChange, sortFn, filterFn } = unref(propsRef);
        if (clearSelectOnPageChange) {
            clearSelectedRowKeys();
        }
        setPagination(pagination);
        const params = {};
        if (sorter && isFunction(sortFn)) {
            const sortInfo = sortFn(sorter);
            searchState.sortInfo = sortInfo;
            params.sortInfo = sortInfo;
        }
        if (filters && isFunction(filterFn)) {
            const filterInfo = filterFn(filters);
            searchState.filterInfo = filterInfo;
            params.filterInfo = filterInfo;
        }
        fetch(params);
    }
    function setTableKey(items) {
        if (!items || !Array.isArray(items))
            return;
        items.forEach(item => {
            if (!item[ROW_KEY]) {
                item[ROW_KEY] = buildUUID();
            }
            if (item.children && item.children.length) {
                setTableKey(item.children);
            }
        });
    }
    const getAutoCreateKey = computed(() => {
        return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
    });
    const getRowKey = computed(() => {
        const { rowKey } = unref(propsRef);
        return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
    });
    const getDataSourceRef = computed(() => {
        const dataSource = unref(dataSourceRef);
        if (!dataSource || dataSource.length === 0) {
            return unref(dataSourceRef);
        }
        if (unref(getAutoCreateKey)) {
            const firstItem = dataSource[0];
            const lastItem = dataSource[dataSource.length - 1];
            if (firstItem && lastItem) {
                if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
                    const data = cloneDeep(unref(dataSourceRef));
                    data.forEach(item => {
                        if (!item[ROW_KEY]) {
                            item[ROW_KEY] = buildUUID();
                        }
                        if (item.children && item.children.length) {
                            setTableKey(item.children);
                        }
                    });
                    dataSourceRef.value = data;
                }
            }
        }
        return unref(dataSourceRef);
    });
    async function updateTableData(index, key, value) {
        const record = dataSourceRef.value[index];
        if (record) {
            dataSourceRef.value[index][key] = value;
        }
        return dataSourceRef.value[index];
    }
    function updateTableDataRecord(keyValue, record) {
        const row = findTableDataRecord(keyValue);
        if (row) {
            for (const field in row) {
                if (Reflect.has(record, field))
                    row[field] = record[field];
            }
            return row;
        }
    }
    function deleteTableDataRecord(keyValues) {
        if (!dataSourceRef.value || dataSourceRef.value.length == 0)
            return;
        const delKeyValues = !Array.isArray(keyValues) ? [keyValues] : keyValues;
        function deleteRow(data, keyValue) {
            const row = findRow(data, keyValue);
            if (row === null || row.index === -1) {
                return;
            }
            row.data.splice(row.index, 1);
            function findRow(data, keyValue) {
                if (data === null || data === undefined) {
                    return null;
                }
                for (let i = 0; i < data.length; i++) {
                    const row = data[i];
                    if (parseRowKeyValue(unref(getRowKey), row) === keyValue) {
                        return { index: i, data };
                    }
                    if (row.children?.length > 0) {
                        const result = findRow(row.children, keyValue);
                        if (result != null) {
                            return result;
                        }
                    }
                }
                return null;
            }
        }
        for (const keyValue of delKeyValues) {
            deleteRow(dataSourceRef.value, keyValue);
            deleteRow(unref(propsRef).dataSource, keyValue);
        }
        setPagination({
            total: unref(propsRef).dataSource?.length
        });
    }
    function insertTableDataRecord(record, index) {
        index = index ?? dataSourceRef.value?.length;
        const _record = isObject(record) ? [record] : record;
        unref(dataSourceRef).splice(index, 0, ..._record);
        return unref(dataSourceRef);
    }
    function findTableDataRecord(keyValue) {
        if (!dataSourceRef.value || dataSourceRef.value.length == 0)
            return;
        const { childrenColumnName = 'children' } = unref(propsRef);
        const findRow = (array) => {
            let ret;
            array.some(function iter(r) {
                if (parseRowKeyValue(unref(getRowKey), r) === keyValue) {
                    ret = r;
                    return true;
                }
                return r[childrenColumnName] && r[childrenColumnName].some(iter);
            });
            return ret;
        };
        return findRow(dataSourceRef.value);
    }
    async function fetch(opt) {
        const { api, searchInfo, defSort, fetchSetting, beforeFetch, afterFetch, useSearchForm, pagination } = unref(propsRef);
        if (!api || !isFunction(api))
            return;
        try {
            setLoading(true);
            const { pageField, sizeField, listField, totalField } = Object.assign({}, FETCH_SETTING, fetchSetting);
            let pageParams = {};
            const { current = 1, pageSize = PAGE_SIZE } = unref(getPaginationInfo);
            if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
                pageParams = {};
            }
            else {
                pageParams[pageField] = (opt && opt.page) || current;
                pageParams[sizeField] = pageSize;
            }
            const { sortInfo = {}, filterInfo } = searchState;
            let params = merge(pageParams, useSearchForm ? getFieldsValue() : {}, searchInfo, opt?.searchInfo ?? {}, defSort, sortInfo, filterInfo, opt?.sortInfo ?? {}, opt?.filterInfo ?? {});
            if (beforeFetch && isFunction(beforeFetch)) {
                params = (await beforeFetch(params)) || params;
            }
            const res = await api(params);
            rawDataSourceRef.value = res;
            const isArrayResult = Array.isArray(res);
            let resultItems = isArrayResult ? res : get(res, listField);
            const resultTotal = isArrayResult ? res.length : get(res, totalField);
            if (Number(resultTotal)) {
                const currentTotalPage = Math.ceil(resultTotal / pageSize);
                if (current > currentTotalPage) {
                    setPagination({
                        current: currentTotalPage
                    });
                    return await fetch(opt);
                }
            }
            if (afterFetch && isFunction(afterFetch)) {
                resultItems = (await afterFetch(resultItems)) || resultItems;
            }
            dataSourceRef.value = resultItems;
            setPagination({
                total: resultTotal || 0
            });
            if (opt && opt.page) {
                setPagination({
                    current: opt.page || 1
                });
            }
            emit('fetch-success', {
                items: unref(resultItems),
                total: resultTotal
            });
            return resultItems;
        }
        catch (error) {
            emit('fetch-error', error);
            dataSourceRef.value = [];
            setPagination({
                total: 0
            });
        }
        finally {
            setLoading(false);
        }
    }
    function setTableData(values) {
        dataSourceRef.value = values;
    }
    function getDataSource() {
        return getDataSourceRef.value;
    }
    function getRawDataSource() {
        return rawDataSourceRef.value;
    }
    async function reload(opt) {
        return await fetch(opt);
    }
    onMounted(() => {
        useTimeoutFn(() => {
            unref(propsRef).immediate && fetch();
        }, 16);
    });
    return {
        getDataSourceRef,
        getDataSource,
        getRawDataSource,
        getRowKey,
        setTableData,
        getAutoCreateKey,
        fetch,
        reload,
        updateTableData,
        updateTableDataRecord,
        deleteTableDataRecord,
        insertTableDataRecord,
        findTableDataRecord,
        handleTableChange
    };
}
