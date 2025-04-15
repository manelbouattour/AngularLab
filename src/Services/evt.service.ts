import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/Modeles/Evt';

@Injectable({
  providedIn: 'root'
})
export class EvtService {

  constructor(private http:HttpClient) { }

  GetAllEvents():Observable<Evt[]>
  {
    return this.http.get<Evt[]>("http://localhost:3000/Evt")
   
  }
  addEvent(x:Evt):Observable<void>
  {
    return this.http.post<void>("http://localhost:3000/Evt",x)
  }
  getEventById(id:number):Observable<Evt>
  {
    return this.http.get<Evt>(`http://localhost:3000/Evt/${id}`)
  }
  updateEvt(id:number,x:Evt):Observable<void>
  {
    return this.http.put<void>(`http://localhost:3000/Evt/${id}`,x)
  }
  deleteEvtById(id:number):Observable<Evt[]>
  {
    return this.http.delete<Evt[]>(`http://localhost:3000/Evt/${id}`)
  }
 
}
