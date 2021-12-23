import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng9PasswordStrengthBarComponent, Ng9PasswordStrengthBarModule } from 'ng9-password-strength-bar';
import { MaterialExampleModule } from 'src/material.module';
import { AdminControlPanelComponent } from './admin-control-panel/admin-control-panel.component';
import { HomeComponent } from './User/user-profile/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    HomeComponent,
   
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
