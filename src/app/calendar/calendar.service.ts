import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

const API_URL = 'https://ficfac.app/api';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(`${API_URL}/calendar/list`, { responseType: 'json' });
  }

  deleteCalendar(calendarId: string): Promise<any> {
    return firstValueFrom(
      this.http.delete(`${API_URL}/calendar/${calendarId}`, {
        responseType: 'json',
      })
    );
  }

  deleteAcl(calendarId: string, aclId: string): Promise<any> {
    return firstValueFrom(
      this.http.delete(`${API_URL}/calendar/acl/${calendarId}/${aclId}`, {
        responseType: 'json',
      })
    );
  }
}
