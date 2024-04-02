import { Component, OnInit , ViewChild } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { AuthServiceService } from 'src/app/services/auth/auth.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
 

  userAnnonces : any
  totalLength : any 
  page:number = 1
   showAnnonceList? : boolean = false
   annonceId : any;
   filterTerm!: string;
   images: any[];
 
  constructor(
    private annonceService : AnnonceService,
    private aus : AuthServiceService
    ) { }

  ngOnInit(): void {
    this.getUserAnnonces()
    
  }

getUserAnnonces(){
  
  var id = this.aus.getUserId()
  this.aus.userAnnonce(id).subscribe((res:any)=>{
    if(res?.length == 0){
      this.showAnnonceList = false
    }else{
      this.userAnnonces = res
      console.log(res)
      this.totalLength= res.length
      this.showAnnonceList = true
    }
   
  })
}
getAnnoncesNonPublier(){
  
  var id = this.aus.getUserId()
  this.annonceService.UserAnnonceNonAccepter(id).subscribe((res:any)=>{
    if(res?.length == 0){
      this.showAnnonceList = false
    }else{
      this.userAnnonces = res
      this.totalLength= res.length
      this.showAnnonceList = true
    }
    
   
  })
}

pageChangeEvent(event : number){
  this.page = event ;
  this.getUserAnnonces()

}

supprimerAnnonce(id){
  console.log(id)
    this.annonceService.supprimerAnnonce(id).subscribe(res=>{
         this.ngOnInit()
    })
}

supprimer(id:String){
  this.annonceId = id
}


showImage(image: any) {
  this.images = image;
  console.log(image)
}


}
