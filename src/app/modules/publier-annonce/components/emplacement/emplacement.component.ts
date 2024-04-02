import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl , Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { AuthServiceService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.css']
})
export class EmplacementComponent implements OnInit {
emplacementForm : any
MyArr : any = []
result : any = [] ;
message : String ;

annonceId : String ;


  constructor( private annonceService : AnnonceService ,
     private router : Router , 
      private aus : AuthServiceService) { }

  ngOnInit(): void {
    this.emplacementForm =  new FormGroup({
       ville :  new FormControl("", Validators.required),
       adress :  new FormControl("", Validators.required),
       codePostal :  new FormControl("", Validators.required),
       gouvernorat :  new FormControl("", Validators.required),

    })

  }



  onSubmit(){
    
    let annonce =  JSON.parse(localStorage.getItem('annonce') as any) ;
    const newAnnonce = {...annonce , ...this.emplacementForm.value}
    this.annonceService.saveAnnonce(newAnnonce)
    let data = JSON.parse(localStorage.getItem('annonce') as any) ;
    this.annonceService.ajouterAnnonce(data , this.aus.getUserId()).subscribe((res:any)=>{
      this.MyArr=[]
      //this.saveCoordinate(res.id)
      this.annonceId = res.id
      this.getCoordinate()
      this.ngOnInit()
       localStorage.setItem("annonce_id" , res.id)
       localStorage.removeItem("annonce")

    })
   
   
  }

  
  getCoordinate(){
    var data =  this.emplacementForm.value
    this.annonceService.getCoordinate(data).subscribe(res=>{
      this.result =[]
        this.MyArr = res 
        this.myFunction(this.MyArr)
        console.log(res)
    },err=>{
        console.log(err)
    })
  }

   myFunction(arr)
  {
   var out = "<br />";
   var i;
  
   if(arr.length > 0)
   {
    for(i = 0; i < arr.length; i++)
    {
      this.result.push(arr)
    }

   }
   else
   {
    this.message = "Sorry, no results...";
   }
  
  }


   


  saveCoordinate(long : any , lat : any){

   var data = {
     long :  `${long}`,
     lat :  `${lat}`,
     annonce :  `${this.annonceId}`,
   }
   console.log(data)
    this.annonceService.saveCoordinate(data).subscribe(
      res => {
      })
      this.router.navigate(['publier-votre-anonnce/photo'])

  }
  
  saveEmplacement(){
    
  }
 

}
