import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pub } from 'src/Modeles/Pub';
import { PubService } from 'src/Services/pub.service';
import { PubVisibilityComponent } from '../pub-visibility/pub-visibility.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticlesComponent implements OnInit{

  displayedColumns: string[] = ['1', '2', '3', '4','5','6'];
  dataSource = new MatTableDataSource();

  //injection de dépendances
  constructor(private PS:PubService,private dialog:MatDialog){}
 

  //Recupérer les données su service 
  ngOnInit()
  {
    this.fetchData();
  }
  fetchData():void
  {
    this.PS.getallArticles().subscribe((res)=>{
      this.dataSource.data=res
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open(id:string){
    const DialogConfig=new MatDialogConfig();
    DialogConfig.data=id;
    //lancer la boite et envoyer les données 
      let dialogRef = this.dialog.open(PubVisibilityComponent, DialogConfig);
      

  }
}
