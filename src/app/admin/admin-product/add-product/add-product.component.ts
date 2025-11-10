import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/login/model/Product';
import { AdminService } from 'src/app/servie/admin-service/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  product:any=<Product>{}
  categories:any[]=[];
  selectedFile: File | null = null;
  uploadMessage: string = '';

  constructor(private adminService:AdminService){}
  ngOnInit(): void {
    this.allCategory();
  }



  // SAVE PRODUCT
  allCategory(){
    this.adminService.getAllCategory()
    .subscribe((response)=>{
      this.categories=response;
    },
  error=>{
    console.log("ctegory fail to load from db!");
  }
  )
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

 saveProducts(){
    if (!this.selectedFile || !this.product.name) 
      return;  
    this.adminService.saveProduct(this.selectedFile,this.product)
    .subscribe({
      next: (response:any) => {
        this.uploadMessage = response;
        
        this.selectedFile = null;
        (document.getElementById('fileInput') as HTMLInputElement).value = '';

        setTimeout(() => {
          this.uploadMessage = '';
          window.location.reload(); // 🔁 Auto-refresh page
        }, 2000); // Wait 2 seconds before reload
      },
      error: () => {
        this.uploadMessage = 'product upload failed. Please try again.';
     
        this.selectedFile = null;
        (document.getElementById('fileInput') as HTMLInputElement).value = '';
      }
    });
 }
 
}
