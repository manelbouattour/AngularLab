import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evt } from 'src/Modeles/Evt';
import { EvtService } from 'src/Services/evt.service';
import { ModalEvtComponent } from '../modal-evt/modal-evt.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';


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
  
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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
  open(){//envoyer les données vers la boite
    let dialogRef = this.dialog.open(ModalEvtComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(data=>{

      console.log("Dialog output :",data)
      if(data){ //idha les champs
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
        dialogRef.afterClosed().subscribe(data=>{
          if(data){ //c pas necessaire
            this.ES.updateEvt(id,data).subscribe(()=>{
              this.fetchData()
            })
          }
        });
    })
}

delete(id:number){
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '200px',
    width: '300px',
  });
  dialogRef.afterClosed().subscribe((result) => {
    if(result){
      this.ES.deleteEvtById(id).subscribe(()=>{
        this.fetchData()
      })
    }
  });
}

}


