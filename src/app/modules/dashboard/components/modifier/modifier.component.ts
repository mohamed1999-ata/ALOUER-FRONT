import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css'],
})
export class ModifierComponent implements OnInit {
  logementForm: any = FormGroup;

  annonce: any;
  MyForm: any;
  NotionDeBase: any;
  emplacementForm: any;
  agendaForm: FormGroup;

  selectedFiles?: FileList;
  message: string[] = [];
  previews: string[] = [];
  image: any = [];
  photoForm: any;
  dateMin: any;

  DateDepart: Date;
  DateArriver: Date;

  equipement_de_base: any = [
    { id: 1, name: 'Télévision' },
    { id: 2, name: 'Climatisation' },
    { id: 3, name: 'Chauffage' },
    { id: 4, name: 'Cuisine' },
    { id: 5, name: 'Wifi' },
  ];

  Commodite_additionnelle: any = [
    { id: 1, name: 'Parking gratuit sur place' },
    { id: 2, name: 'Piscine' },
    { id: 3, name: 'Gym' },
    { id: 4, name: 'Cheminée' },
    { id: 5, name: 'Portier / Concierge' },
  ];

  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.MyForm = new FormGroup({
      equipement_de_base: this.formBuilder.array([], [Validators.required]),
      Commodite_additionnelle: this.formBuilder.array(
        [],
        [Validators.required]
      ),
    });
  }

  onCheckboxChange(e) {
    const equipement: FormArray = this.MyForm.get(
      'equipement_de_base'
    ) as FormArray;

    if (e.target.checked) {
      equipement.push(new FormControl(e.target.value));
    } else {
      const index = equipement.controls.findIndex(
        (x) => x.value === e.target.value
      );
      equipement.removeAt(index);
    }
  }

  onCheckboxChange2(e) {
    const Commodite: FormArray = this.MyForm.get(
      'Commodite_additionnelle'
    ) as FormArray;

    if (e.target.checked) {
      Commodite.push(new FormControl(e.target.value));
    } else {
      const index = Commodite.controls.findIndex(
        (x) => x.value === e.target.value
      );
      Commodite.removeAt(index);
    }
  }

  ngOnInit(): void {
    this.logementForm = this.formBuilder.group({
      type_logement: ['', Validators.required],
      type_chambre: ['', Validators.required],
      capacite: [, Validators.required],
    });

    this.NotionDeBase = new FormGroup({
      nombre_de_chambre: new FormControl(),
      nombre_de_lits: new FormControl(),
      salle_de_bain: new FormControl(),
      titre_annonce: new FormControl(),
      description: new FormControl(),
    });

    this.emplacementForm = new FormGroup({
      ville: new FormControl('', Validators.required),
      adress: new FormControl('', Validators.required),
      codePostal: new FormControl('', Validators.required),
      gouvernorat: new FormControl('', Validators.required),
    });

    this.agendaForm = this.formBuilder.group({
      start: [],
      end: [],
      price: [],
    });
    this.photoForm = new FormGroup({
      annonceImage: new FormControl(),
    });

    this.getAnnonceById();
  }

  getAnnonceById() {
    const id = this.route.snapshot.params['id'];

    this.annonceService.getAnnonceById(id).subscribe((res: any) => {
      this.annonce = res;
      console.log(res);

      this.DateDepart = new Date(this.annonce.disponibilte[0].start);
      this.DateArriver = new Date(
        this.annonce.disponibilte[this.annonce.disponibilte.length - 1].start
      );
      console.log(this.DateDepart);
      console.log(this.DateArriver);
    });
  }

  /// image modifier
  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      this.image.push(element);
    }
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  

  saveLogement(f: any) {
    this.annonceService.saveAnnonce(f);
  }

  saveNotionbaseAndDescrption(f: any) {
    let annonce = JSON.parse(localStorage.getItem('annonce') as any);
    const newAnnonce = { ...annonce, ...f };
    this.annonceService.saveAnnonce(newAnnonce);
  }
  saveEquipement() {
    console.log(this.MyForm.value);
    let equipement = {
      equipement_de_base: this.MyForm.value.equipement_de_base,
      Commodite_additionnelle: this.MyForm.value.Commodite_additionnelle,
    };
    let annonce = JSON.parse(localStorage.getItem('annonce') as any);
    const newAnnonce = { ...annonce, ...equipement };
    this.annonceService.saveAnnonce(newAnnonce);
  }

  saveEmplacement(f: any) {
    console.log(f);
    let annonce = JSON.parse(localStorage.getItem('annonce') as any);
    const newAnnonce = { ...annonce, ...f };
    this.annonceService.saveAnnonce(newAnnonce);
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  saveCalendar(f: any) {
    console.log(f);
    let annonce = JSON.parse(localStorage.getItem('annonce') as any);
    const newAnnonce = { ...annonce, ...f };
    this.annonceService.saveAnnonce(newAnnonce);
    let data = JSON.parse(localStorage.getItem('annonce') as any);

    const id = this.route.snapshot.params['id'];

    this.annonceService.updateAnnonce(data, id).subscribe((res) => {
      localStorage.removeItem('annonce'); 
    },err=>{
        console.log(err)
    });
  }
 

  /// uploade images  


  uploadFiles(): void {
    let f = <File>this.photoForm.value;
    const formData = new FormData();

    for (let i = 0; i < this.image.length; i++) {
      const element = this.image[i];
      formData.append('annonceImage', element);
    }
    const annonceId = this.route.snapshot.params['id'];

    this.annonceService.upload(formData, annonceId).subscribe((data: any) => {
       Swal.fire( `upload  succesfulley `, '','success');
      this.previews = [];
      this.router.navigate(['annonces/user'])

    });
  }




}




