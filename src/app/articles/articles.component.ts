import { Component, OnInit } from '@angular/core';
import { Pub } from 'src/Modeles/Pub';
import { PubService } from 'src/Services/pub.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit{
  //injection de dépendances
  constructor(private PS:PubService){}
  dataSource:Pub[]=[]
  //Recupérer les données su service 
  ngOnInit()
  {
    this.fetchData();
  }
  fetchData():void
  {
    this.PS.getallArticles().subscribe((res)=>{
      this.dataSource=res
    })
  }
}
