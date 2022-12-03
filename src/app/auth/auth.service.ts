import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user/user.model';

const AUTH_API = 'https://ficfac.app/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'auth/login', {
      username,
      password
    }, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'user', user, httpOptions);
  }
}