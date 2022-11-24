import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/tasks/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    //return this.http.post(API_URL + 'filter', {}, httpOptions);
    return this.http.get(API_URL, { responseType: 'json' });
  }

  getOne(_id: string): Observable<any> {
    return this.http.get(API_URL + _id, { responseType: 'json' });
  }

  updateOne(_id: string, body: any): Observable<any> {
    return this.http.patch(API_URL + _id, body, { responseType: 'json' });
  }

  createOne(body: any): Observable<any> {
    return this.http.post(API_URL, body, { responseType: 'json' });
  }

  deleteOne(_id: string): Observable<any> {
    return this.http.delete(API_URL + _id, { responseType: 'json' });
  }
}
