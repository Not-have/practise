import { ROW_KEY } from './const';
export function parseRowKey(rowKey, record, autoCreateKey) {
    if (autoCreateKey) {
        return ROW_KEY;
    }
    else {
        if (typeof rowKey === 'string') {
            return rowKey;
        }
        else if (rowKey) {
            return rowKey(record);
        }
        else {
            return ROW_KEY;
        }
    }
}
export function parseRowKeyValue(rowKey, record, autoCreateKey) {
    return record[parseRowKey(rowKey, record, autoCreateKey)];
}
