import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  numberAnnoces : any ;
  constructor(
    private adminService : AdminService ,
    private router : Router
    ) {

   }

  ngOnInit(): void {  
    this.countAnnonce()
  }

  countAnnonce(){
  this.adminService.countAnnonce()
    this.adminService.CountAnnonce.subscribe(res=>{
      this.numberAnnoces = res
      console.log("count annonnces" ,this.numberAnnoces)
   })
  }

  logout(){
    localStorage.removeItem('tokenUser')
    localStorage.removeItem('user') 
    this.router.navigate(['/auth/login'])
  }

}
