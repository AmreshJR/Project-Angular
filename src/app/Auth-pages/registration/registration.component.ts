import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { confirmPassword } from '../../Common'
import { DtoSignUp } from './DtoSignUp';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  SignUpForm: FormGroup = new FormGroup({});
  // Password: FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder ,private router: Router,private authService: AuthenticationService ) { }

public barLabel: string = "Password strength:";
public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
public thresholds = [90, 75, 45, 25];
public strengthLabels = ['(Bad Choice)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
public modelMessage:string | undefined;
  ngOnInit(): void {
    
    this.SignUpForm = this.fb.group({
      UserName:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9][A-Za-z0-9 \.\-_]*[A-Za-z0-9]$/)]],
      FirstName: ['',[Validators.required,Validators.pattern(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)]],
      LastName: ['',[Validators.required,Validators.pattern(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)]],
      Email:['',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      DOB:['',[Validators.required]],
      passwords: this.fb.group({
        Password:['',[Validators.required,Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)]],
        confirmPassword:['',[Validators.required,Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)]]
      },{
        validator: confirmPassword("Password","confirmPassword")
      }),
      Address:['',[Validators.required]]
     
    })
  }
  get FirstName(){
    return this.SignUpForm.get("FirstName");
  }
  get LastName(){
    return this.SignUpForm.get("LastName");
  }
  get Email(){
    return this.SignUpForm.get("Email");
  }
  get DOB(){
    return this.SignUpForm.get("DOB");
  }
  get Password(){
    return this.SignUpForm.get("passwords.Password")
  }
  get ConfirmPassword(){
    return this.SignUpForm.get("passwords.confirmPassword");
  }
  get DBO(){
    return this.SignUpForm.get("DOB");
  }
  get userName(){
    return this.SignUpForm.get("UserName");
  }
  get Address(){
    return this.SignUpForm.get("Address");
  }
  onSubmit(){
    // var password = this.authService.encryptData(this.SignUpForm.value.passwords.Password);
    var newUser : DtoSignUp = {
         userName:this.SignUpForm.value.UserName,
         firstName: this.SignUpForm.value.FirstName,
         lastName: this.SignUpForm.value.LastName,
         email: this.SignUpForm.value.Email,
         password: this.SignUpForm.value.passwords.Password,
         dob: this.SignUpForm.value.DOB,
         address: this.SignUpForm.value.Address
    }
    console.log(newUser);
  //   this.authService.addNewUser(newUser).subscribe(data=>{
  //   console.log(data);
  //   this.modelMessage = data.message;
  // });
  }
  onFocusOut(event:any){
    console.log(event.target.value);
  }
  redirect(){
    this.router.navigate(["/Login"]);
  }
  reload(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
