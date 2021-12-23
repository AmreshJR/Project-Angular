import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { DtoSignUp } from './Auth-pages/registration/DtoSignUp';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  addNewUser(userData: DtoSignUp){
    
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.post<any>(`${environment.BaseURL}api/Account/Register`,userData,{ headers: headers } );

  }
  encryptData(data: string) {
    var keySize = 256;
    var salt = CryptoJS.lib.WordArray.random(16);
    var key = CryptoJS.PBKDF2('b14ca5898a4e4133bbce2ea2315a1916', salt, {
      keySize: keySize / 32,
      iterations: 100,
    });

    var iv = CryptoJS.lib.WordArray.random(128 / 8);

    var encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    var result = CryptoJS.enc.Base64.stringify(
      salt.concat(iv).concat(encrypted.ciphertext)
    );

    return result;
  }
  decryptData(ciphertextB64: string) {
    var key = CryptoJS.enc.Utf8.parse('b14ca5898a4e4133bbce2ea2315a1916');
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
    var decrypted = CryptoJS.AES.decrypt(ciphertextB64, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
