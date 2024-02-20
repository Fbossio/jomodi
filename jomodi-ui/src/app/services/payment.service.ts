import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  api = environment.API_URL;

  constructor(private http: HttpClient) { }

  createToken() {
    return new Promise((resolve, reject) => {
      // Simulate a token creation
      setTimeout(() => {
        resolve('tok_visa');
      }, 1000);
    });
  }

  createPaymentIntent(orderId: string): Observable<any> {
    console.log('Creating payment intent...');
    console.log('Order ID:', orderId);
    const endpoint = `${this.api}/payments/${orderId}`;
    return this.http.post(endpoint, {});
  }
}
