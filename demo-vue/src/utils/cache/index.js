import { getStorageShortName } from '@/utils/env';
import { createStorage as create } from './storageCache';
import { SHOULD_ENABLE_STORAGE_ENCRYPTION, DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting';
const createOptions = (storage, options = {}) => {
    return {
        hasEncrypt: SHOULD_ENABLE_STORAGE_ENCRYPTION,
        storage,
        prefixKey: getStorageShortName(),
        ...options
    };
};
export const WebStorage = create(createOptions(sessionStorage));
export const createStorage = (storage = sessionStorage, options = {}) => {
    return create(createOptions(storage, options));
};
export const createSessionStorage = (options = {}) => {
    return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};
export const createLocalStorage = (options = {}) => {
    return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};
export default WebStorage;
