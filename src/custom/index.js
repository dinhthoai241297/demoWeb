import CryptoJS from 'crypto-js';
import { ENCRYPTKEY } from '../contants/index';

export function aesDecrypt(str) {
    return JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(str, CryptoJS.enc.Base64.parse(btoa(ENCRYPTKEY)), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })));
}

export function aesEncrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Base64.parse(btoa(ENCRYPTKEY)), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
}
