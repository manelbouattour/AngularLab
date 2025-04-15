import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/Services/auth-service.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit{

  isLogin:boolean=false;
  ngOnInit(){
//tester sur la route
    this.router.events.subscribe(()=>{
      this.isLogin=this.router.url.includes('/login');
//islogin=true si la route contient /login
});
}
constructor(private Auth:AuthServiceService,private router:Router){} //injection de dependance
  logout():void{
this.Auth.signOut().then(()=>{
  this.router.navigate(['/login'])

})
}
}
