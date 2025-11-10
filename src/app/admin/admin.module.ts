import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddCategoryComponent } from './admin-category/add-category/add-category.component';
import { UpdateCategoryComponent } from './admin-category/update-category/update-category.component';
import { AddProductComponent } from './admin-product/add-product/add-product.component';
import { AllProductComponent } from './admin-product/all-product/all-product.component';
import { UpdateProductComponent } from './admin-product/update-product/update-product.component';
import { OrdersComponent } from './orders/orders.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { UsersComponent } from './users/users.component';
 
 

@NgModule({
  declarations: [
    DashbordComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddProductComponent,
    AllProductComponent,
    UpdateProductComponent,
    OrdersComponent,
    AddAdminComponent,
    UsersComponent,
     
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule
]
})
export class AdminModule { }
