import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from 'src/Modeles/Member';

@Injectable({
  providedIn: 'root'
  // le @injectable c'est un décorateur qui pemret d'injecter le service dans
// dans un composant (ou dans un autre service)
})

export class MemberService {
  constructor(private http:HttpClient) {
    //le constructeur est un endroit pour initialiser les attributs
    }
  GetAllMembers(): Observable<Member[]>//flèche 3
  {//<   > le retour 
    //envoyer une requete en mode GET vers le backend(flèche numero 2)
    return this.http.get<Member[]>('http://localhost:3000/members')
  }// eli < > hedha type de retour du data //kima fel observable kima fel get nafs retour

  addMember(x:Member):Observable<void>//flèche 3
  {
    return this.http.post<void>('http://localhost:3000/members',x) //flèche2
  }

  deleteMemberByID(id:string):Observable<void>{//flèche 3
    return this.http.delete<void>(`http://localhost:3000/members/${id}`) //flèche2
  }
  GetAllMembersById(idCourant:string):Observable<Member>{//flèche 3
    return this.http.get<Member>(`http://localhost:3000/members/${idCourant}`) //flèche2
  }
  UpdateMember(idCourant:string,x:Member):Observable<void>{//flèche 3
    return this.http.put<void>(`http://localhost:3000/members/${idCourant}`,x) //flèche2
  }
}
