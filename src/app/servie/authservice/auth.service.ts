import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../storage-service/local-storage.service';
import { map, Observable, tap } from 'rxjs';
import { Environment } from 'environment';

export const AUTH_HEADER="authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private apiUrl = `${Environment.apiUrl}`;

  constructor(private http: HttpClient,private router: Router,private storageService:LocalStorageService) { }
  
  // user registration
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user,{
      responseType:"text"
    });
  }
 

  // user login
  login(credentials:{ username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials,
      {observe:'response'})
      .pipe(
        tap(_ => this.log("User Authentication")),
        map((res:HttpResponse<any>)=>{
          this.storageService.saveUserId(res.body.userId);
          this.storageService.saveUserRole(res.body.userRole);
          const tokenLength= res.headers.get(AUTH_HEADER)?.length;
          const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7,tokenLength);
          this.storageService.saveToken(bearerToken);
          return res;
        })
      )
  }

  log(message:string):void{
    // console.log(`User Auth Service: ${message}`);
  }



}
