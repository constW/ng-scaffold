import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private cs: CookieService, private router: Router) {
  }
  getUserInfo() {
    return JSON.parse(this.cs.get('ticketOfPassport'));
  }
  isUserLogin() {
    return this.cs.get('ticketOfPassport');
  }
  logout() {
    this.cs.delete('ticketOfPassport');
    this.router.navigate(['/login']);
  }
}
