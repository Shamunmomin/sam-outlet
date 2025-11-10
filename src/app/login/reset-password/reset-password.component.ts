import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/servie/admin-service/admin.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  errorMsg:string='';
  token:string='';
  password:string='';
  confirmPassword:string='';

  constructor(private adminService:AdminService,
              private route:ActivatedRoute,
              private router:Router
  ){}

    ngOnInit(): void {
      this.token = this.route.snapshot.queryParamMap.get('token') || '';
    //  console.log("Token:", this.token);
    this.checkTokenInUrl();
  }

  checkTokenInUrl(){
    this.adminService.resetPasswordUrl(this.token)
    .subscribe({
      next:(response)=>{
         if (response === false) {
            this.errorMsg = 'Your link is invalid or expired !!';
            setTimeout(() => {
          this.errorMsg=''
        }, 4000);
      }
      }
    })
  }


  resetPassword(){
    if (this.password !== this.confirmPassword) {
      this.errorMsg=('Passwords do not match!');
      setTimeout(() => {
        this.errorMsg='';
      }, 4000);
      return;
    }
    this.adminService.resetNewPassword(this.token,this.password)
    .subscribe({
      next:(response)=>{
            if(response === true){
               this.router.navigate(['/signin']);
            }else{
              this.errorMsg="Invalid token or Password is not save";
              setTimeout(() => {
                this.errorMsg='';
              }, 4000);
            }
      },
      error:(error)=>{
        this.errorMsg='Server error. Please try again.';
        setTimeout(() => {
          this.errorMsg='';
        }, 4000);
      }
    });
  }

}
