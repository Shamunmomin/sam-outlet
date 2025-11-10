import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/servie/admin-service/admin.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  categories:any[]=[];

  constructor(private adminService:AdminService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.getAllCategory();
    window.scrollTo(0, 0);
  }

  getAllCategory(){
    return this.adminService.getAllCategory()
    .subscribe((response:any)=>{
      this.categories=response;
      //  window.scrollTo({ top: 0, behavior: 'auto' }); // or 'smooth' if you want smooth scroll
    },
    error => {
      console.error('Error loading categories', error);
    }
  )
  }
 
   sendCategoryName(name:string){
 this.router.navigate(['/user/products'], {
       state: { categoryName: name }
    });
  }


}
