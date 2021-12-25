import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllUserDto } from 'Dto/AllUserDto';
import { DtoPage } from 'Dto/DtoPage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUser(pageData:DtoPage):Observable<any>{
     
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.post<AllUserDto>(`${environment.BaseURL}api/Administrator/GetAllUser`,pageData,{ headers: headers, responseType: 'json'} );

  }
  
  getAllRole():Observable<any>{
     
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.get<any>(`${environment.BaseURL}api/Administrator/GetAllRoles`,{ headers: headers, responseType: 'json'} );

  }
  getLength(){
    return this.http.get<string>(`${environment.BaseURL}api/Administrator/GetLength`);
  }
  getTeamLead(role:any):Observable<any>{
     
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.post<any>(`${environment.BaseURL}api/Administrator/UserByRole`,role,{ headers: headers, responseType: 'json'} );

  }
  getTeam(team:any):Observable<any>{
     
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.post<any>(`${environment.BaseURL}api/Administrator/TeamUnderLead`,team,{ headers: headers, responseType: 'json'} );

  }
  getInactive():Observable<any>{
     
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.get<any>(`${environment.BaseURL}api/Administrator/InActiveEmployee`,{ headers: headers, responseType: 'json'} );

  }
  getTeamType():Observable<any>{
     
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
      );
      return this.http.get<any>(`${environment.BaseURL}api/Administrator/GetTeamList`,{ headers: headers, responseType: 'json'} );

  }
}
