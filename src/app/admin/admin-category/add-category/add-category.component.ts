import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/login/model/Category';
import { AdminService } from 'src/app/servie/admin-service/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

   cat: any = <Category>{ isActive: true }
    selectedFile: File | null = null;
    uploadMessage: string = '';
    categories: any[] = [];
  
    constructor(private adminService: AdminService) {}
  
    ngOnInit(): void {
      this.getCategories();
    }
  
    // SAVE CATEGORY
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
  
    saveCategory() {
      if (!this.selectedFile || !this.cat.name) 
        return;  
      this.adminService.saveCat(this.selectedFile, this.cat).subscribe({
        next: (response:any) => {
          this.uploadMessage = response;
          setTimeout(() => {
            this.uploadMessage = '';
          }, 5000);
  
          this.selectedFile = null;
        },
        error: () => {
          this.uploadMessage = 'category upload failed. Please try again.';
       
          this.selectedFile = null;
          (document.getElementById('fileInput') as HTMLInputElement).value = '';
        }
      });
    }
  
    //GET ALL ACETGROY FROM DB
  
    getFileName(path: string): string {
      return path.substring(path.lastIndexOf('/') + 1);
    }  
    
    getCategories(){
        this.adminService.getAllCategory()
        .subscribe((response)=>{
          this.categories=response;
        },
        error => {
          console.error('Failed to fetch categories');
        }
      )
    }
  
    // DELETE CATEGORY
    onDelete(id:number){
      if (confirm('Are you sure you want to delete this category?')) {
        this.adminService.deleteCategory(id).subscribe({
          next: (response) => {
            alert(response);
            // 🛠 Instead of reloading all categories, just filter out the deleted one
            this.categories = this.categories.filter(cat => cat.id !== id);
          },
          error: (error) => {
            alert('Failed to delete category!');
          }
        });
    }
  }
}
