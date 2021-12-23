import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllUserDto } from 'Dto/AllUserDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUser():Observable<any>{
     
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.get<AllUserDto>(`${environment.BaseURL}api/Administrator/GetAllUser`,{ headers: headers, responseType: 'json'} );

  }
  
  getAllRole():Observable<any>{
     
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.get<any>(`${environment.BaseURL}api/Administrator/GetAllRoles`,{ headers: headers, responseType: 'json'} );

  }
}
