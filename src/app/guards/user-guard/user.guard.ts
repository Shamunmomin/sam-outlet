import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "src/app/servie/storage-service/local-storage.service";
 
 

 @Injectable({
  providedIn: 'root'
 })

 export class UserGuard implements CanActivate{

  constructor(private router:Router){}

   canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ):  boolean{
    if(LocalStorageService.isAdminLoggedIn()){
      this.router.navigate(['/admin']);
      return false;
    }
    else if(!LocalStorageService.hasToken()){
      LocalStorageService.signOut();
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }
  
 }