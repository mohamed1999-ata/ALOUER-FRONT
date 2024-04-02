import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { AuthServiceService } from 'src/app/services/auth/auth.service';
import { FormGroup , FormControl} from '@angular/forms'
import Swal from 'sweetalert2';
import { from } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  selectedFiles?: FileList;
  message: string[] = [];
  previews: string[] = [];
  image : any =[]
  photoForm : any 
 
  constructor( private anonnceService : AnnonceService,
               private  aus : AuthServiceService, 
               private router : Router
               ) { }

  ngOnInit(): void {
    this.photoForm = new FormGroup({
      annonceImage : new FormControl()
    })
  }


  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    const files:FileList = event.target.files
    for(let i =0 ; i<files.length ;i++){
      const element = files[i]
        this.image.push(element)
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



  uploadFiles(): void {
    let  f   = <File>this.photoForm.value
   let annonceId= localStorage.getItem("annonce_id")
   const formData = new FormData()

   for(let i= 0 ; i<this.image.length ;i++){
        const element = this.image[i]
        formData.append("annonceImage", element)
        
   }
    
     this.anonnceService.upload(formData ,annonceId ).subscribe((data : any) =>{
         Swal.fire( `upload file succesfulley `, '','success');
         this.previews = []
        

        });
        this.router.navigate(['publier-votre-anonnce/agenda']) 


  }



  

 
  

}
