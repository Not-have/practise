import { cacheCipher } from '@/settings/encryptionSetting';
import { isNil } from '@/utils/is';
import { EncryptionFactory } from '@/utils/cipher';
export const createStorage = ({ prefixKey = '', storage = sessionStorage, key = cacheCipher.key, iv = cacheCipher.iv, timeout = null, hasEncrypt = true } = {}) => {
    if (hasEncrypt && [key.length, iv.length].some(item => item !== 16)) {
        throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
    }
    const persistEncryption = EncryptionFactory.createAesEncryption({
        key: cacheCipher.key,
        iv: cacheCipher.iv
    });
    const WebStorage = class WebStorage {
        storage;
        prefixKey;
        encryption;
        hasEncrypt;
        constructor() {
            this.storage = storage;
            this.prefixKey = prefixKey;
            this.encryption = persistEncryption;
            this.hasEncrypt = hasEncrypt;
        }
        getKey(key) {
            return `${this.prefixKey}${key}`.toUpperCase();
        }
        set(key, value, expire = timeout) {
            const stringData = JSON.stringify({
                value,
                time: Date.now(),
                expire: !isNil(expire) ? new Date().getTime() + expire * 1000 : null
            });
            const stringifyValue = this.hasEncrypt
                ? this.encryption.encrypt(stringData)
                : stringData;
            this.storage.setItem(this.getKey(key), stringifyValue);
        }
        get(key, def = null) {
            const val = this.storage.getItem(this.getKey(key));
            if (!val)
                return def;
            try {
                const decVal = this.hasEncrypt ? this.encryption.decrypt(val) : val;
                const data = JSON.parse(decVal);
                const { value, expire } = data;
                if (isNil(expire) || expire >= new Date().getTime()) {
                    return value;
                }
                this.remove(key);
            }
            catch (e) {
                return def;
            }
        }
        remove(key) {
            this.storage.removeItem(this.getKey(key));
        }
        clear() {
            this.storage.clear();
        }
    };
    return new WebStorage();
};
