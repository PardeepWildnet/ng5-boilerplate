import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NoContentComponent } from './components/no-content/no-content.component';

const routes: Routes = [
  { path: "", component: AppComponent},
  { path: "login", component: LoginComponent},
  { path: "forgot-password", component: ForgotPasswordComponent},
  { path: "reset-password", component: ResetPasswordComponent},
  { path: "**", component: NoContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
