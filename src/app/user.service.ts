import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
