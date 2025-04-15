import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private Auth:AuthServiceService,private router:Router){}

  email:string='';
  password:string='';
  sub(){

console.log(this.email,this.password)
    //2 generer jwt a travers le service 
this.Auth.signInWithEmailAndPassword(this.email,this.password)
.then(()=>{//kima subscribe
  console.log('success')
  //redirection (si success)
  this.router.navigate(['/member'])
})
  }
}
