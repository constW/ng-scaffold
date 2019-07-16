import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';
@Injectable()
export class LoginGuard implements CanLoad, CanActivate {

  constructor(private router: Router, private as: AccountService) { }

  canLoad(route: Route): boolean {
    if (this.as.isUserLogin()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.as.isUserLogin()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
