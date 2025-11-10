import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servie/storage-service/local-storage.service';
import { UserService } from 'src/app/servie/user-service/user.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit{

  orderData:any[]=[];
  userId !:number;
  errorMessage:string='';
  successMessage:string='';

  constructor(private userService:UserService, private localStorage:LocalStorageService){}
 
  ngOnInit(): void {
    this.userId=Number(this.localStorage.getUserId());
    this.allOrders();
    window.scrollTo(0, 0);
  }


  allOrders(){
    this.userService.getAllOrders(this.userId)
    .subscribe({
      next: (response)=>{
       this.orderData = response.map((order: any) => {
            const orderDate = new Date(order.orderDate);
            const deliverDate = new Date(orderDate);
        deliverDate.setDate(orderDate.getDate() + 2);
         const tax = Math.round(order.price * 0.05);
        return { ...order, deliverDate,tax };
        });
        // console.log(this.orderData);
        //  window.scrollTo({ top: 0, behavior: 'auto' }); // or 'smooth' if you want smooth scroll
      },error:(error)=>{
        console.log("Failed to load orders. Please try again later.");
      }
    })
  }


 cancelOrder(orderId: string) {
  this.userService.updateOrderStatus(orderId, 6).subscribe({
    next: (response) => {
      this.successMessage = response;
       setTimeout(() => {
        this.successMessage = '';
      }, 3000); 
      // Find the order in the local array and update its status to 'Cancelled'
      const orderToUpdate = this.orderData.find(order => order.orderId === orderId);
      if (orderToUpdate) {
        orderToUpdate.status = 'Cancelled';
      }
    },
    error: (error) => {
      this.errorMessage = "Failed to cancel the order. Please try again.";
      console.error(error);
    }
  });
}



}
