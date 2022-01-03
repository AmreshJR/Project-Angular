import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DtoForgetPassword } from 'Dto/DtoForgetPassword';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  public errorMessage!: string;
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public successMessage!: string;
  public ForgetPasswordForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private service: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.service.isLogged()) this.router.navigate(['/home']);
    this.createForm();
  }
  createForm() {
    this.ForgetPasswordForm = this.fb.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
    });
  }
  get Email() {
    return this.ForgetPasswordForm.get('Email');
  }
  forgotPassword(data: any) {
    var passwordReset: DtoForgetPassword = {
      email: data.Email,
      clientURI: 'http://localhost:4200/resetpassword',
    };
    this.service.ForgetPassword(passwordReset).subscribe((data) => {
      if (data.statusCode == 200) {
        this.showSuccess = true;
        this.showError = false;
      } else if (data.statusCode == 204) {
        this.errorMessage = 'The Email Id Does Not exist, Use Different Email.';
        this.showError = true;
        this.showSuccess = false;
      } else {
        this.errorMessage = 'There is Some Techinacll Issue, Try again later.';
        this.showError = true;
        this.showSuccess = false;
      }
    });
  }
}
