import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginCredentials, SignUpCredentials } from '../core/models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = environment.API_URL;

  constructor(
    private http: HttpClient,
    ) { }

 signup(data: SignUpCredentials): Observable<any> {
    const endpoint = `${this.api}/auth/signup`
    return this.http.post(endpoint, data)
      .pipe(
        map((res: any) => {
          if (res && res.access_token) {
            this.setSession(res);
            return true;
          }
          return false;
        }),
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
    localStorage.setItem('id_token', authResult.access_token);
  }

  logout() {
    localStorage.removeItem("id_token");
  }


  public isLoggedIn() {
    let token = localStorage.getItem('id_token');
    if (!token) {
      return false;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp !== undefined) {
        return decodedToken.exp > currentTime;
      }
    } catch (error) {
      return false;
    }
    return false;
  }

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

  // getExpiration() {
  //   const expiration = localStorage.getItem("expires_at");
  //   if (expiration !== null) {
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  //   }
  //   return null;
  // }
}
