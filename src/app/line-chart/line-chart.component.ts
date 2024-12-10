import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() lineChartLabels = [];
  @Input() lineChartData: any;
  chartInstance: Chart | null = null;

  ngOnInit(): void {
    this.chartInstance = new Chart('MyLineChart', {
      type: 'line',
      data: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [
          {
            label: 'Line Chart',
            data: this.lineChartData.data,

            hoverBackgroundColor: ['#E67300'],
            backgroundColor: ['rgba(51, 102, 204, 0.5)'], // Semi-transparent fill
            borderColor: ['#3366CC'], // Line color
            borderWidth: 3.5,
            pointBackgroundColor: '#3366CC', // Points color
            pointBorderColor: '#3366CC', // Point border color
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        indexAxis: 'y',
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['barChartData'] || changes['lineChartLabels']) {
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
