import { Component, Inject } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-evt',
  templateUrl: './modal-evt.component.html',
  styleUrls: ['./modal-evt.component.css']
})
export class ModalEvtComponent {

  constructor(private dialogRef: MatDialogRef<ModalEvtComponent>, //forçage de type bech iwali yothhor en tant que boite sinon il s'affiche sur toute la page si on fait pas le forçage 
    @Inject (MAT_DIALOG_DATA) data:any) {
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
      this.form = new FormGroup({ //instance de formGourp
        titre: new FormControl(null), //eli fel html (FormControlName)bech yetsab f tittre hetha 
        datedebut: new FormControl(null),
        dateFin: new FormControl(null),
        Lieu: new FormControl(null),
      })
    }
  } 
  //Reception des données de EventComponent

  form!: FormGroup;


  save() { // tsaker la boite ama tebath les données de la boite
    this.dialogRef.close(this.form.value);
    console.log(this.form.value);
    //appler la fonction addEventdu service EventService
    //GetAllEvents pour afficher le tableau mis à jour 
}

  close() { // tsaker la boite
    this.dialogRef.close();
}
}
