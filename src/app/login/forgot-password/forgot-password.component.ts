import { Component } from '@angular/core';
import { AdminService } from 'src/app/servie/admin-service/admin.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
       
  email:string='';
  succMsg:string='';
  errorMsg:string='';

  constructor(private adminService:AdminService){}

  passwordForgot(){
    this.adminService.forgotPassword(this.email)
    .subscribe({
      next:(response)=>{
        // console.log(response);
          if (response === true) {
            this.succMsg = 'Password reset link sent to your email.';
            setTimeout(() => {
          this.succMsg=''
        }, 4000);
          } else {
            this.errorMsg = 'Invalid email!';
             setTimeout(() => {
          this.errorMsg=''
        }, 4000);
          }
      },
      error:(error)=>{
        this.errorMsg='something went wrong on server';
        setTimeout(() => {
          this.errorMsg=''
        }, 4000);
      }
    })
  }

}
