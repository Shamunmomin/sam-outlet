import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserGuard } from '../guards/user-guard/user.guard';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { OrderComponent } from './order/order.component';
import { SuccessOrderComponent } from './success-order/success-order.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProfileComponent } from './profile/profile.component';
import { BuyNowComponent } from './buy-now/buy-now.component'; 

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"categories", component:CategoryComponent 
    // ,canActivate:[UserGuard]
  },
  {
    path:"products", component:ProductComponent 
    // , canActivate:[UserGuard]
  },
  {
    path:"productDetail/:productId/:userId", component:ProductDetailComponent
  },
  {
    path:"viewCart/:id",component:ViewCartComponent,canActivate:[UserGuard]
  },
   {
     path:"order", component:OrderComponent,canActivate:[UserGuard]
   },
   {
    path:"buynow", component:BuyNowComponent, canActivate:[UserGuard]
   },
   {
    path:"success",component:SuccessOrderComponent, canActivate:[UserGuard]
   },
   {
    path:"myOrder", component:MyOrderComponent, canActivate:[UserGuard]
   },
   {
    path:"userProfile",component:ProfileComponent,canActivate:[UserGuard]
   }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
