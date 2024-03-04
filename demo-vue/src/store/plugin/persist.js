import { createPersistedState } from 'pinia-plugin-persistedstate';
import { getCommonStoragePrefix } from '@/utils/env';
import { EncryptionFactory } from '@/utils/cipher';
import { cacheCipher, SHOULD_ENABLE_STORAGE_ENCRYPTION } from '@/settings/encryptionSetting';
export const PERSIST_KEY_PREFIX = getCommonStoragePrefix();
const persistEncryption = EncryptionFactory.createAesEncryption({
    key: cacheCipher.key,
    iv: cacheCipher.iv
});
function customSerializer(shouldEnableEncryption) {
    if (shouldEnableEncryption) {
        return {
            deserialize: value => {
                const decrypted = persistEncryption.decrypt(value);
                return JSON.parse(decrypted);
            },
            serialize: value => {
                const serialized = JSON.stringify(value);
                return persistEncryption.encrypt(serialized);
            }
        };
    }
    else {
        return {
            deserialize: value => {
                return JSON.parse(value);
            },
            serialize: value => {
                return JSON.stringify(value);
            }
        };
    }
}
export function registerPiniaPersistPlugin(pinia) {
    pinia.use(createPersistedState(createPersistedStateOptions(PERSIST_KEY_PREFIX)));
}
export function createPersistedStateOptions(keyPrefix) {
    return {
        storage: localStorage,
        key: id => `${keyPrefix}__${id}`,
        serializer: customSerializer(SHOULD_ENABLE_STORAGE_ENCRYPTION)
    };
}
