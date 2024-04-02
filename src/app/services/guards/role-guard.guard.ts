import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(
    private router:  Router 
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized(route);
  }
  
   isAuthorized(route : ActivatedRouteSnapshot) : boolean{
       let user =  JSON.parse(localStorage.getItem('user') as any)
       const role = user?.user.roles
      var  verif : boolean
       const expectedRoles :any =  ['admin']
      if (expectedRoles.indexOf(role[0]) == -1){
        verif = false
        this.router.navigate(['/auth/login'])

      }
      else{
        verif= true
      }
    return verif
  }
}
