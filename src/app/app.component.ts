import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Project';
  isAdmin!: boolean;
  isLoading: boolean = false;
  isLogged!:boolean;
  public ImageUrl: string = '../assets/78-785827_user-profile-avatar-login-account-male-user-icon.png';

  constructor(
    public route: Router,
    private service: AuthenticationService,
    private userService: UserService,
    public router: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.isLogged = this.service.isLogged();
    if(this.isLogged == true)
    {
      this.isAdmin = this.service.UserObject().isAdmin;
      this.service.getUserProfile().subscribe(
        (data) => {
          this.isLoading = true;
          if(data.dbPath != null)
          this.ImageUrl = `https://localhost:44362/${data.dbPath}`;
          else
          this.ImageUrl = '../assets/78-785827_user-profile-avatar-login-account-male-user-icon.png';

          this.isLoading = false;
        },
        (err) => {
          this.ImageUrl =
            '../assets/78-785827_user-profile-avatar-login-account-male-user-icon.png';
        }
      );
    }
   
  }

  isValidRoute() {
    if (
      this.route.url.includes('/admin') ||
      this.route.url.includes('/login') ||
      this.route.url.includes('/signup')||
      this.route.url.includes('/forgetpassword') ||
      this.route.url.includes('/resetpassword')
    )
      return false;
    else return true;
  }
  logout() {
    this.service.LogOut();
  }
}
