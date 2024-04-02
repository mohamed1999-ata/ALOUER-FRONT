import { Component, Output, OnInit } from '@angular/core';
import { FormGroup , FormControl} from  '@angular/forms' ;
import { EventEmitter } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm : any

  constructor(private annonceService : AnnonceService ,
              private router : Router
         ) {
   }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      ville : new FormControl(''),
      depart  : new FormControl(),
      arriver : new FormControl(),
      type : new FormControl(''),
    })
  }
 
 onsubmit(){
     this.annonceService.searchAnnonce(this.searchForm.value)
     this.annonceService.annonceRecherche.subscribe((res)=>{
            if(res){
              this.router.navigate(['result'])
            }
     })
 

  }



}
