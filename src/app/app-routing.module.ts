import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { AdminAuthGuard } from './services/auth-guard/admin-auth/admin-auth';
import { AuthGuard } from './services/auth-guard/auth-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'no-access', component: NoAccessComponent },
  { path: 'logout', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
