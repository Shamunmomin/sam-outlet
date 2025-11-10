import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servie/admin-service/admin.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit{

  products:any[]=[];
  name:string='';
  loading: boolean = false;
  errorMessage:string='';
  successMessage:string='';

  constructor(private adminService:AdminService){}

  ngOnInit(): void {
  this.allProducts();
  }

  allProducts(){
     this.adminService.getAllproduct()
     .subscribe((response:any)=>{
      this.products=response;
     })
  }

  onDelete(id:number){
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteProduct(id).subscribe({
        next: (response) => {
          alert(response);
          // 🛠 Instead of reloading all categories, just filter out the deleted one
          this.products = this.products.filter(cat => cat.id !== id);
        },
        error: (error) => {
          alert('Failed to delete category!');
        }
      });
  }
  }

   

}
