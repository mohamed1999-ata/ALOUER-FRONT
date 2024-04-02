import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup , FormControl , Validators} from  '@angular/forms';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { AuthServiceService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
 public descForm : any
 submitted = false
  constructor(private router:Router ,
              private annonceService : AnnonceService
              ) { }

  ngOnInit(): void {
    this.descForm = new FormGroup({
      titre_annonce :  new FormControl("", Validators.required),
      description : new FormControl("" , Validators.required)
    })

  }


  onSubmit() {
    this.submitted = true;
    let annonce =  JSON.parse(localStorage.getItem('annonce') as any) ;
    const newAnnonce = {...annonce , ...this.descForm.value}
    this.annonceService.saveAnnonce(newAnnonce)
   
    this.router.navigate(['publier-votre-anonnce/equipement'])
}

onReset() {
  this.submitted = false;
 
}

}
