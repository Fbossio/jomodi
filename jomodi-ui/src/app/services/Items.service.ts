import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  api = environment.API_URL;


  constructor(private http: HttpClient) { }

  createItem(item: FormData, options: any): Observable<any> {
    const endpoint = `${this.api}/products`
    return this.http.post(endpoint, item, options);
  }

  getItems(page: number=1, limit:number=10): Observable<any> {
    const endpoint = `${this.api}/products/?page=${page}&limit=${limit}`
    return this.http.get(endpoint);
  }

  getItem(id: number): Observable<any> {
    const endpoint = `${this.api}/products/${id}`
    return this.http.get(endpoint);
  }

  updateItem(id: number, item: any, options: any): Observable<any> {

    const inputObject = {
      name: item.name,
      description: item.description,
      stock: item.stock,
      price: item.price.toString(),
      categoryId: item.categoryId.toString(),
     }
    const endpoint = `${this.api}/products/${id}`
    return this.http.put(endpoint, inputObject, options);
  }

  deleteItem(id: number, options: any): Observable<any> {
    const endpoint = `${this.api}/products/${id}`
    return this.http.delete(endpoint, options);
  }
}
