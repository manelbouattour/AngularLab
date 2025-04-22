import { Component } from '@angular/core';
import { EvtService } from 'src/Services/evt.service';
import { MemberService } from 'src/Services/member.service';
import { PubService } from 'src/Services/pub.service';
import { ChartDataset, ChartOptions } from 'chart.js';

import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  NbMembers: number = 0;
  NbEvents: number = 0;
  NbArticles: number = 0;
  NbTools: number = 0;

  // Chart data variables
  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
//
  chartDataPie: ChartDataset[] = [];
  chartLabelsPie: string[] = ['Student', 'Teacher'];
//
  chartDataLine: ChartDataset[] = [];
  chartLabelsLine: string[] = [];
//
  chartLabelsBar: string[] = [];
  
  tab_lieu: string[] = [];

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

  Tab: string[] = [];
  tab_nb: number[] = [];

  nbStudent: number = 0;
  nbTeacher: number = 0;

  constructor(
    private MS: MemberService,
    private ES: EvtService,
    private PS: PubService
  ) {
    // Get Members
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

    this.ES.GetAllEvents().subscribe((res) => {
      this.NbEvents = res.length;

      res.forEach((evt: any) => {
        this.tab_lieu.push(evt.Lieu);
      });

      this.chartLabelsBar = [...new Set(this.tab_lieu)];

      const lieuCounts = this.chartLabelsBar.map((lieu) =>
        this.tab_lieu.filter((x) => x === lieu).length
      );

      this.chartLabels = this.chartLabelsBar;

      this.chartData = [
        {
          label: 'EVT par lieu',
          data: lieuCounts,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8e5ea2', '#3cba9f'],
        },
      ];
    });

    this.PS.getallArticles().subscribe((res) => {
      this.NbArticles = res.length;
    });
  }
}
