import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  public listCategories() {
    return this.http.get(`${appUrl}/categories`);
  }

  public addCategory(category: any) {
    return this.http.post(`${appUrl}/categories`, category);
  }
}
