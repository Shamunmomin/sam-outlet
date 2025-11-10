import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servie/admin-service/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orderData:any[]=[];
  errorMessage:string='';
  successMessage:string='';
  orderId: string = '';
   orderStatus: number | null = null;
  loading: boolean = false;
  tax :number=0;


  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.allOrders();
    this.searchOrder();
    window.scrollTo(0, 0);
  }

  allOrders(){
    this.adminService.getAllOrders()
    .subscribe({
      next:(data)=>{
        this.orderData=data;
      },
      error: (error)=>{
        console.log('somethin went wrong when loading orders');
      }
    });
  }
 
onUpdateStatus(orderId: string, status: number): void {
  if (orderId && status !== null) {
    this.adminService.updateOrderStatus(orderId, status).subscribe(
      (response) => {
        this.successMessage = 'Order status updated successfully!';
        console.log(this.successMessage);
        this.errorMessage = '';
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
        this.allOrders();
      },
      (error) => {
        console.error('Failed to update order:', error);
        this.successMessage = '';
        this.errorMessage = error.message || 'Failed to update order status.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }
}


searchOrder() {
    this.loading = true;
    this.errorMessage = '';

    if (this.orderId) {
      this.adminService.getOrderById(this.orderId).subscribe({
        next: (data: any) => {
          this.orderData = [data];
          // console.log(data);
          this.orderId='';
        },
       error:(error)=>{
        this.errorMessage = error.error || 'Order not found.';
          this.orderData = [];
       },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.adminService.getAllOrders().subscribe({
        next: (data: any[]) => {
          this.orderData = data;
          // console.log(data);
        },
        error: (error) => {
          this.errorMessage = error.error || 'No orders found.';
          this.orderData = [];
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }


}
