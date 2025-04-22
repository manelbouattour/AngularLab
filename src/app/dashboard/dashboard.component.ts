import { Component } from '@angular/core';
import { EvtService } from 'src/Services/evt.service';
import { MemberService } from 'src/Services/member.service';
import { PubService } from 'src/Services/pub.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  NbMembers: number = 0;
  NbEvents: number = 0;
  NbArticles: number = 0;
  NbTools: number = 0;

  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];

  chartDataPie: ChartDataset[] = [];
  chartLabelsPie: string[] = ['Student', 'Teacher'];

  chartDataLine: ChartDataset[] = [];
  chartLabelsLine: string[] = [];

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Event Distribution by Location',
      },
    },
  };

  tab_lieu: string[] = [];
  nbLieu: number[] = [];

  Tab: string[] = [];
  tab_nb: number[] = [];
  nbStudent: number = 0;
  nbTeacher: number = 0;

  constructor(
    private MS: MemberService,
    private ES: EvtService,
    private PS: PubService
  ) {
    // Members data
    this.MS.GetAllMembers().subscribe((res) => {
      this.NbMembers = res.length;

      res.forEach((member: any) => {
        member.type === 'Student' ? this.nbStudent++ : this.nbTeacher++;
        this.Tab.push(member.name);
        this.tab_nb.push(member.tab_evt.length);
      });

      this.chartLabelsLine = this.Tab;
      this.chartDataLine = [
        {
          label: 'Events per Member',
          data: this.tab_nb,
        },
      ];

      this.chartDataPie = [
        {
          label: 'Members Type',
          data: [this.nbStudent, this.nbTeacher],
          backgroundColor: ['#42A5F5', '#66BB6A'],
        },
      ];
    });

    // Events data
    this.ES.GetAllEvents().subscribe((res) => {
      this.NbEvents = res.length;

      // Collect all event locations
      res.forEach((evt: any) => {
        this.tab_lieu.push(evt.Lieu);
      });

      // Get unique locations
      const uniqueLocations = [...new Set(this.tab_lieu)];

      // Count how many times each location appears
      const counts = uniqueLocations.map((location) =>
        this.tab_lieu.filter((x) => x === location).length
      );

      this.chartLabels = uniqueLocations;

      this.chartData = [
        {
          label: 'Events by Location',
          data: counts,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8e5ea2',
            '#3cba9f',
            '#FF9F40',
            '#00C49F',
          ],
        },
      ];
    });

    // Articles data
    this.PS.getallArticles().subscribe((res) => {
      this.NbArticles = res.length;
    });
  }
}
