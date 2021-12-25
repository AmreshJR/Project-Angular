import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlPanelComponent } from './Admin/admin-control-panel/admin-control-panel.component';
import { EditTeamComponent } from './Admin/edit-team/edit-team.component';
import { TeamDeatilComponent } from './Admin/team-deatil/team-deatil.component';

import { LoginComponent } from './Auth-pages/login/login.component';
import { RegistrationComponent } from './Auth-pages/registration/registration.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './User/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'signup', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminControlPanelComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'teamdetails', component: TeamDeatilComponent },
      { path: 'editteam', component: EditTeamComponent },
    ],
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
];
