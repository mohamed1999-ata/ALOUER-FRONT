import { Component, OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth.service';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
public userName?:any ;
public user : any
public data : any
role : any;

  constructor( public aus : AuthServiceService , private router :Router) { 
    let data = JSON.parse(localStorage.getItem("user") as any)
    this.userName = data?.user.lastName
    this.role = data?.user.roles[0]

   }

  ngOnInit(): void {
    if(this.aus.userLogedIn()){
      this.aus.User?.subscribe(res=>{
        this.data  = res   
        this.user = res.user.firstName  
      })
    }
    let firstName = localStorage.getItem('firstName');
  
    

  }

  logout(){
    localStorage.removeItem('tokenUser')
    localStorage.removeItem('user') 
    localStorage.removeItem('firstName') 
    this.router.navigate(['/auth/login'])
 }
 
 verifAdmin(){
   if(this.role === 'admin'){
     return true
   }
   else{
     return false
   }
 }


  
}
