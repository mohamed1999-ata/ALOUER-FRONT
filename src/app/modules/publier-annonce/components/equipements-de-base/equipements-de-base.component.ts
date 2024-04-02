import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipements-de-base',
  templateUrl: './equipements-de-base.component.html',
  styleUrls: ['./equipements-de-base.component.css']
})
export class EquipementsDeBaseComponent implements OnInit {
 equipementForm :FormGroup;
 equipement_de_base: any = [
  { id: 1, name: 'Télévision' },
  { id: 2, name: 'Climatisation' },
  { id: 3, name: 'Chauffage' },
  { id: 4, name: 'Cuisine' },
  { id: 5, name: 'Wifi' }
];

Commodite_additionnelle: any = [
  { id: 1, name: 'Parking gratuit sur place' },
  { id: 2, name: 'Piscine' },
  { id: 3, name: 'Gym' },
  { id: 4, name: 'Cheminée' },
  { id: 5, name: 'Portier / Concierge' }
];
  constructor(private formBuilder: FormBuilder ,
     private annonceService : AnnonceService ,
     private router : Router
     ) {
    this.equipementForm = this.formBuilder.group({
      equipement_de_base : this.formBuilder.array([], [Validators.required]),
      Commodite_additionnelle : this.formBuilder.array([], [Validators.required])
    })
   }

  ngOnInit(): void {
   
  }

  onCheckboxChange(e) {
    const equipement: FormArray = this.equipementForm.get('equipement_de_base') as FormArray;
   
    if (e.target.checked) {
      equipement.push(new FormControl(e.target.value));
    } else {
       const index = equipement.controls.findIndex(x => x.value === e.target.value);
       equipement.removeAt(index);
    }
  }
   

  onCheckboxChange2(e) {
    const Commodite: FormArray = this.equipementForm.get('Commodite_additionnelle') as FormArray;
   
    if (e.target.checked) {
      Commodite.push(new FormControl(e.target.value));
    } else {
       const index = Commodite.controls.findIndex(x => x.value === e.target.value);
       Commodite.removeAt(index);
    }
  }

  onSubmit(){
    let equipement = {
      "equipement_de_base": this.equipementForm.value.equipement_de_base,
      "Commodite_additionnelle" :this.equipementForm.value.Commodite_additionnelle 
    }
    let annonce =  JSON.parse(localStorage.getItem('annonce') as any) ;
    const newAnnonce = {...annonce , ...equipement}
    this.annonceService.saveAnnonce(newAnnonce)
   
    this.router.navigate(['publier-votre-anonnce/emplacement'])
  }
}
