import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users : any =[] ;
  totalLength : any 
  page:number = 1
  filterTerm!: string;
  constructor(private aus : AuthServiceService) {

   }

  ngOnInit(): void {
    this.getAllUsers()
  }

 getAllUsers(){
   this.aus.allUsers().subscribe((res:any)=>{
    this.totalLength = res.length
     this.users= res
     console.log(this.users)
  })
 }
   

 pageChangeEvent(event : number){
  this.page = event ;
  this.getAllUsers()

}


}
