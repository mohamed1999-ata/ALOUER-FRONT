import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  user : any 
  constructor() { 
    this.user = JSON.parse(localStorage.getItem('user') as any)

  }

  ngOnInit(): void {
  }


  navClick(){
    const menu_toggle = document.querySelector('.menu-toggle')
     const sidebar = document.querySelector('.sidebar') 
     menu_toggle?.classList.toggle('is-active') ;
     sidebar?.classList.toggle('is-active') ;
   }
}
