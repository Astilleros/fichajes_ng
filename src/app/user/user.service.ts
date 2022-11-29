import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://ficfac.app/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  profile(): Observable<any> {
    return this.http.get(`${API_URL}/user`, { responseType: 'json' });
  }

  update( body: any): Observable<any> {
    return this.http.patch(`${API_URL}/user`, body, { responseType: 'json' });
  }

  delete(): Observable<any> {
    return this.http.delete(`${API_URL}/user`, { responseType: 'json' });
  }

  getNewCheckout(): Observable<any> {
    return this.http.post(`${API_URL}/stripe`, { responseType: 'json' });
  }
}