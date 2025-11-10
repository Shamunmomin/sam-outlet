import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "src/app/servie/storage-service/local-storage.service";

 

  @Injectable({
    providedIn:'root'
 })
 export class NoAuthGuard implements CanActivate{

  
  constructor(private router:Router){}

  canActivate(
   route: ActivatedRouteSnapshot, 
   state: RouterStateSnapshot
 ): boolean{
   if(LocalStorageService.hasToken() && LocalStorageService.isUserLoggedIn()){
     this.router.navigate(["/home"]);
     return false;
   }else if(LocalStorageService.hasToken() && LocalStorageService.isAdminLoggedIn()){
      this.router.navigate(['/admin']);
      return false;
   }
   return true;
 }  
 }