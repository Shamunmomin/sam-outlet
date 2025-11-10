import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../storage-service/local-storage.service';
import { Environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = `${Environment.apiUrl}/admin`;

  constructor(private http:HttpClient) { }


  // add this to in every method
  // createAutherizationHeader(): HttpHeaders {
  //   const token = LocalStorageService.getToken(); // Make sure this returns a valid JWT string
  //   let authHeaders = new HttpHeaders();
  //   // console.log("Stored token:", token);
  //   return authHeaders.set(
  //     'Authorization',
  //     `Bearer ${token}` // <-- Note the space after 'Bearer'
  //   );
  // }


  //  FORGOT PASSWORD
  forgotPassword(email:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/forgot-password`,{},{
      params:{
        email:email
      }
    });
  }

  // CHECK RESET PASSWORD URL TOKEN 
  resetPasswordUrl(token:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/reset-password-link`,{
      params:{
        token:token
      }
    });
  }

  //  RESET NEW PASSWORD
  resetNewPassword(token:string,password:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/reset-password`,{},{
      params:{
        token:token,
        password:password
      }
    })
  }

//SAVE CATEGORY
  saveCat(file: File,category:any): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("name", category.name);
    formData.append("isActive",String(category.isActive));
    return this.http.post(`${this.baseUrl}/saveCategory`, formData, { 
      responseType: 'text' ,
      // headers: this.createAutherizationHeader()
    });
  }

        
  // GET ALL CATEGORY FROM DB

  getAllCategory():Observable<any>{
    return this.http.get(`${this.baseUrl}/getallcategories`
      // headers:this.createAutherizationHeader()
    );
  }

  // UPDATE CATEGORY
  updateCategory(id: number, file: File, categoryData: any): Observable<any> {
    const formData = new FormData();
    
    formData.append('file', file); // Attach file
    formData.append('categoryData', new Blob([JSON.stringify(categoryData)], { type: 'application/json' })); // Attach JSON as Blob
  
    return this.http.put(`${this.baseUrl}/updateCategory/${id}`, formData,{
      responseType:'text',
      // headers:this.createAutherizationHeader()
    });
  }

  // GET PARTICULAR CATEGORY
  getParticularCat(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/getParticularCategory/${id}`,{
      // headers:this.createAutherizationHeader()
    });
  }

  // DELETE PARTICULAR CATEGORY
  deleteCategory(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/deleteCategory/${id}`,{
      responseType: 'text'
    });
  }

  // SAVE PRODUCT

  saveProduct(file:File,product:any): Observable<string>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('categoryName', product.categoryName);
    formData.append('stock', product.stock);
    formData.append('price', product.price);
    formData.append('discount', product.discount);
    // formData.append('discountPrice', product.discountPrice);

    return this.http.post(`${this.baseUrl}/saveProduct`,formData,{
      responseType: 'text'
    });

  }

  // GET ALL PRODUCTS FROM DB
  getAllproduct(){
    return this.http.get(`${this.baseUrl}/allProduct`);
  }

// UPDATE PARTICULAR PRODUCT
updateProduct(id: number, data: FormData): Observable<any> {
  return this.http.put(`${this.baseUrl}/updateProduct/${id}`, data, {
    responseType: 'text'
  });
}


//GET PARTICULAR PRODUCT
getProductById(id:number):Observable<any>{
  return this.http.get(`${this.baseUrl}/getParticularProduct/${id}`);
}


// DELETE PARTICULAR PRODUCT
deleteProduct(id:number):Observable<any>{
  return this.http.delete(`${this.baseUrl}/deleteProduct/${id}`,{
    responseType: 'text'
  });
}

//GET REALTED PRODUCTS
relatedProduct(id:number):Observable<any>{
  return this.http.get(`${this.baseUrl}/relatedProduct/${id}`);
}
 
//GET USER BY ID
getUserById(id:number):Observable<any>{
  return this.http.get(`${this.baseUrl}/getUser/${id}`);
}

// GET ALL ORDERS
getAllOrders():Observable<any>{
  return this.http.get(`${this.baseUrl}/allOrders`);
}

// UPDATE ORDER STATUS
updateOrderStatus(orderId: string, status: number | null): Observable<string> {
  if (status === null) {
    return throwError(() => new Error('Status is required to update order.'));
  }
  const params = new HttpParams()
    .set('id', orderId)
    .set('st', status.toString());

  return this.http.post(`${this.baseUrl}/update-Order-Status`, {}, { 
    params,
    responseType: 'text'
  });
}

// GET ALL PRODUCTS BY CATEGORYNAME
getProductsByCategoryname(categoryName:string):Observable<any>{
  return this.http.get(`${this.baseUrl}/getProductsByCategoryname/${categoryName}`);
}

// GET OREDER BY ID
 getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search-order/${orderId}`);
  }

  
  //  ADD ADMIN
  addAdmin(data:any){
      return this.http.post(`${this.baseUrl}/add-admin`,data);
  }

  // VIEW ALL USERS
  viewAllUsers():Observable<any>{
    return this.http.get(`${this.baseUrl}/users`);
  }

  //   UPDATE USER STATUS
  updateUserStatus(status:boolean, id:number):Observable<any>{
   return this.http.get(`${this.baseUrl}/updateSts`,{
    params:{
      status:status,
      id:id
    },
    responseType:'text'
   });
  }


   // VIEW ALL ADMINS
  viewAllAdmins():Observable<any>{
    return this.http.get(`${this.baseUrl}/admins`);
  }

}
