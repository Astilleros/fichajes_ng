import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart-linear-gauge',
  templateUrl: './chart-linear-gauge.component.html',
  styleUrls: ['./chart-linear-gauge.component.css']
})
export class ChartLinearGaugeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() view: [number,number] = [400, 400];
  colorScheme : string | Color = {
    name: 'a',
    selectable: false,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  @Input() value: number = 50;
  @Input() max: number = 50;
  @Input() previousValue: number = 70;
  @Input() units: string = 'counts';

  onSelect(event: any) {
    console.log(event);
  }
  
}
