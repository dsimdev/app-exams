import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { DashboardUserComponent } from './pages/user/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'dashboard-user',
    component: DashboardUserComponent,
    pathMatch: 'full',
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
