import { Component, OnInit } from '@angular/core';
import { Member } from 'src/Modeles/Member';
import { MemberService } from 'src/Services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit { 
  //injection de dépendances : c un mécanisme qui permet d'appeler un service dans un composant 
                              //najem nestaaml service mte3i fel composant(ama lezem el service ikoun il accepte d'etre injectée)
  constructor(private MS:MemberService,private dialog:MatDialog){} //bech najem l accède lel MemberService yaani lel les attributs w méthodes mteha (e3tibaran snaana instance de MemberService)
  displayedColumns: string[] = ['1', '2', '3', '4','5','6']; //contient les ordres des colonnes

  dataSource: Member[] = [];
    
  ngOnInit():void
  { //si tu charges la page , elle se charge de façon automatique
    //appeler le service(GetAllMembers)
    //.subscribe : le composant joue le role de subscriber( yesmaa yaani ykho les données)
    //flèche numero 1 hedha 
    // a est une variable local qui contient  le tableau de member: tableau de memebr jeni m service w tejem testaamelha ken f parenthèse bleu
    this.MS.GetAllMembers() //flèche 1 : appel du service
    .subscribe((a)=>{ //flèche 4
      this.dataSource=a;
    })
  }
  delete(id:string){
    //1- Lancer la boite 
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    //2- attendre le click de user puis tester 
    dialogRef.afterClosed().subscribe((result) => {
          //3 - Si click = confirm =>supprimer
      if(result){//if result je vais effacer
        this.MS.deleteMemberByID(id)//flèche1
        .subscribe(()=>{//flcèhe4
          this.MS.GetAllMembers().subscribe((a)=>{
            this.dataSource=a;
          })
        })
      }
    });
    
  
  }
 
}
