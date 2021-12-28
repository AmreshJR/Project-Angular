import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlPanelComponent } from './Admin/admin-control-panel/admin-control-panel.component';
import { TeamDeatilComponent } from './Admin/team-deatil/team-deatil.component';

import { LoginComponent } from './Auth-pages/login/login.component';
import { RegistrationComponent } from './Auth-pages/registration/registration.component';
import { AuthGuard } from './auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { HomeComponent } from './User/home/home.component';
import { UserProfileComponent } from './User/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserAuthGuard],
    children: [
      {
        path: 'profile',
        component: UserProfileComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminControlPanelComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'teamdetails', component: TeamDeatilComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [
  LoginComponent,
  RegistrationComponent,
  UserProfileComponent,
  AdminControlPanelComponent,
  HomeComponent,
  TeamDeatilComponent,
  UserProfileComponent,
];
