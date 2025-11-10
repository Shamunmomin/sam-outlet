import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servie/storage-service/local-storage.service';
import { UserService } from 'src/app/servie/user-service/user.service';

@Component({
  selector: 'app-mobile-end-icons',
  templateUrl: './mobile-end-icons.component.html',
  styleUrls: ['./mobile-end-icons.component.css']
})
export class MobileEndIconsComponent implements OnInit{

  cartCount !:number;
  id !:number;
  constructor(private router:Router,private localStorage:LocalStorageService,private userService:UserService){}

  ngOnInit(): void {
     this.id=Number(this.localStorage.getUserId());
     this.getAllCartCount();
  }

  viewCart(){
  // this.id=Number(this.localStorage.getUserId());
  this.router.navigate(['/user/viewCart/',this.id])
  }

  getAllCartCount(){
  this.userService.getCartCount(this.id)
  .subscribe({
    next: (response)=>{
       this.cartCount=response;
      //  console.log(this.cartCount);
    }
  })
}

}
