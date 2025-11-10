import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { OrderComponent } from './order/order.component';
import { SuccessOrderComponent } from './success-order/success-order.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProfileComponent } from './profile/profile.component';
import { BuyNowComponent } from './buy-now/buy-now.component'; 
 



@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductDetailComponent,
    ViewCartComponent,
    OrderComponent,
    SuccessOrderComponent,
    MyOrderComponent,
    ProfileComponent,
    BuyNowComponent
     
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
     FormsModule,
    SharedModule
]
})
export class UserModule { }
