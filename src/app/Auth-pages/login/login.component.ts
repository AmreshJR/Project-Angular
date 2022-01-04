import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/authentication.service';
import { NotificationService } from 'src/Helper/notification.service';
import { DtoLogIn } from './DtoLogIn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public status!: boolean;
  public isLoading: boolean = false;
  LoginForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private authService: AuthenticationService,
    private notify:NotificationService
  ) {}
  public enc!: string;
  public dc!: string;
  ngOnInit(): void {
    if (this.authService.isLogged() == true) this.router.navigate(['/home']);
    this.LoginForm = this.fb.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      Password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
          ),
        ],
      ],
    });
  }
  get Email() {
    return this.LoginForm.get('Email');
  }
  get Password() {
    return this.LoginForm.get('Password');
  }
  signUpRedirect() {
    this.router.navigate(['/signup']);
  }
  onSubmit() {
    var user: DtoLogIn = {
      email: this.LoginForm.value.Email,
      password: this.LoginForm.value.Password,
    };
    this.isLoading = true;
    this.authService.logIn(user).subscribe(
      (data) => {
        if (data.status == 200) {
          const token: string = data.result.token;
          const tokenExp = data.result.tokenExp;
          localStorage.setItem('jwt', token);
          localStorage.setItem('tokeExpiration', tokenExp);
          this.authService.saveUser(token);
          this.router.navigate(['/home']);
          this.status = false;
          this.isLoading = false;
        } else {
          this.isLoading=false;
          this.notify.showError("Invalid Password OR Email","Authentication Failed");
          this.status = true;
        }
      },
      (err) => {
        this.isLoading=false;
        this.notify.showError("Invalid Password OR Email","Authentication Failed");
        this.status = true;
      }
    );
  }
}
