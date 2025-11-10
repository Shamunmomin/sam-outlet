import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servie/authservice/auth.service';
import { LocalStorageService } from 'src/app/servie/storage-service/local-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  credentials = { username: '', password: '' };
  errorMessage: string = '';
  isSpinning=false;

  constructor(private authService:  AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe((res:any) =>{ 
      // console.log(res)
      this.isSpinning= false;
      if (LocalStorageService.isAdminLoggedIn()) {
        this.router.navigate(["/admin"]);
      } else if (LocalStorageService.isUserLoggedIn()) {
        console.log("Detected role: USER");
        this.router.navigate([""]);
      } else {
        this.errorMessage = "Unknown role";
        console.log("Role check failed");
      }
    },
   error => {
  this.isSpinning = false;
  if (error.error && error.error.message) {
        this.errorMessage = error.error.message; // <-- show backend message
      } else {
        // fallback message for unknown errors
        this.errorMessage = "Your Account Is DeActivated !";
      }

  console.error("Login error:", error);
}
  );
  }

}
