import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pub } from 'src/Modeles/Pub';
import { PubService } from 'src/Services/pub.service';

@Component({
  selector: 'app-pub-visibility',
  templateUrl: './pub-visibility.component.html',
  styleUrls: ['./pub-visibility.component.css']
})
export class PubVisibilityComponent {
  pubRec!: Pub;

  constructor(
    public dialogRef: MatDialogRef<PubVisibilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private PS: PubService
  ) {
    console.log(data);
    this.PS.getPubById(data).subscribe((pub) => {
      this.pubRec = pub; // Fixed: Assign the received pub instead of this.pubRec
    });
  }
}