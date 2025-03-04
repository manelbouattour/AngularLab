import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  // injection de dépedance
  constructor(private MS: MemberService,private router:Router,private activatedRoute:ActivatedRoute) {}

  form!: FormGroup
  idCourant!:string
  ngOnInit() { 
    //1-chercher id dans la route actif 
    this.idCourant=this.activatedRoute.snapshot.params['id'];//snapshot:captu ecran, params:décomposition
    console.log(this.idCourant)
    if(this.idCourant){
      //je suis dans edit
      this.MS.GetAllMembersById(this.idCourant)//
      .subscribe(a=>{
        this.form = new FormGroup({
          cin: new FormControl(a.cin,[Validators.required]),
          name: new FormControl(a.name),
          type: new FormControl(a.type),
          createdDate: new FormControl(a.createdDate)
        })
      })
    }
    else {
      this.form = new FormGroup({
        cin: new FormControl(null,[Validators.required]),
        name: new FormControl(null),
        type: new FormControl(null),
        createdDate: new FormControl(null)
      })
    }
    //2-si id existe =>dans le cas edit getMemberByID(this.idCourant)
    //3-sinon =>je suis dans create
    //initiliser le formulaire à nulle

  }

  sub(){
    this.idCourant=this.activatedRoute.snapshot.params['id'];
    if(this.idCourant){
      //je suis dans edit
      this.MS.UpdateMember(this.idCourant,this.form.value)//
      .subscribe(()=>{
        this.router.navigate([''])
      })
    }
    else {
    console.log(this.form.value);
    //flèche 1
    this.MS.addMember(this.form.value)////.flèch4
    .subscribe(()=>{
      //redirection vers la page ''
      this.router.navigate([''])
    })
  }
}
}
