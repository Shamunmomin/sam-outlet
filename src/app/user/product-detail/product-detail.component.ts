import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/login/model/Product';
import { AdminService } from 'src/app/servie/admin-service/admin.service';
import { LocalStorageService } from 'src/app/servie/storage-service/local-storage.service';
import { UserService } from 'src/app/servie/user-service/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  productId !:number;
  particularProduct: Product = {} as Product;
  relateProduct:any[]=[];
  imageUrl:string='';
  selectedSize : string='';
  sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
  userId!: number;
  msg:string='';
  id !:number;
  errorMsg:string='';
  constructor(private rout:ActivatedRoute,
             private adminService:AdminService,
             private userService:UserService,
            private localStorage:LocalStorageService,
             private router:Router){}

  ngOnInit(): void {
     this.productId=Number(this.rout.snapshot.paramMap.get('productId'));
     this.userId=Number(this.rout.snapshot.paramMap.get('userId'));
     this.getProductDetail();
      this.loadRelatedProduct();
       window.scrollTo(0, 0);
  }

  loadRelatedProduct(){
    this.adminService.relatedProduct(this.productId)
    .subscribe({
      next:(response:any)=>{
           this.relateProduct=response;
          //  console.log(response);
      },
      error:(error)=>{
        console.log('something wrong for loading related products');
        this.errorMsg=('something wrong while loading related product detail')
      }
    })
  }

  getProductDetail(){
    this.adminService.getProductById(this.productId)
    .subscribe({
      next: (product: Product)=>{
        this.particularProduct = product;
        this.imageUrl = `https://sam-outlet-backend.onrender.com/${product.imagePath}`;
        // console.log(this.particularProduct)
      },
      error:(error)=>{
        console.log('something wrong for loading particular produt details');
        this.errorMsg=('something wrong while loading product detail')
      }
    })
  }


   saveCart(){
    if (this.particularProduct.categoryName === 'Clothes' && !this.selectedSize) {
      this.errorMsg=('Please select a size before adding to the cart.');
      return;
    }
   if(this.userId==0 || this.userId==null){
    this.router.navigate(['/signin'])
   } 
    const cartItem = {
      productId: this.productId,
      userId: this.userId,
      size: this.selectedSize
    };
    this.userService.addToCart(cartItem).subscribe({
      next: (response) => {
        this.msg = "🎉 Product successfully add to cart..";
        this.id = this.userId;
        // this.router.navigate(['user/viewCart', this.id]);
           setTimeout(() => {
              this.msg = "";
              window.location.reload(); // <--- This will refresh the page
            }, 1000);
      },
      error: (error) => {
        console.log('Error adding to cart:', error);
       this.errorMsg=('Failed to add product to cart');
      }
    });
  }
   
  productDetail(id:number){
    this.productId=id;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/user/productDetail/', this.productId, this.userId]);
    });
}
  
  buyNow(){
     if (this.particularProduct.categoryName === 'Clothes' && !this.selectedSize) {
      this.errorMsg=('Please select a size before buying product.');
      return;
    }
         this.router.navigate(['/user/buynow'], {
          state: {
                productId: this.productId,
                size: this.selectedSize,
                totalOrderPrice:this.particularProduct.discountPrice
              }
         });
      }

}
