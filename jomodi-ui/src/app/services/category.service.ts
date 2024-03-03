import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
}
