import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/servie/storage-service/local-storage.service';
import { UserService } from 'src/app/servie/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

   user: any = {};
    id !:number;
  isModalOpen: boolean = false;
  isPasswordModalOpen: boolean = false;
  successmsg:string='';
  errorMsg:string='';
   passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private userService:UserService, private localStorage:LocalStorageService) {}

  ngOnInit(): void {
    this.id=Number(this.localStorage.getUserId());
     this.loadUser();
     window.scrollTo(0, 0);
  }

  loadUser(){
    this.userService.getUser(this.id)
    .subscribe({
      next:(userData)=>{
        this.user=userData;
      },
      error:(error)=>{
        console.log('something went wrong while loading user')
      }
    })
  }

   editProfile(): void {
    this.isModalOpen = true;
  }

  saveProfile(form: NgForm): void {
    
     if(form.valid){
      this.userService.updateProfile(this.user)
      .subscribe({
        next:(response)=>{
          this.successmsg=('Profile updated successfully!');
          setTimeout(() => {
            this.successmsg='';
          }, 4000);
          this.isModalOpen = false;
        },
         error: (error) => {
          this.errorMsg=('Error updating profile:');
           setTimeout(() => {
            this.errorMsg='';
          }, 4000);
        }
      });
     }else {
      this.errorMsg=('Form is invalid!');
       setTimeout(() => {
            this.errorMsg='';
          }, 3000);
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isPasswordModalOpen = false;

     const activeElement = document.activeElement as HTMLElement;
  if (activeElement && activeElement.blur) {
    activeElement.blur();  // Clear focus
  }
  
  }

    openPasswordModal(): void {
    this.isPasswordModalOpen = true;
  }

  changePassword(form: NgForm): void {
    if (form.valid) {
      if (this.passwordData.newPassword === this.passwordData.confirmPassword) {
        this.userService.updatePassword(this.id, this.passwordData.currentPassword, this.passwordData.newPassword)
        .subscribe({
          next:(response)=>{
            if(response != null){
            this.successmsg=('Password changed successfully..');
            // console.log(response);
            setTimeout(() => {
            this.successmsg='';
            window.location.reload();
          }, 4000);
           
        }else{
          this.errorMsg=('wrong password!, current password is incorrect!');
           setTimeout(() => {
            this.errorMsg='';
          }, 4000);
        }
          },
          error:(error)=>{
           console.log('error is indicating while changing password');
            // console.log('password not changed');
            setTimeout(() => {
            this.errorMsg='';
          }, 4000);
          }
        });
        this.closeModal();
      } else {
        this.errorMsg=('New password and confirmation do not match!');
        setTimeout(() => {
            this.errorMsg='';
          }, 4000);
      }
    } else {
      this.errorMsg=('Please fill all password fields correctly.');
      setTimeout(() => {
            this.errorMsg='';
          }, 4000);
    }
  }

}
