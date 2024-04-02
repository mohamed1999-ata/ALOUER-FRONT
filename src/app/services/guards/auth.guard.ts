import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate {

  constructor(
    private router:  Router ,
    private authService : AuthServiceService
    ) { }

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   const isAuth = this.authService.userLogedIn() ;
   if( !isAuth){
      this.router.navigate(['/auth/login'])
   }
  return isAuth
 }
}
