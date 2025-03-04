import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evt } from 'src/Modeles/Evt';
import { EvtService } from 'src/Services/evt.service';
import { ModalEvtComponent } from '../modal-evt/modal-evt.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']

})
export class EventsComponent implements OnInit,AfterViewInit {
  dataSource: MatTableDataSource<Evt>;
  constructor(private ES:EvtService,private dialog:MatDialog){
    this.dataSource = new MatTableDataSource(); //instance de type material

  }
  displayedColumns: string[] = ['1', '2', '3', '4','5','6'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  fetchData() {
    this.ES.GetAllEvents() //flèche1 
    .subscribe((data)=>{
      this.dataSource.data=data
    }) 
          //flèche 4
  }
  ngOnInit():void
  {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  open(){
    let dialogRef = this.dialog.open(ModalEvtComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(data=>{

      console.log("Dialog output :",data)
      if(data){
        this.ES.addEvent(data).subscribe(()=>{
          this.fetchData()
        })
      }
      });
    }
    openEdit(id:number){
      const DialogConfig=new MatDialogConfig();
      //Récuperer Event à partir de son id 
      this.ES.getEventById(id).subscribe((evtRecuperer)=>{
        DialogConfig.data=evtRecuperer;
        DialogConfig.height= '400px';
        DialogConfig.width = '600px';
        //lancer la boite ModalEvtComponent
        let dialogRef = this.dialog.open(ModalEvtComponent,DialogConfig)
        //Envoie de données vers la boite ModalEvtComponent
        });
    }
}


