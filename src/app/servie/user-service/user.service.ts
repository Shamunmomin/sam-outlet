import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'environment';
import { Observable } from 'rxjs';
import { Category } from 'src/app/login/model/Category';
import { OrderRequestDTO } from 'src/app/login/model/OrderRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl =`${Environment.apiUrl}/user`;

  constructor(private http:HttpClient) { }
 
 addToCart(cartItem:{ productId: number, userId: number, size: string }){
    return this.http.post(`${this.baseUrl}/addToCart`,cartItem,{
      responseType:'text'
    }
    );
  }

  viewCart(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/cart/${id}`);
  }


  //get all cart count
  getCartCount(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/getCount/${id}`);
  }

  //UPDATE QUANTITY IN CART
  updateQuantity(action:string,cid:number):Observable<any>{
   return this.http.get(`${this.baseUrl}/cartQuantityUpdate?sy=${action}&cid=${cid}`);
  }

  //SAVE USER ORDER
saveOrder(userid: number, orderData: OrderRequestDTO): Observable<any> {
  return this.http.post(`${this.baseUrl}/saveOrder/${userid}`, orderData, {
    responseType: 'text'
  });
}

//  SAVE BUY NOW ORDER
saveBuyNowOrder(productId: number, size: string,userId:number, data:any): Observable<any> {
  return this.http.post(`${this.baseUrl}/saveByNowOrder`,data,{
    params:{
      id:productId,
      size:size,
      userId:userId
    },
    responseType:'text'
  });
}

// GET ALL ORDERS
getAllOrders(userId:number):Observable<any>{
  return this.http.get(`${this.baseUrl}/user-orders/${userId}`);
}
 

// Update Order Status (st = 6 for cancellation)
updateOrderStatus(orderId: string, status: number): Observable<string> {
  return this.http.get(`${this.baseUrl}/updateOrderStatus`, {
    responseType: 'text', 
    params: {
      id: orderId,
      st: status.toString()
    }
  });
}

//getUser
getUser(id:number):Observable<any>{
return this.http.get(`${this.baseUrl}/getParticularUser/${id}`);
} 

//USER PROFILE UPDATE
updateProfile(user:any):Observable<string>{
  return this.http.post(`${this.baseUrl}/editProfiel`,user,{
    responseType:'text'
  });
}

// UPDATE USER PASSWORD
updatePassword(id: number, currentPassword: string, newPassword: string): Observable<any>{
  return this.http.post(`${this.baseUrl}/changePassword/${id}`,{},{
    params:{
       currentPassword: currentPassword,
      newPassword: newPassword
    },
    responseType:'json'
  })
}


}
