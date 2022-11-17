import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'https://ficfac.app/api/workers/';

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'json' });
  }

  filterEvents(worker_id: string, start: string, end: string): Observable<any> {
    return this.http.get(API_URL + 'events', {
      responseType: 'json',
      params: {
        worker_id,
        start,
        end,
      },
    });
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

  shareCalendar(_id: string): Observable<any> {
    return this.http.get(API_URL + 'share/' + _id, { responseType: 'json' });
  }

  unshareCalendar(_id: string): Observable<any> {
    return this.http.get(API_URL + 'unshare/' + _id, { responseType: 'json' });
  }

  downloadPdf(worker_id: string, start: string, end: string): Observable<any> {
    return this.http.get(API_URL + 'generate/pdf', { responseType: 'arraybuffer', params: {
      worker_id,
      start,
      end
    } });
  }
}
