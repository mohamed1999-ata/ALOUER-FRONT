import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-lis-annonce',
  templateUrl: './lis-annonce.component.html',
  styleUrls: ['./lis-annonce.component.css'],
})
export class LisAnnonceComponent implements OnInit {
  annonces: any = [];
  message: String = '';
  totalLength: any;
  page: number = 1;
  Descreption: any;

  annonce: any;
  images: any[];

  constructor(
    private annonceService: AnnonceService,
    private adminService : AdminService
    ) {}

  ngOnInit(): void {
    this.getAnnonces();
    this.countAnnonce();

  }

  getAnnonces() {
    this.adminService.getAnnonceAccepter().subscribe((res: any) => {
      if (res == []) {
        this.annonce = false;
      } else {
        this.annonces = res;
        console.log(res);
        this.totalLength = res.length;
        this.annonce = true;
      }
    });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getAnnonces();
  }

  acceptAnnonce(IdAnnonce: String, emailPropriétaire: String) {
    let data = {
      IdAnnonce: `${IdAnnonce}`,
      emailPropriétaire: `${emailPropriétaire}`
    };
  this.adminService.acceptAnnonce(data).subscribe((res) => {
      this.ngOnInit();
    });
  }

  supprimerAnnonce(id: any) {
    this.annonceService.supprimerAnnonce(id).subscribe((res) => {
      this.ngOnInit();
    });
  }

  getData(descreption: String) {
    this.Descreption = descreption;
  }

  showImage(image: any) {
    this.images = image;
  }

  countAnnonce(){
    this.adminService.countAnnonce()
  }



  
}
