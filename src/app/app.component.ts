import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LAB';

  //1.creation de la bd (db.json)
  //2.installer le backend(json-server)
  //3.dans Membercomponent =>demander les données a partir du service(MemberService =>flèche 1)
  //4.MemberService=>envoyer une requete en mode Get
  //5.notifier MemberComponent(flèche 3 et 4)
  
}
