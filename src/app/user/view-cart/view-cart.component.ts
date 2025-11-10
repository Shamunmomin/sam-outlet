import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/servie/user-service/user.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

 id !:number;
 cartItems: any[] = [];
 totalOrderPrice: number = 0;
 isCartEmpty: boolean = true;

  constructor(private userService:UserService, private rout: ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.id=Number(this.rout.snapshot.paramMap.get('id'));
    this.loadCart();
    window.scrollTo(0, 0);
  }

loadCart(){
  this.userService.viewCart(this.id)
  .subscribe({
    next: (response) => {
      // console.log(response); // 👈 Check the response structure
      this.cartItems = response.carts || [];   // ✅ Map the carts array
      this.totalOrderPrice = response.totalOrderPrice || 0; // ✅ Map the total order price
      this.isCartEmpty = this.cartItems.length === 0;
    },
    error: (err) => {
      console.error('Error loading cart items:', err);
      this.cartItems = [];
      this.totalOrderPrice = 0;
        this.isCartEmpty = true;
    }
})
}

 updateCartQuantity(action: string, cartId: number): void {
  
    this.userService.updateQuantity(action, cartId).subscribe({
      next: (response) => {
        this.loadCart(); 
         const itemWithLowQuantity = this.cartItems.some(item => item.quantity <= 1);

        if (itemWithLowQuantity) {
          console.log('Item with quantity 1 or less found. Reloading page.');
          window.location.reload(); // 🔄 Reload the page
        } 
        },
      error: (err) => {
        console.error('Failed to update cart quantity:', err);
      },
    });
  }
 

  proccedPayment(){
     
    this.router.navigate(['/user/order'],{
      state:{
         totalOrderPrice: this.totalOrderPrice,
       }
    });
  }
}
