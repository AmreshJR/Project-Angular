import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { DtoLoginResponse } from 'Dto/DtoLoginResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DtoLogIn } from './Auth-pages/login/DtoLogIn';
import { DtoSignUp } from './Auth-pages/registration/DtoSignUp';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient,private jwtHelper :JwtHelperService) {}

  addNewUser(userData: DtoSignUp){
    
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.post<any>(`${environment.BaseURL}api/Account/Register`,userData,{ headers: headers } );

  }
  logIn(userData: DtoLogIn){
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.post<any>(`${environment.BaseURL}api/Account/Login`,userData,{ headers: headers } );

  }
  isLogged(){
    return !!localStorage.getItem("jwt");
  }
  getToken(){
    return localStorage.getItem("jwt");
  }
  LogOut(){
    localStorage.removeItem("jwt");
  }
  UserObject(){
    const encData = localStorage.getItem("currentUser")
    const stringUser:any =this.decryptData(encData);
    const user = JSON.parse(stringUser);
    return user;
  }
  encryptData(data: string) {
    
    var result = CryptoJS.AES.encrypt(data.trim(), 'b14ca5898a4e4133bbce2ea2315a1916').toString();  
    return result;
  }
  decryptData(ciphertextB64: any) {
    var result =  CryptoJS.AES.decrypt(ciphertextB64.trim(),'b14ca5898a4e4133bbce2ea2315a1916').toString(CryptoJS.enc.Utf8);
    return result;
  }
}
