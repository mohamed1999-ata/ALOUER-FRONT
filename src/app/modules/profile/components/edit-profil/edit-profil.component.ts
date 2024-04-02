import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth/auth.service';
import { FormControl , FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {
  public userInfo : any ;
  myForm : any  ;
  profilForm : any ;
  public photoUrl : any ;
  public currentPhotoUrl : any ;

  constructor(private aus : AuthServiceService ) { 
    this.myForm = new FormGroup({
      firstName : new FormControl(),
      lastName : new FormControl(),
      email : new FormControl(),
      numeroTelephone : new FormControl(),
      ville : new FormControl(),
      adresse : new FormControl()
    })
    this.profilForm = new FormGroup({
      myImage : new FormControl()
    })
  }

  ngOnInit(): void {
    
    this.aus.getUserByid(this.aus.getUserId()).subscribe(res=>{
      this.userInfo = res ;  
      this.photoUrl = new BehaviorSubject<String>(this.userInfo?.ProfilImage)
      this.currentPhotoUrl = this.photoUrl.asObservable()
    })
   

    const u = JSON.parse(localStorage.getItem('user') as any)
   
  }

  EditUSer(form: any){
    const id =  this.aus.getUserId()
    this.aus.editUser(form , id).subscribe(res=>{
     this.successNotification()
       this.aus.changeUserValue(res)
       },err=>{
        alert(err) 

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

  

successNotification() {
  Swal.fire( `Profil `, 'profil modifier avec success','success');
}
}
