import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CalendarComponent implements OnInit {
  columnsToDisplay = ['id', 'summary', 'shareds_length', 'worker_linked'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;
  calendars: any[] = [];

  displayedColumns: string[] = ['role', 'id'];

  constructor(private CalendarService: CalendarService) {}

  ngOnInit(): void {
    this.CalendarService.list().subscribe(
      (response: any[]) =>
        (this.calendars = response.map((r: any) => ({
          ...r,
          shareds_length: r.shared.length,
          worker_linked: !!r.user
        })))
    );
  }

  async deleteAcl(calendarId: any, aclId: any) {
    await this.CalendarService.deleteAcl(calendarId, aclId)
    
  }

  async deleteCalendar(calendarId: any) {
    await this.CalendarService.deleteCalendar(calendarId)
    
  }
}
