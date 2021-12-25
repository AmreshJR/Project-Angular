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
import { HomeComponent } from './User/user-profile/home/home.component';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';
import { TokenIntercepterService } from './token-intercepter.service';
import { TeamDeatilComponent } from './Admin/team-deatil/team-deatil.component';
import { EditTeamComponent } from './Admin/edit-team/edit-team.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    HomeComponent,
    TeamDeatilComponent,
    EditTeamComponent,
   
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
  providers: [AuthGuard,AuthenticationService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi:true
    },{ 
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
