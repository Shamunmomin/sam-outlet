import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/servie/admin-service/admin.service';
import { LocalStorageService } from 'src/app/servie/storage-service/local-storage.service';
import { UserService } from 'src/app/servie/user-service/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  products:any[]=[];
  categories:any[]=[];
  productId !:number;
  userId !:number;
  searchText: string = '';
  categoryName:string='';

  constructor(private adminService:AdminService, 
    private router:Router,
    private localStorage:LocalStorageService,
    private route:ActivatedRoute,
    private userService:UserService
  ){}
  ngOnInit(): void {
      window.scrollTo({ top: 0, behavior: 'auto' });
    this.loadProduct();
    this.userId=Number(this.localStorage.getUserId());

     // Get the category name from the router state
    this.categoryName = history.state.categoryName;
    // console.log(this.categoryName)
    
     this.fetchProductsUsingCategoryName();
      if (this.categoryName) {
      this.fetchProductsUsingCategoryName();
    } else {
      this.loadProduct();
    }
     
    // get search item from state on header
    this.route.queryParams.subscribe((params) => {
      this.searchText = params['search'] || '';});
  }

  loadProduct(){
    this.adminService.getAllproduct()
    .subscribe((response:any)=>{
      this.products=response;
      //  window.scrollTo({ top: 0, behavior: 'auto' }); // or 'smooth' if you want smooth scroll
    })
  }

  onSubmit(id:number){
    this.productId=id;
      this.router.navigate(['/user/productDetail/',this.productId,this.userId]);
  }

// GET ALL PRODUCT BY CATEGORY NAME
fetchProductsUsingCategoryName():void{
  this.adminService.getProductsByCategoryname(this.categoryName).subscribe({
      next: (data) => {
        this.products = data;
        // console.log('Products for category:', data);
        //  window.scrollTo({ top: 0, behavior: 'auto' });
      },
      error: (error) => {
        console.error('Error fetching products by category:', error);
      }
    });
}


}
