import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  login(p) {
    return this.httpClient.get('assets/login.json', p);
  }
}
