import { Component } from '@angular/core';


@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent {

 

    user : any 
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user') as any)
  }

 

}
