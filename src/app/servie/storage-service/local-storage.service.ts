import { Injectable } from '@angular/core';

const TOKEN="I_token";
const USERID="I_userId";
const  USERROLE="I_role";
 

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveUserId(userId:any){
    window.localStorage.removeItem(USERID);
    window.localStorage.setItem(USERID,userId);
    // localStorage.setItem(USERID, JSON.stringify(userId));
  }
 
  saveUserRole(userRole:any){
    window.localStorage.removeItem(USERROLE);
    window.localStorage.setItem(USERROLE,userRole);
  }

  saveToken(token:any){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  // static getToken(): string {
  //   const token = localStorage.getItem(TOKEN);
  //    return token !== null ? token : '';
  //   // return localStorage.getItem(TOKEN);
  // }
 
  static getToken(): string | null {
    const token = localStorage.getItem(TOKEN);
    if (token && token.split('.').length === 3) {
      return token;
    }
    return null;
  }

  static hasToken():boolean{
    if(this.getToken() === null){
      return false;
    }
    return true;
  }

 static isUserLoggedIn(): boolean{
    if(this.getToken() === null){
       return false;
    }
    const role:string=this.getUserRole();
    return role  == "USER";
  }

 

  static getUserRole(): string{
    // const user = this.getUser();
    // if(user == null){
    //   return '';
    // }
    // return user.userRole;  
    return localStorage.getItem(USERROLE) || '';
  }


   getUserId(){
    const userId=localStorage.getItem(USERID);
    return userId;
  }


  static getUser(){
    // return JSON.parse(localStorage.getItem(USERID));
    const userId = localStorage.getItem(USERID);
    return userId ? parseInt(userId) : null;
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken()=== null){
      return false;
    }
    const role:string = this.getUserRole();
    return role == "ADMIN";
  }

  static signOut(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USERID);
    window.localStorage.removeItem(USERROLE);
  }

}
