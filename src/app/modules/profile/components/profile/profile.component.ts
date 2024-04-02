import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth/auth.service';
import {map} from 'rxjs/operators' ;
import {FormGroup , FormControl} from '@angular/forms' ;
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
public userInfo : any 
public myForm : any 
 public photoUrl : any ;
 public currentPhotoUrl : any ;
  constructor(private aus : AuthServiceService) {
    this.myForm = new FormGroup({
      myImage : new FormControl()
    })

   }

  ngOnInit(): void {
    this.aus.getUserByid(this.aus.getUserId()).subscribe(res=>{
      this.userInfo = res ;    
      this.photoUrl = new BehaviorSubject<String>(this.userInfo?.ProfilImage)
      this.currentPhotoUrl = this.photoUrl.asObservable()
    })
  
   
  }


   

  

   uploadeImage(event:any){
    let  f   = <File>event.target.files[0]
    const formData = new FormData()
    formData.append('myImage' ,f,f.name)  
     this.aus.uploadProfile(formData , this.aus.getUserId()).subscribe((data : any) =>{
      this.changePhotoProfile(data.ProfilImage)
    
    
    });
    

  }


changePhotoProfile( newPhoto : String){
    this.photoUrl.next(newPhoto)
}


}
