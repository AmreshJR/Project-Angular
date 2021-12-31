import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoUpdateProfileData } from 'Dto/DtoUpdateProfileData';
import { Profile } from 'Dto/profile';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.get<any>(
      `${environment.BaseURL}api/User/GetUserProfileDetails?UserId=${userId}`,
      { headers: headers, responseType: 'json' }
    );
  }
  uploadUserProfileImage(data: any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<any>(
      `${environment.BaseURL}api/User/UploadImage`,
      data
    );
  }
  UpdateUserProfileData(data: DtoUpdateProfileData) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<any>(
      `${environment.BaseURL}api/User/UpdateUserProfileDetail`,
      data
    );
  }
  ConfirmPassword(data: any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<any>(
      `${environment.BaseURL}api/User/CheckUserPassword`,
      data
    );
  }
  getTeamLead(role: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.post<any>(
      `${environment.BaseURL}api/Administrator/UserByRole`,
      role,
      { headers: headers, responseType: 'json' }
    );
  }
  getTeamType(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.get<any>(
      `${environment.BaseURL}api/Administrator/GetTeamList`,
      { headers: headers, responseType: 'json' }
    );
  }
  WithoutFilter() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.get<any>(
      `${environment.BaseURL}api/Home/GetWithoutFilter`
    );
  }
  FilterByDate(data:any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<any>(
      `${environment.BaseURL}api/Home/FilterByDate`,data
    );
  }
  FilterByTeamLead(data:any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<any>(
      `${environment.BaseURL}api/Home/FilterByTeamLead`,data
    );
  }
  FilterByTeam(data:any) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<any>(
      `${environment.BaseURL}api/Home/FilterByTeam`,data
    );
  }
 
}
