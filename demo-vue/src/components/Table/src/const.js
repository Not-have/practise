import componentSetting from '@/settings/componentSetting';
const { table } = componentSetting;
const { pageSizeOptions, defaultPageSize, fetchSetting, defaultSize, defaultSortFn, defaultFilterFn } = table;
export const ROW_KEY = 'key';
export const PAGE_SIZE_OPTIONS = pageSizeOptions;
export const PAGE_SIZE = defaultPageSize;
export const FETCH_SETTING = fetchSetting;
export const DEFAULT_SIZE = defaultSize;
export const DEFAULT_SORT_FN = defaultSortFn;
export const DEFAULT_FILTER_FN = defaultFilterFn;
export const DEFAULT_ALIGN = 'center';
export const INDEX_COLUMN_FLAG = 'INDEX';
export const ACTION_COLUMN_FLAG = 'ACTION';
