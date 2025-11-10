import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AdminGuard } from '../guards/admin-guard/admin.guard';
import { AddCategoryComponent } from './admin-category/add-category/add-category.component';
import { UpdateCategoryComponent } from './admin-category/update-category/update-category.component';
import { AddProductComponent } from './admin-product/add-product/add-product.component';
import { AllProductComponent } from './admin-product/all-product/all-product.component';
import { UpdateProductComponent } from './admin-product/update-product/update-product.component';
import { OrdersComponent } from './orders/orders.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:"", component:DashbordComponent, canActivate:[AdminGuard]
  },
  {
    path:"adminCategory", component:AddCategoryComponent, canActivate:[AdminGuard]
  },
  {
    path:"adminEditCategory/:id", component:UpdateCategoryComponent, canActivate:[AdminGuard]
  },
  {
  path:"adminProduct", component:AddProductComponent, canActivate:[AdminGuard]
  },
  {
    path:"allProducts", component:AllProductComponent, canActivate:[AdminGuard]
  },
  {
    path:"editProduct/:id", component:UpdateProductComponent, canActivate:[AdminGuard]
  },
  {
    path:"orders", component:OrdersComponent,canActivate:[AdminGuard]
  },
  {
    path:"addAdmin", component:AddAdminComponent,canActivate:[AdminGuard] 
  },
  {
     path:"users", component:UsersComponent, canActivate:[AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
