import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/login/model/Category';
import { AdminService } from 'src/app/servie/admin-service/admin.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {

  id !:number;
 catDate: any=<Category>{}
  selectedFile: File | null = null;
  message: string = '';

  constructor(private adminService:AdminService, private rout:ActivatedRoute, private router:Router){}

  ngOnInit() {
    this.id = Number(this.rout.snapshot.paramMap.get('id'));
    this.getParticularCategory();
  }

  // its use for saving update image
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // GET PARTICULAR CATEGORY
   getParticularCategory(){
    this.adminService.getParticularCat(this.id)
    .subscribe((res)=>{
      this.catDate=res;
    });
   }

   // UPDATE CATEGORY
  updateCategory() {
    if (!this.selectedFile || !this.catDate.name) 
      return;  
    this.adminService.updateCategory(this.id,this.selectedFile, this.catDate)
      .subscribe({
        next: (response) => {
          // console.log(response);
          this.router.navigate(["admin/adminCategory"]);
        },
        error: (error) => {
          this.message = "Error updating category!";
          console.error(error);
        }
      });

}


}
