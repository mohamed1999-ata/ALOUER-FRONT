import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';


@Component({
  selector: 'app-search-ville',
  templateUrl: './search-ville.component.html',
  styleUrls: ['./search-ville.component.css']
})
export class SearchVilleComponent implements OnInit {

  constructor(
    private annonceService : AnnonceService,
    private router : Router
  ) { }
  

  ngOnInit(): void {
  }

  show(ville : String){
   let data ={
      ville : `${ville}`
    }
    this.annonceService.annonceByVille(data)
    this.annonceService.annonceRechercheByVille.subscribe((res)=>{
      if(res){
        this.router.navigate(['result'])
      }
})

  }

}
