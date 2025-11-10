import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderRequestDTO } from 'src/app/login/model/OrderRequestDTO';
import { LocalStorageService } from 'src/app/servie/storage-service/local-storage.service';
import { UserService } from 'src/app/servie/user-service/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{


  orderData:OrderRequestDTO={
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentType: ''
  }
   msg !:string;
   userid !:number;
   totalOrderPrice: number = 0;
   tax: number = 0;
   grantTotal: number = 0;

   productId !:number;
   size:string='';

constructor(private userService:UserService,private router:Router,private localStorage:LocalStorageService){}

  ngOnInit(): void {
    this.userid=Number(this.localStorage.getUserId());

      if (history.state.totalOrderPrice !== undefined) {
      this.totalOrderPrice = history.state.totalOrderPrice;
    }
       this.tax=this.totalOrderPrice*5/100;
       this.grantTotal=this.totalOrderPrice+this.tax;
      //  console.log("Total:", this.totalOrderPrice, typeof this.totalOrderPrice);
  window.scrollTo(0, 0);
  
  } 

  saveOrder(form: any) {
    if (form.valid) {
      this.userService.saveOrder(this.userid, this.orderData)
        .subscribe({
          next: (response) => {
            console.log("Order saved successfully:");
            // alert("Order placed successfully!");
            this.msg="🎉 Order placed successfully!";
            this.router.navigate(['/user/success']);
            form.reset(); // Clear the form
          },
          error: (error) => {
            console.error("Error while saving order:", error.message);
            alert("Failed to place the order. Please try again.");
          }
        });
    } else {
      alert("Please fill out all required fields correctly.");
    }
  }

   

}
