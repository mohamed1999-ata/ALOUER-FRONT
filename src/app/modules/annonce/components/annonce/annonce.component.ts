import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {
  totalLength : any 
  page:number = 1
   annonces: any  
   logements : any = []
  constructor(private AnnonceService : AnnonceService) {
 

   }

  ngOnInit(): void {
    this.getAnnonce()

  }


  getAnnonce(){
    this.AnnonceService.getAll().subscribe((res:any)=>{
      this.annonces = res
      this.totalLength= res.length
    })
  }

 pageChangeEvent(event : number){
   this.page = event ;
   this.getAnnonce()

 }

}
