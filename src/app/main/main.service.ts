import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MainService {
  constructor(private httpClient: HttpClient) { }
  getMenu() {
    return this.httpClient.get('assets/menu.json');
  }
}
