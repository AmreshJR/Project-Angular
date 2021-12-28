import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}
  canActivate(): boolean {
    const token = this.authService.isLogged();
    if (token) return true;
    else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
