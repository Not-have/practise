import { cloneDeep } from 'lodash-es';
import { unref } from 'vue';
import { forEach } from '@/utils/helper/treeHelper';
export function useTree(treeDataRef, getFieldNames) {
    function getAllKeys(list) {
        const keys = [];
        const treeData = list || unref(treeDataRef);
        const { key: keyField, children: childrenField } = unref(getFieldNames);
        if (!childrenField || !keyField)
            return keys;
        for (let index = 0; index < treeData.length; index++) {
            const node = treeData[index];
            keys.push(node[keyField]);
            const children = node[childrenField];
            if (children && children.length) {
                keys.push(...getAllKeys(children));
            }
        }
        return keys;
    }
    function getEnabledKeys(list) {
        const keys = [];
        const treeData = list || unref(treeDataRef);
        const { key: keyField, children: childrenField } = unref(getFieldNames);
        if (!childrenField || !keyField)
            return keys;
        for (let index = 0; index < treeData.length; index++) {
            const node = treeData[index];
            node.disabled !== true && node.selectable !== false && keys.push(node[keyField]);
            const children = node[childrenField];
            if (children && children.length) {
                keys.push(...getEnabledKeys(children));
            }
        }
        return keys;
    }
    function getChildrenKeys(nodeKey, list) {
        const keys = [];
        const treeData = list || unref(treeDataRef);
        const { key: keyField, children: childrenField } = unref(getFieldNames);
        if (!childrenField || !keyField)
            return keys;
        for (let index = 0; index < treeData.length; index++) {
            const node = treeData[index];
            const children = node[childrenField];
            if (nodeKey === node[keyField]) {
                keys.push(node[keyField]);
                if (children && children.length) {
                    keys.push(...getAllKeys(children));
                }
            }
            else {
                if (children && children.length) {
                    keys.push(...getChildrenKeys(nodeKey, children));
                }
            }
        }
        return keys;
    }
    function updateNodeByKey(key, node, list) {
        if (!key)
            return;
        const treeData = list || unref(treeDataRef);
        const { key: keyField, children: childrenField } = unref(getFieldNames);
        if (!childrenField || !keyField)
            return;
        for (let index = 0; index < treeData.length; index++) {
            const element = treeData[index];
            const children = element[childrenField];
            if (element[keyField] === key) {
                treeData[index] = { ...treeData[index], ...node };
                break;
            }
            else if (children && children.length) {
                updateNodeByKey(key, node, element[childrenField]);
            }
        }
    }
    function filterByLevel(level = 1, list, currentLevel = 1) {
        if (!level) {
            return [];
        }
        const res = [];
        const data = list || unref(treeDataRef) || [];
        for (let index = 0; index < data.length; index++) {
            const item = data[index];
            const { key: keyField, children: childrenField } = unref(getFieldNames);
            const key = keyField ? item[keyField] : '';
            const children = childrenField ? item[childrenField] : [];
            res.push(key);
            if (children && children.length && currentLevel < level) {
                currentLevel += 1;
                res.push(...filterByLevel(level, children, currentLevel));
            }
        }
        return res;
    }
    function insertNodeByKey({ parentKey = null, node, push = 'push' }) {
        const treeData = cloneDeep(unref(treeDataRef));
        if (!parentKey) {
            treeData[push](node);
            treeDataRef.value = treeData;
            return;
        }
        const { key: keyField, children: childrenField } = unref(getFieldNames);
        if (!childrenField || !keyField)
            return;
        forEach(treeData, treeItem => {
            if (treeItem[keyField] === parentKey) {
                treeItem[childrenField] = treeItem[childrenField] || [];
                treeItem[childrenField][push](node);
                return true;
            }
        });
        treeDataRef.value = treeData;
    }
    function insertNodesByKey({ parentKey = null, list, push = 'push' }) {
        const treeData = cloneDeep(unref(treeDataRef));
        if (!list || list.length < 1) {
            return;
        }
        if (!parentKey) {
            for (let i = 0; i < list.length; i++) {
                treeData[push](list[i]);
            }
            treeDataRef.value = treeData;
            return;
        }
        else {
            const { key: keyField, children: childrenField } = unref(getFieldNames);
            if (!childrenField || !keyField)
                return;
            forEach(treeData, treeItem => {
                if (treeItem[keyField] === parentKey) {
                    treeItem[childrenField] = treeItem[childrenField] || [];
                    for (let i = 0; i < list.length; i++) {
                        treeItem[childrenField][push](list[i]);
                    }
                    treeDataRef.value = treeData;
                    return true;
                }
            });
        }
    }
    function deleteNodeByKey(key, list) {
        if (!key)
            return;
        const treeData = list || unref(treeDataRef);
        const { key: keyField, children: childrenField } = unref(getFieldNames);
        if (!childrenField || !keyField)
            return;
        for (let index = 0; index < treeData.length; index++) {
            const element = treeData[index];
            const children = element[childrenField];
            if (element[keyField] === key) {
                treeData.splice(index, 1);
                break;
            }
            else if (children && children.length) {
                deleteNodeByKey(key, element[childrenField]);
            }
        }
    }
    function getSelectedNode(key, list, selectedNode) {
        if (!key && key !== 0)
            return null;
        const treeData = list || unref(treeDataRef);
        const { key: keyField, children: childrenField } = unref(getFieldNames);
        if (!keyField)
            return null;
        treeData.forEach(item => {
            if (selectedNode?.key || selectedNode?.key === 0)
                return selectedNode;
            if (item[keyField] === key) {
                selectedNode = item;
                return;
            }
            if (item[childrenField] && item[childrenField].length) {
                selectedNode = getSelectedNode(key, item[childrenField], selectedNode);
            }
        });
        return selectedNode || null;
    }
    return {
        deleteNodeByKey,
        insertNodeByKey,
        insertNodesByKey,
        filterByLevel,
        updateNodeByKey,
        getAllKeys,
        getChildrenKeys,
        getEnabledKeys,
        getSelectedNode
    };
}
