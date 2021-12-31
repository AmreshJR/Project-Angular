import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{
  constructor(private authservice: AuthenticationService) {  }
  intercept(req:any, next:any) {
    let token = this.authservice.getToken();
    let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return next.handle(tokenizedReq);
  }
}
