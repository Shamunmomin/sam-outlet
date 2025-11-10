import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/login/model/user';
import { AdminService } from 'src/app/servie/admin-service/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit{

  user:any=<User>{};
  errorMsg: string = '';
  userData:User[]=[];
  succMsg:string='';
  succMsg1:string='';
  errorMsg1: string = '';

    constructor(private adminService:AdminService, private router:Router){}

  ngOnInit(): void {
      this.getAllAdmins();
      window.scrollTo(0, 0);
  }

    register(){
      this.adminService.addAdmin(this.user)
      .subscribe({
        next:(response)=>{
          console.log(response);
          this.succMsg1='Admin add successfully...';
          setTimeout(() => {
            this.succMsg1='';
          }, 4000);
          window.location.reload();
        },
        error:(error)=>{
           this.errorMsg1 = error.error?.message || 'Admin alredy exists';
           setTimeout(() => {
            this.errorMsg1='';
           }, 4000);
        }
      })
    }

    getAllAdmins(){
      this.adminService.viewAllAdmins()
      .subscribe({
        next:(data)=>{
          this.userData=data;
        },
        error:(error)=>{
          alert('error is getting while fetching admins!')
        }
      })
    }

     updateStatus(status: boolean, id: number){
    this.adminService.updateUserStatus(status,id)
    .subscribe({
      next:(response)=>{
         const user = this.userData.find(u => u.id === id);
        if (user) {
          user.isEnable = status;
        }
          this.succMsg="Account Status Updated"
          setTimeout(() => {
            this.succMsg='';
          }, 4000);
          
      },
      error:(error)=>{
        this.errorMsg="Account Status Is Not Updated";
        setTimeout(() => {
          this.errorMsg='';
        }, 4000);
      }
    })
  }
}
