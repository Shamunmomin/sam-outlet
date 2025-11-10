import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/login/model/user';
import { AuthService } from 'src/app/servie/authservice/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user:any=<User>{};
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  

  register(){
    this.authService.register(this.user)
    .subscribe((response)=>{
      this.router.navigate(['']);   
    },
      (error: HttpErrorResponse) => {  // Properly typed error handling
        this.errorMessage = error.error?.message || 'User alredy exists please login';
      }
  );   
    }

}
