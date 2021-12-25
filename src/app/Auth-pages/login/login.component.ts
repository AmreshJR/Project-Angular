import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/authentication.service';
import { DtoLogIn } from './DtoLogIn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   public status!:boolean;
  LoginForm : FormGroup =new FormGroup({});
  constructor(private fb : FormBuilder,private jwtHelper :JwtHelperService,private router:  Router, private authService: AuthenticationService) { }
  public enc!: string;
  public dc!:string;
  ngOnInit(): void {
    // if(this.authService.isLogged() == true)
    // this.router.navigate(['/userDetails']);
    this.enc = this.authService.encryptData("#TESTtest1")
    console.log(this.enc);
    this.dc = this.authService.decryptData(this.enc);
    console.log(this.dc);
    this.LoginForm = this.fb.group({
      Email : ['',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      Password : ['',[Validators.required,Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)]]
    })

  }
  get Email(){
    return this.LoginForm.get("Email");
  }
  get Password(){
    return this.LoginForm.get("Password");
  }
signUpRedirect(){
  this.router.navigate(['/signup']);
}
onSubmit(){
  
  var user: DtoLogIn = {
    email: this.LoginForm.value.Email,
    password: this.LoginForm.value.Password
  }

  this.authService.logIn(user).subscribe
  (data=>{
    const token:string = data.result.token;
    const tokenExp = data.result.tokenExp
    localStorage.setItem("jwt",token);
    localStorage.setItem("tokeExpiration",tokenExp)
    const parseJwt = JSON.parse(atob(token.split('.')[1]));
    const userData =this.authService.encryptData(JSON.stringify({ 
      isAdmin: 'Manager' === parseJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      id: parseJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"],
      role: parseJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      }));
      localStorage.setItem('currentUser',userData);
      this.authService.UserObject();
    // this.router.navigate(['/userDetails']);
    this.status = false;
  },err=>{
    this.status = true;
  });
 
}

}
