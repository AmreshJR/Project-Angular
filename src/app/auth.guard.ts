import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { authRole } from './config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private route: Router){

  }
  canActivate( ): boolean{

    const user = this.authService.UserObject();
    const token = this.authService.isLogged();

    if(user.isAdmin && authRole.SuperUser.includes(user.role) && token)

      return true;
      
      else
      {
        this.route.navigate(['/login']);
        return false;
      }     
  }
  
}
