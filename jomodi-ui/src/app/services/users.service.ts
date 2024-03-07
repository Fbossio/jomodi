import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAdresses(userId: string, options: any): Observable<any> {
    const endpoint = `${this.api}/address/${userId}`;
    return this.http.get(endpoint, options);
  }

  getDefaulAddress(userId: string, options: any): Observable<any> {
    const endpoint = `${this.api}/address/${userId}/default`;
    return this.http.get(endpoint, options);
  }

  createAddress(address: any, options: any, userId: string): Observable<any> {
    const endpoint = `${this.api}/address/${userId}`;
    return this.http.post(endpoint, address, options);
  }

  changeDefaultAddress(userId: string, addressId: string, options: any): Observable<any> {
    const endpoint = `${this.api}/address/${userId}/${addressId}/default`;
    return this.http.put(endpoint, {}, options);
  }

  deleteAddress(userId: string, addressId: string, options: any): Observable<any> {
    const endpoint = `${this.api}/address/${userId}/${addressId}`;
    return this.http.delete(endpoint, options);
  }
}
