import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import {FormGroup , FormControl ,Validators} from '@angular/forms';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  show1 : Boolean ;
  show2 : Boolean ;
  result : any 
  result1 : any 
  totalLength : any 
  totalLength2 : any 
  page:number = 1
 searchForm : any;
 dateMin : any ;
 datemax : any ;

 
  constructor(private annonceService : AnnonceService ) 
   {

   }

   setDateMax(){
     if(this.dateMin){
        this.datemax = this.addDays(new Date() , 1)
     }
   }
    addDays = (date: Date, days: number): Date => {
    date.setDate(date.getDate() + days);
    return date;
  };

  getDate(){
    var date = new Date()
    var toDate:any = date.getDate()
    if(toDate <10){
      toDate = '0' + toDate
    }
    var month:any = date.getMonth()+1
    if(month<10){
      month = '0' + month
    }
    var year : any = date.getFullYear()
    this.dateMin = year + '-' + month +'-' +toDate
   }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      depart :new FormControl('',Validators.required),
      arriver :new FormControl('',Validators.required),
      ville :new FormControl('',Validators.required),
      type :new FormControl('',Validators.required),
      prixMin :new FormControl('',Validators.required),
      prixMax :new FormControl('',Validators.required)
    })
    this.getAnnonceRecherByVille()
    this.getAnnonce()
  }



getAnnonce(){
  this.annonceService.annonceRecherche.subscribe((res:any)=>{
   
    if( res?.length ==0  || res==null ){
     this.show1= true
     this.show2 = false
     this.totalLength= 0
     this.result1 = []
     this.result = []
    }
    else{
      this.result1 = []
      this.result = res
      console.log('result rech ' , res)
      this.totalLength= res?.length
      this.show2 = true
      this.show1= false
    }
     
  })
}


getAnnonceRecherByVille(){
  this.annonceService.annonceRechercheByVille.subscribe((res:any)=>{ 
   
      console.log("annonce by ville" , res) 
      this.result = []
      this.result1 = res
      this.show1 = false
      this.show2 = true
      this.totalLength2= res?.length  
    
      
})

}
  pageChangeEvent(event : number){
    this.page = event ;
    this.getAnnonce()
    this.getAnnonceRecherByVille()
 
  }


  navClick(){
    const menu_toggle = document.querySelector('.menu-toggle')
     const sidebar = document.querySelector('.sidebar') 
     menu_toggle?.classList.toggle('is-active') ;
     sidebar?.classList.toggle('is-active') ;
   }

  


  

   filtreAnnonces(){
    this.annonceService.rechercheAnnonce(this.searchForm.value)
    this.getAnnonce()
  
     
   }

  



   
  

}
