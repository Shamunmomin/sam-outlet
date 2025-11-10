import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/login/model/user';
import { AdminService } from 'src/app/servie/admin-service/admin.service';
import { LocalStorageService } from 'src/app/servie/storage-service/local-storage.service';
import { UserService } from 'src/app/servie/user-service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  isSidebarOpen = false;
  id !:number;
 user:any={};
 count !:number;
 searchText: string = '';
 userRole:string='';
  constructor( private router:Router,private localStorage:LocalStorageService,private adminService:AdminService,private userService:UserService) {}
  
  ngOnInit(): void {
   this.id=Number(this.localStorage.getUserId());
   this.userRole=LocalStorageService.getUserRole();
  //  console.log(this.userRole)
   this.getAllCartCount();
   this.getParticularUser();
  }
 

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

logout(){
  LocalStorageService.signOut();
  this.router.navigate(["/signin"]);
}

viewCart(){
  this.router.navigate(['/user/viewCart/',this.id]);
}
 
getParticularUser(){
  this.adminService.getUserById(this.id)
  .subscribe({
    next:(response)=>{
      this.user=response;
      // console.log(this.user);
    }
  })
}

getAllCartCount(){
  this.userService.getCartCount(this.id)
  .subscribe({
    next: (response)=>{
       this.count=response;
      //  console.log(this.count);
    }
  })
}

goProfile(){
  this.router.navigate(['/user/userProfile']);
}

// search navigate to home
searchProducts(){
    this.router.navigate(["/user/products"],{ queryParams: { search: this.searchText } });
}

}
