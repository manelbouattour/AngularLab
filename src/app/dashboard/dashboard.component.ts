import { Component } from '@angular/core';
import { EvtService } from 'src/Services/evt.service';
import { MemberService } from 'src/Services/member.service';
import { PubService } from 'src/Services/pub.service';
import {ChartDataset,ChartOptions} from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  NbMembers:number=0;
  NbEvents:number=0;
  NbArticles:number=0;
  NbTools:number=0;
//Line : repartition des evenements par ville
  chartData: ChartDataset[] = [
    {      
     data: [  ]
    }
  ];
  chartLabels: string[] = ['Sousse','Tunis','Sfax'];
  //chartOptions: ChartOptions = {};
//Pie

  chartDataPie:ChartDataset[] = [
    {
      //  Add these
      data: []
    }
  ];

  chartLabelsPie :string[]=['Student','Teacher'];
  chartOptions: ChartOptions = {};

  chartDataLine: ChartDataset[] = [
    {      
     data: [  ]
    }
  ];
  
  chartLabelsLine:string[]=[];

  Tab:string[]=[];



  nbStudent:number=0;
  nbTeacher:number=0;
  nbSousse:number=0;
  nbTunis:number=0;
  nbSfax:number=0;
  tab_nb:number[]=[]
  constructor(private MS :MemberService,private ES:EvtService,private PS:PubService){
    this.MS.GetAllMembers().subscribe((res)=>{
      this.NbMembers=res.length
        //repartition DES MEMBERS EN STUDENT/TEACHER

      for(let i=0;i<this.NbMembers;i++){
        if(res[i].type=="Student")
          this.nbStudent++;
        else this.nbTeacher++;;
      }
      for(let i=0;i<this.NbMembers;i++)
        {
        this.Tab.push(res[i].name)
        this.tab_nb.push(res[i].tab_evt.length)
      }
      this.chartLabelsLine=this.Tab;
    this.chartDataLine=[
      {
        data : this.tab_nb

      }
    ];
      this.chartDataPie= [
        {
          data: [this.nbStudent,this.nbTeacher]
        }
      ];
    
    })
    this.ES.GetAllEvents().subscribe((res)=>{
      this.NbEvents=res.length

      for(let i=0;i<this.NbEvents;i++){
        if(res[i].Lieu=="Sousse"){
          this.nbSousse++;}
          else if(res[i].Lieu=="Tunis"){
            this.nbTunis++;
          }
          else this.nbSfax++;
      }
      this.chartData= [
        {
          data: [this.nbSousse,this.nbTunis,this.nbSfax],
        }
      ];
    } )
    this.PS.getallArticles().subscribe((res)=>{
      this.NbArticles=res.length

    } )
  }





}
