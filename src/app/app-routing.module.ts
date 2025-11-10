import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignupComponent } from './login/signup/signup.component';
import { SigninComponent } from './login/signin/signin.component';
import { UserModule } from './user/user.module';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"signup", component:SignupComponent
  },
  {
    path:"signin", component:SigninComponent
  },
  {
    path:"user",loadChildren: ()=> import('./user/user.module').then(m=> m.UserModule)
  },
  {
    path:"admin", loadChildren: ()=> import('./admin/admin.module').then(m=> m.AdminModule)
  },
  {
    path:"forget-password", component:ForgotPasswordComponent
  },
  {
    path:"reset-password", component:ResetPasswordComponent
  },
  {
    path:"**", component:NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
