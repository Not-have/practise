import { h, toRaw } from 'vue';
import EditableCell from './EditableCell.vue';
import { isArray } from '@/utils/is';
export function renderEditCell(column) {
    return ({ text: value, record, index }) => {
        toRaw(record).onValid = async () => {
            if (isArray(record?.validCbs)) {
                const validFns = (record?.validCbs || []).map(fn => fn());
                const res = await Promise.all(validFns);
                return res.every(item => !!item);
            }
            else {
                return false;
            }
        };
        toRaw(record).onEdit = async (edit, submit = false) => {
            if (!submit) {
                record.editable = edit;
            }
            if (!edit && submit) {
                if (!(await record.onValid()))
                    return false;
                const res = await record.onSubmitEdit?.();
                if (res) {
                    record.editable = false;
                    return true;
                }
                return false;
            }
            if (!edit && !submit) {
                record.onCancelEdit?.();
            }
            return true;
        };
        return h(EditableCell, {
            value,
            record,
            column,
            index
        });
    };
}
