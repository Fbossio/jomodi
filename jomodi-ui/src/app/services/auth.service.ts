import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from "moment";
import { Observable, map, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginCredentials } from '../core/models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = environment.API_URL;

  constructor(private http: HttpClient) { }

 signup(data: any): Observable<any> {
    const endpoint = `${this.api}/auth/signup`
    return this.http.post(endpoint, data)
      .pipe(
            tap(res => this.setSession(res)),
            shareReplay()
            );
 }

  login(data: LoginCredentials): Observable<any> {
    const endpoint = `${this.api}/auth/signin`
    return this.http.post(endpoint, data)
              .pipe(
                map((res: any) => {
                  if (res && res.access_token) {
                    this.setSession(res);
                    return true;
                  }
                  return false;
                }),
              )
  }

  private setSession(authResult: any) {
    // const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.access_token);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (expiration !== null) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }
}
