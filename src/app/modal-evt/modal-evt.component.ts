import { Component, Inject } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-evt',
  templateUrl: './modal-evt.component.html',
  styleUrls: ['./modal-evt.component.css']
})
export class ModalEvtComponent {

  constructor(private dialogRef: MatDialogRef<ModalEvtComponent>,
    @Inject (MAT_DIALOG_DATA) data:any) {//forçage de type bech iwali boite
    if(data){ //data m3obiya  yaani f edit
      console.log("Données réçues par la boite",data)
      //Extratcion des données et affectation dans le formulaire
      this.form = new FormGroup({
        titre: new FormControl(data.titre), //eli fel html (FormControlName)bech yetsab f tittre hetha 
        datedebut: new FormControl(data.datedebut),
        dateFin: new FormControl(data.dateFin),
        Lieu: new FormControl(data.Lieu),
      })
    }

    else{ //yaani ena f create
      this.form = new FormGroup({
        titre: new FormControl(null), //eli fel html (FormControlName)bech yetsab f tittre hetha 
        datedebut: new FormControl(null),
        dateFin: new FormControl(null),
        Lieu: new FormControl(null),
      })
    }
  } 
  //Reception des données de EventComponent

  form!: FormGroup;


  save() {
    this.dialogRef.close(this.form.value);
    console.log(this.form.value);
    //appler la fonction addEventdu service EventService
    //GetAllEvents pour afficher le tableau mis à jour 
}

close() {
    this.dialogRef.close();
}
}
