import { Component, createPlatform, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DtoForgetPassword } from 'Dto/DtoForgetPassword';
import { DtoResetPassword } from 'Dto/DtoResetPassword';
import { confirmPassword } from 'src/app/Common';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public showSuccess:boolean = false;
  public showError:boolean = false;
  public errorMessage!:string;
  public ResetPasswordForm:FormGroup = new FormGroup({});
  public barLabel: string = 'Password strength:';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public thresholds = [90, 75, 45, 25];
  public strengthLabels = [
    '(Bad Choice)',
    '(Weak)',
    '(Normal)',
    '(Strong)',
    '(Great!)',
  ];
  public token!:string;
  public email!:string;
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private service:AuthenticationService) { }


  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
    if(this.token == undefined && this.email == undefined)
      this.router.navigate(['/login']);
   this.createForm();
  }
  createForm(){
    this.ResetPasswordForm =  this.fb.group(
      {
        Password: ['',[Validators.required,Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/),],],
        confirmPassword: ['',[Validators.required,Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/),],],
      },
      {
        validator: confirmPassword('Password', 'confirmPassword'),
      }
    )
  }
  get Password() {
    return this.ResetPasswordForm.get('Password');
  }
  get ConfirmPassword() {
    return this.ResetPasswordForm.get('confirmPassword');
  }
  resetPassword(formValue:any){
 
    var resetPassword:DtoResetPassword = {
      password: formValue.Password,
      confirmPassword:formValue.confirmPassword,
      email:this.email,
      token:this.token
    }
    this.service.ResetPassword(resetPassword).subscribe(
      data=>{
        if(data.statusCode == 200)
          {
            this.showSuccess = true;
          this.showError = false;
        }
        else  if(data.statusCode == 203){
            this.errorMessage = "Token Already Used Or Expired, ";
            this.showError = true;
            this.showSuccess = false;
        }
        else{
          this.errorMessage = "Sorry, the Password is not Updated,";
          this.showError = true;
          this.showSuccess = false;
        }

      },
      error=>{
        this.errorMessage = "Sorry, the Password is not Updated try again";
          this.showError = true;
          this.showSuccess = false;
      }
    )
  }
}
