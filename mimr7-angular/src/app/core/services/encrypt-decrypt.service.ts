import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AESEncryptDecryptService {

  constructor() { }

  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, environment.privateKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, environment.privateKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
