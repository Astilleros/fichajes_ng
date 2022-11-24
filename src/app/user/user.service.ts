import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  profile(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'json' });
  }

  update( body: any): Observable<any> {
    return this.http.patch(API_URL, body, { responseType: 'json' });
  }

  delete(): Observable<any> {
    return this.http.delete(API_URL, { responseType: 'json' });
  }
}