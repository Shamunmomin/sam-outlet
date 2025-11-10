import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/login/model/Product';
import { AdminService } from 'src/app/servie/admin-service/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{

   product:any=<Product>{}
    categories:any[]=[];
    selectedFile: File | null = null;
    uploadMessage: string = '';
    id !:number;

    constructor(private adminService:AdminService, private rout:ActivatedRoute, private router:Router){}
    
    ngOnInit(): void {
      this.id = Number(this.rout.snapshot.paramMap.get('id'));
      
     this.getParticularProduct();
     this.allCategory();
    }

 //GET PARTICULAR PRODUCT
 getParticularProduct(){
  this.adminService.getProductById(this.id)
    .subscribe((res)=>{
      this.product=res;
    });
}

// all category
allCategory(){
  this.adminService.getAllCategory()
  .subscribe((response)=>{
    this.categories=response;
  },
   error=>{
    console.log("ctegory fail to load from db!");
  })
}
    //update product
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

     updateProduct(): void {
    if (!this.product.name) {
      this.uploadMessage = "Product name is required!";
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    formData.append(
      'productDTO',
      new Blob([JSON.stringify(this.product)], { type: 'application/json' })
    );

    this.adminService.updateProduct(this.id, formData).subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        this.router.navigate(['admin/allProducts']);
      },
      error: (error) => {
        this.uploadMessage = 'Error updating product!';
        console.error('Update failed:', error);
      }
    });
  }
}

