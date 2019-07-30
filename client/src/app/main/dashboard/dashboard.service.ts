import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class DashboardService {

  constructor(private httpClient: HttpClient) { }
  getHtml(): Observable<any> {
    return this.httpClient.get(`/api/getHtml`);
  }
}
