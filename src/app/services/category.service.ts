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

  public deleteCategory(categoryId: any) {
    return this.http.delete(`${appUrl}/categories/${categoryId}`);
  }

  public updateCategory(category: any) {
    return this.http.put(`${appUrl}/categories`, category);
  }

  public getCategory(categoryId: any) {
    return this.http.get(`${appUrl}/categories/${categoryId}`);
  }
}
