import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';



@Component({
  selector: 'app-notion-de-base',
  templateUrl: './notion-de-base.component.html',
  styleUrls: ['./notion-de-base.component.css']
})
export class NotionDeBaseComponent implements OnInit {
  NotionDeBase :any = FormGroup ;
  submitted = false;

  constructor(private router :Router,private formBuilder:FormBuilder ,
     private annonceService : AnnonceService) {
        
      }
  ngOnInit() {

    this.NotionDeBase = this.formBuilder.group({
        nombre_de_chambre: ['', Validators.required],
        nombre_de_lits:['', Validators.required],
        salle_de_bain: ['', Validators.required],
        prix: ['', Validators.required],
        surface: ['', Validators.required],
      
    })
}

onSubmit() {
    this.submitted = true;
    let annonce =  JSON.parse(localStorage.getItem('annonce') as any) ;
    const newAnnonce = {...annonce , ...this.NotionDeBase.value}
    this.annonceService.saveAnnonce(newAnnonce)
    this.router.navigate(['publier-votre-anonnce/description'])
}

onReset() {
  this.submitted = false;
 
}





}
