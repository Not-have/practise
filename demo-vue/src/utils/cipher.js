import { decrypt as aesDecrypt, encrypt as aesEncrypt } from 'crypto-js/aes';
import UTF8, { parse } from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import CTR from 'crypto-js/mode-ctr';
import Base64 from 'crypto-js/enc-base64';
import MD5 from 'crypto-js/md5';
import SHA256 from 'crypto-js/sha256';
import SHA512 from 'crypto-js/sha512';
class AesEncryption {
    key;
    iv;
    constructor({ key, iv }) {
        this.key = parse(key);
        this.iv = parse(iv);
    }
    get getOptions() {
        return {
            mode: CTR,
            padding: pkcs7,
            iv: this.iv
        };
    }
    encrypt(plainText) {
        return aesEncrypt(plainText, this.key, this.getOptions).toString();
    }
    decrypt(cipherText) {
        return aesDecrypt(cipherText, this.key, this.getOptions).toString(UTF8);
    }
}
class Base64Encryption {
    static instance;
    constructor() { }
    static getInstance() {
        if (!Base64Encryption.instance) {
            Base64Encryption.instance = new Base64Encryption();
        }
        return Base64Encryption.instance;
    }
    encrypt(plainText) {
        return UTF8.parse(plainText).toString(Base64);
    }
    decrypt(cipherText) {
        return Base64.parse(cipherText).toString(UTF8);
    }
}
class MD5Hashing {
    static instance;
    constructor() { }
    static getInstance() {
        if (!MD5Hashing.instance) {
            MD5Hashing.instance = new MD5Hashing();
        }
        return MD5Hashing.instance;
    }
    hash(plainText) {
        return MD5(plainText).toString();
    }
}
class SHA256Hashing {
    static instance;
    constructor() { }
    static getInstance() {
        if (!SHA256Hashing.instance) {
            SHA256Hashing.instance = new SHA256Hashing();
        }
        return SHA256Hashing.instance;
    }
    hash(plainText) {
        return SHA256(plainText).toString();
    }
}
class SHA512Hashing {
    static instance;
    constructor() { }
    static getInstance() {
        if (!SHA512Hashing.instance) {
            SHA512Hashing.instance = new SHA512Hashing();
        }
        return SHA512Hashing.instance;
    }
    hash(plainText) {
        return SHA512(plainText).toString();
    }
}
export class EncryptionFactory {
    static createAesEncryption(params) {
        return new AesEncryption(params);
    }
    static createBase64Encryption() {
        return Base64Encryption.getInstance();
    }
}
export class HashingFactory {
    static createMD5Hashing() {
        return MD5Hashing.getInstance();
    }
    static createSHA256Hashing() {
        return SHA256Hashing.getInstance();
    }
    static createSHA512Hashing() {
        return SHA512Hashing.getInstance();
    }
}
