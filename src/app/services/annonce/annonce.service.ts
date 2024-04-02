import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  public url: String = 'http://localhost:5000';
  public annonceRecherche: BehaviorSubject<any>;
  public Recherche: Observable<any>;
  public annonceRechercheByVille: BehaviorSubject<any>;
  public RechercheByVille: Observable<any>;

  constructor(private http: HttpClient) {
    this.annonceRecherche = new BehaviorSubject(null);
    this.Recherche = this.annonceRecherche.asObservable();
    this.annonceRechercheByVille = new BehaviorSubject(null);
    this.RechercheByVille = this.annonceRechercheByVille.asObservable();
  }
  
  saveAnnonce(data: any) {
    localStorage.setItem('annonce', JSON.stringify(data));
  }
  getAnnonce() {
    return JSON.parse(localStorage.getItem('annonce') as any);
  }

// ajouter annonce
  ajouterAnnonce(body: any, id) {
    return this.http.post('http://localhost:5000/annonce/new/' + id, body);
  }


//  modifier annonce 
  updateAnnonce(data: any, id) {
    return this.http.put('http://localhost:5000/annonce/edit/' + id, data);
  }


// supprimer annonce
  supprimerAnnonce(id: any) {
    return this.http.delete(`${this.url}/annonce/delete/` + id);
  }


  //  get all annonces
  getAll() {
    return this.http.get(`${this.url}/annonces`);
  }

  //  get logement by id
  getLogement(id: any) {
    return this.http.get(`${this.url}/logement/` + id);
  }
  // get annonce by id
  getAnnonceById(id: any) {
    return this.http.get(`${this.url}/annonce/` + id);
  }
  
  // upload  annonce image 
  upload(file: any, id: any) {
    return this.http.post(`${this.url}/annonce/uploadImageAnnonce/` + id, file);
  }


 // add disponbilite 
  addDisponibilte(data: any, id: any) {
    return this.http.post(`${this.url}/addDisponibilte/` + id, data);
  }



  // recherche annonces 
  rechercheAnnonce(data: any) {
    return this.http
      .post(`${this.url}/rechercheAnnonce`, data)
      .subscribe((res: any) => {
        this.annonceRecherche.next(res);
      });
  }

  annonceByVille(ville: any) {
    return this.http
      .post(`${this.url}/annonceByVille`, ville)
      .subscribe((res: any) => {
        this.annonceRechercheByVille.next(res);
      });
  }
   

  searchAnnonce( data : any){
    return this.http
    .post(`${this.url}/chercherAnnonces`, data)
    .subscribe((res: any) => {
      this.annonceRecherche.next(res);
    });
  }


  //  fin recherche annonces 



  UserAnnonceNonAccepter(id: any) {
    return this.http.get(`${this.url}/AnnonceNonPublier/` + id);
  }

 

 

  ReserverAnnonce(data: any) {
    return this.http.post(`${this.url}/reservation/new`, data);
  }

  getUserSejours(locataire: any) {
    return this.http.get(`${this.url}/sejour/` + locataire);
  }
  getReservationByAnnonce(id: any) {
    return this.http.get(`${this.url}/AnnonnceReservation/` + id);
  }

  addMsg(data: any) {
    return this.http.post(`${this.url}/api/messages/addmsg`, data);
  }

  getMsg(data: any) {
    return this.http.post(`${this.url}/api/messages/getmsg`, data);
  }

  getCoordinate(data: any) {
    return this.http.post(`${this.url}/getLongLat`, data);
  }
  saveCoordinate(data: any) {
    return this.http.post(`${this.url}/saveLongLat`, data);
  }

  ///  acccept  annuleer reservation
  acceptReservation(data: any) {
    return this.http.put(`${this.url}/acceptReservation`, data);
  }

  annulerReservation(data: any) {
    return this.http.put(`${this.url}/annulerReservation`, data);
  }

  /// get Reservation By id
  getReservationById(id: any) {
    return this.http.get(`${this.url}/reservation/` + id);
  }
}
