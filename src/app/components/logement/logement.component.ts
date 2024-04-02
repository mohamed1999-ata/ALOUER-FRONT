import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logement',
  templateUrl: './logement.component.html',
  styleUrls: ['./logement.component.css'],
})
export class LogementComponent implements OnInit {
  logementForm: any = FormGroup;
  submitted = false;

  constructor(private router: Router, 
    private formBuilder: FormBuilder , 
    private annonceService :  AnnonceService) {}
  ngOnInit() {
    this.logementForm = this.formBuilder.group({
      type_logement: ['Apartement', Validators.required],
      type_chambre: ['', Validators.required],
      capacite:[1, Validators.required],
    });
  }
  get f() {
    return this.logementForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.annonceService.saveAnnonce(this.logementForm.value )
    this.router.navigateByUrl('publier-votre-anonnce/notion-de-base')
    this.successNotification()
  }

  onReset() {
    this.submitted = false;
    console.log(this.logementForm.value);
    this.logementForm.reset();
  }


  successNotification() {
    Swal.fire( `Étape suivante `, 'complétez les information de votre annonce','success');
  }
}
