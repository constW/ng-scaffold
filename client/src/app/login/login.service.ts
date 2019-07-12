import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(params): Observable<any> {
    return this.httpClient.post(`/api/login`, params);
  }
}
