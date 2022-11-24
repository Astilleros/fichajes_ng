import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { firstValueFrom } from 'rxjs';
import { WorkersService } from 'src/app/worker/shared/workers.service';
import { Worker } from 'src/app/worker/shared/worker.model';

@Component({
  selector: 'app-events-months',
  templateUrl: './events-months.component.html',
  styleUrls: ['./events-months.component.css'],
})
export class EventsMonthsComponent implements OnInit {
  
  @Input() month: Date = new Date();
  @Input() data: any[] = [];
  @Input() date: string = new Date().toISOString();
  @Input() worker_id: string = '';
  multi: any;

  worked: { hours: number; days: number } = {
    hours: 0,
    days: 0,
  };
  year_str: string = '2022';
  month_str: string = '11';
  monthStart: Date = new Date(0);
  monthEnd: Date = new Date(0);
  /* 
  multi: any[] =[
    {
      "name": "1",
      "series": [
        {
          "name": "Trabajo",
          "value": 3
        },
        {
          "name": "Descanso",
          "value": 1
        },
        {
          "name": "Trabajo",
          "value": 4
        },
        {
          "name": "Extra",
          "value": 1
        }
      ]
    },
    {
      "name": "2",
      "series": [
        {
          "name": "Trabajo",
          "value": 6
        },
        {
          "name": "Pendientes",
          "value": 2
        }
      ]
    },
    {
      "name": "3",
      "series": [
        {
          "name": "Trabajo",
          "value": 8
        },
        {
          "name": "Extra",
          "value": 1
        }
      ]
    },
    {
      "name": "4",
      "series": [
        {
          "name": "Trabajo",
          "value": 6
        },
        {
          "name": "Pendientes",
          "value": 2
        }
      ]
    },
    {
      "name": "5",
      "series": [
        {
          "name": "Trabajo",
          "value": 8
        },
        {
          "name": "Extra",
          "value": 1
        }
      ]
    },
    {
      "name": "6",
      "series": [
        {
          "name": "Trabajo",
          "value": 6
        },
        {
          "name": "Pendientes",
          "value": 2
        }
      ]
    },
    {
      "name": "7",
      "series": [
        {
          "name": "Trabajo",
          "value": 8
        },
        {
          "name": "Extra",
          "value": 1
        }
      ]
    },
    {
      "name": "8",
      "series": [
        {
          "name": "Trabajo",
          "value": 6
        },
        {
          "name": "Pendientes",
          "value": 2
        }
      ]
    },
    {
      "name": "9",
      "series": [
        {
          "name": "Trabajo",
          "value": 3
        },
        {
          "name": "Descanso",
          "value": 1
        },
        {
          "name": "Trabajo",
          "value": 4
        },
        {
          "name": "Extra",
          "value": 1
        }
      ]
    },
    {
      "name": "10",
      "series": [
        {
          "name": "Trabajo",
          "value": 6
        },
        {
          "name": "Pendientes",
          "value": 2
        }
      ]
    },
    {
      "name": "11",
      "series": [
        {
          "name": "Trabajo",
          "value": 8
        },
        {
          "name": "Extra",
          "value": 1
        }
      ]
    },
    {
      "name": "12",
      "series": [
        {
          "name": "Trabajo",
          "value": 6
        },
        {
          "name": "Pendientes",
          "value": 2
        }
      ]
    },
    {
      "name": "13",
      "series": [
        {
          "name": "Trabajo",
          "value": 8
        },
        {
          "name": "Extra",
          "value": 1
        }
      ]
    },
    {
      "name": "14",
      "series": [
        {
          "name": "Trabajo",
          "value": 6
        },
        {
          "name": "Pendientes",
          "value": 2
        }
      ]
    },
    {
      "name": "15",
      "series": [
        {
          "name": "Trabajo",
          "value": 8
        },
        {
          "name": "Extra",
          "value": 1
        }
      ]
    },
    {
      "name": "16",
      "series": [
        {
          "name": "Trabajo",
          "value": 6
        },
        {
          "name": "Pendientes",
          "value": 2
        }
      ]
    }
  ]
 */
  // options
  view: [number, number] = [500, 200];
  showXAxis: boolean = false;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'dias';
  showYAxisLabel: boolean = false;
  yAxisLabel: string = 'horas';
  yAxisTicks: any[] = [0, 4, 6, 8, 9, 10, 11, 12, 13, 14];
  animations: boolean = true;
  showDataLabel: boolean = true;
  colorScheme: string | Color = {
    name: 'a',
    selectable: false,
    group: ScaleType.Ordinal,
    domain: ['#6b7cff', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(private WorkersService: WorkersService) {}

  async ngOnInit(): Promise<void> {
    await this.updateMonth()
  }

  async previousMonth(): Promise<void> {
    this.updateMonth(-1)
  }

  async nextMonth(): Promise<void> {
    this.updateMonth(1)
  }


  updateWorked(){
    this.worked = {
      hours:
        this.data.reduce((p, e) => {
          if (!e.start.dateTime || !e.end.dateTime) return p;
          const start = new Date(e.start.dateTime).getTime();
          const end = new Date(e.end.dateTime).getTime();
          return p + (end - start) / 60000;
        }, 0) / 60,

      days: this.data.reduce((p, e) => {
        if (!e.start.dateTime || !e.end.dateTime) return p;
        const day = new Date(e.start.dateTime).getDate();
        if (p.indexOf(day) == -1) p.push(day);
        return p;
      }, []).length,
    };
  }

  async updateMonth(increment:number = 0){
    const year = this.month.getFullYear();
    const month = this.month.getMonth();

    this.month = new Date(year, month + increment, 1);

    this.month_str = String(this.month.getMonth() + 1);
    this.year_str = String(this.month.getFullYear());
    

    this.monthStart = new Date(
      this.month.getFullYear(),
      this.month.getMonth(),
      1
    );
    this.monthEnd = new Date(
      this.month.getFullYear(),
      this.month.getMonth() + 1,
      1
    );
      
    //const days = new Date(year, month + 1, 0).getDate();
    const days = Math.round((this.monthEnd.getTime() - this.monthStart.getTime()) / (24*3600000));

    this.data = await firstValueFrom(
      this.WorkersService.filterEvents(this.worker_id, this.monthStart.toISOString(), this.monthEnd.toISOString())
    );

    this.updateWorked()

    
    let base: any = {};
    for (let i = 1; i <= days; i++) {
      base[i] = {
        name: i,
        series: [],
      };
    }
    

    for (let i = 0; i < this.data.length; i++) {
      const e = this.data[i];

      if (!e.start.dateTime || !e.end.dateTime) continue;
      const start = new Date(e.start.dateTime);
      const end = new Date(e.end.dateTime);
   

      base[start.getDate()].series.push({
        name: 'Trabajo',
        value: (end.getTime() - start.getTime()) / 3600000,
      });
    }

    this.multi = Object.keys(base).map((k: string) => base[k]);
  }

  
  async dowloadPdf() {
    let pdf_data = await firstValueFrom(this.WorkersService.downloadPdf(this.worker_id, this.monthStart.toISOString(), this.monthEnd.toISOString()));
    const imageName = 'name.pdf';
    let pdf_file = new File([pdf_data], imageName, { type: 'application/pdf' });
    
    const fileURL = URL.createObjectURL(pdf_file);
    
    window.open(fileURL, '_blank');
  }
}
