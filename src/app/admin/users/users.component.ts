import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/login/model/user';
import { AdminService } from 'src/app/servie/admin-service/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

   succMsg:string='';
   errorMsg:string='';
  userData:User[]=[];

  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.adminService.viewAllUsers()
    .subscribe({
      next:(data)=>{
        this.userData=data;
      },
      error:(error)=>{
        alert("error geting while fetching users!");
      }
    })
  }

  // update user status
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
