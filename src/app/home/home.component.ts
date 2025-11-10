import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../servie/user-service/user.service';
import { AdminService } from '../servie/admin-service/admin.service';
import { LocalStorageService } from '../servie/storage-service/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  image1:string="assets/backClothImg.avif";
  image2:string="assets/brandLogo1.jpg";
  image3:string="assets/ecom2.jpg"

  @ViewChild('sliderContainer', { static: false }) sliderContainer!: ElementRef;

  categories: any[] = [];
  products:any[]=[];
  userId !:number;
  productId:number=0;
  

  constructor(private adminService:AdminService,
    private router: Router,
    private localStorage:LocalStorageService
  ) {}

  ngOnInit(): void {
    
   this.loadCategory();
   this.loadProducts();
   this.userId=Number(this.localStorage.getUserId());
   window.scrollTo(0, 0);

  }
   
// load category
   loadCategory(){
    return this.adminService.getAllCategory()
    .subscribe((response)=>{
      this.categories=response;
      console.log("categories= "+response.data);
    },
    error =>{
      alert("Failed to load categories");
    }
  
  )
   }
  
  scrollLeft() {
    this.sliderContainer.nativeElement.scrollLeft -= 200; // Scroll left by 200px
  }

  scrollRight() {
    this.sliderContainer.nativeElement.scrollLeft += 200; // Scroll right by 200px
  }
  

  //LOAD PRODUCTS
  loadProducts(){
    this.adminService.getAllproduct()
    .subscribe((response:any)=>{
      this.products=response;
    })
  }

  onSubmit(id:number){
    this.productId=id;
      this.router.navigate(['/user/productDetail/',this.productId,this.userId]);
  }



  sendCategoryName(name:string){
 this.router.navigate(['/user/products'], {
       state: { categoryName: name }
    });
  }

}
