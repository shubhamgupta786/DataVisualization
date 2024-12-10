import { DatePipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BarChartComponent,FormsModule,DatePipe,LineChartComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  filters = {
    ageGroup: '15-25',
    gender: 'Male',
    startDate: '04/10/2022',
    endDate: '29/10/2022',
  };

  barChartData:any = [];
  barChartLabels:any= [];
  lineChartData:any = [];
  lineChartLabels:any = [];
  selectedCategory: string | null = null;
  currentGraph=true;
  showNavBar: boolean = false;

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route
        this.showNavBar = (event.url !== '/login' && event.url!=='/signup'); // Show navbar if not on /login
      }
    });
  }
  onDateChange(field: 'startDate' | 'endDate', event: string): void {
    const [year, month, day] = event.split('-');
    this.filters[field] = `${day}/${month}/${year}`; // Convert to dd/MM/yyyy format
  }

  parseDateToISO(date: string): string | null {
    if (!date) return null;
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`; // ISO format
  }

  fetchData(): void {
    this.http
      .get<any[]>('/analytics', { params: this.filters })
      .subscribe((data) => {
        // Update bar chart data
        this.barChartLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

        this.barChartData = 
          {
              data: this.barChartLabels.map((label: string | number) =>
              data.reduce((sum, entry) => sum + Number(entry[label]), 0)),
              label: 'Total Time Spent',
              borderWidth: 1
          },
        
        console.log(this.barChartData,this.filters,"DATA OF BAR CHARTS!!!!")
      });
  }

  applyFilters(): void {
    this.fetchData();
    this.selectedCategory = null;
  }

  onBarChartCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.http
      .get<any[]>('/analytics', { params: this.filters })
      .subscribe((data) => {
        this.lineChartLabels = data.map((entry) => entry.Day);
        this.lineChartData = [
          {
            data: data.map((entry) => Number(entry[this.selectedCategory!])),
            label: `Trend for ${category}`,
          },
        ];
      });
  }
  toggleGraph(){
    this.currentGraph=!this.currentGraph
  }
}