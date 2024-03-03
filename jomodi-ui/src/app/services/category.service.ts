import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateCategory } from '../core/models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api = environment.API_URL;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    const endpoint = `${this.api}/category`
    return this.http.get(endpoint);
  }

  getCategory(id: number): Observable<any> {
    const endpoint = `${this.api}/category/${id}`
    return this.http.get(endpoint);
  }

  createCategory(category: CreateCategory, options: any): Observable<any> {
    const endpoint = `${this.api}/category`
    return this.http.post(endpoint, category, options);
  }

  updateCategory(id: number, category: CreateCategory, options: any): Observable<any> {
    const endpoint = `${this.api}/category/${id}`
    return this.http.put(endpoint, category, options);
  }

  deleteCategory(id: number, options: any): Observable<any> {
    const endpoint = `${this.api}/category/${id}`
    return this.http.delete(endpoint, options);
  }
}
