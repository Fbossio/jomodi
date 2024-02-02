import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginCredentials, SignUpCredentials } from '../core/models/auth.interface';
import { alert } from '../utils/alert';


export interface UserPayload extends JwtPayload {
  role?: string;
  name?: string;
  sub?: string;
}


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
        catchError(err => {
          alert('Error', err.error.message, 'error');
          return throwError(err);
        })
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
                catchError(err => {
                  alert('Error', err.error.message, 'error');
                  return throwError(err);
                })
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

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  get currentUser(): UserPayload | null {
    let token = localStorage.getItem('id_token');
    if (!token) {
      return null;
    }
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      return null;
    }
  }

  isAdmin() {
    const user = this.currentUser;
    if (user && user.role === 'admin') {
      return true;
    }
    return false;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('id_token');
    headers = headers.set('Authorization', `Bearer ${token}`);
    const httpOptions = {
      headers: headers
    };
    return httpOptions;
  }


}
