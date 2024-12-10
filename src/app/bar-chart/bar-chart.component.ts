import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() barChartLabels = [];
  @Input() barChartData: any;
  chartInstance: Chart | null = null;

  ngOnInit(): void {
   this.chartInstance = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [
          {
            label: 'Bar Chart',
            barThickness: 35,
            data: this.barChartData.data,
            backgroundColor: ['#3366CC'],
            hoverBackgroundColor: ['#E67300'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: '#EAEAEA',
            },
          }
        },
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['barChartData'] || changes['barChartLabels']) {
      this.updateChart();
    }
  }
  private updateChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy the existing chart instance
      this.ngOnInit();
    }
  }
}
