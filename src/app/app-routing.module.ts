import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlPanelComponent } from './admin-control-panel/admin-control-panel.component';
import { LoginComponent } from './Auth-pages/login/login.component';
import { RegistrationComponent } from './Auth-pages/registration/registration.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';

const routes: Routes = [
  {path:'signup',component: RegistrationComponent},
    {path:'login',component: LoginComponent},
    {path:'admin',component:AdminControlPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  LoginComponent,
  RegistrationComponent,
  UserProfileComponent,
  AdminControlPanelComponent
];

