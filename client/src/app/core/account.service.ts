import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private cs: CookieService, private router: Router, private httpClient: HttpClient) {
  }
  getUserInfo() {
    return JSON.parse(this.cs.get('info'));
  }
  isUserLogin() {
    return this.cs.get('info');
  }
  logout() {
    this.cs.delete('info');
    this.httpClient.get(`/api/logOut`).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
