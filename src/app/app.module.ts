import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng9PasswordStrengthBarModule } from 'ng9-password-strength-bar';
import { MaterialExampleModule } from 'src/material.module';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';
import { TokenIntercepterService } from './token-intercepter.service';
import { UserAuthGuard } from './user-auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng9PasswordStrengthBarModule,
    MaterialExampleModule
  ],
  providers: [AuthGuard,UserAuthGuard,AuthenticationService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi:true
    },{ 
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
