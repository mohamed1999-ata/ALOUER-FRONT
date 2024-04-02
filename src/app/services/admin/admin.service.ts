import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , BehaviorSubject  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url: String = 'http://localhost:5000';
  public CountAnnonce :BehaviorSubject<any>
  public Count:Observable<any>;
 count : any ;

  constructor(private http : HttpClient) {
    this.CountAnnonce = new BehaviorSubject(
     0
     )
     this.Count =  this.CountAnnonce.asObservable()
   }


   getAnnonceAccepter() {
    return this.http.get(`${this.url}/accepterAnnonce`);
  }

  
  // accepter annonce 
  acceptAnnonce(data: any) {
    return this.http.put(`${this.url}/acceptAnnonce`, data);
  }


  countUsers(){
    return this.http.get(`${this.url}/CountUsers`);

  }

  countAnnonce(){
    return this.http.get(`${this.url}/api/admin/countAnnoce`).subscribe(res=>{
       this.count = res
       this.CountAnnonce.next(res)
    })
  }

//  nombre de logement group by ville 
  CountLogementGroupByVille() {
    return this.http.get(`${this.url}/api/admin/logementByVille`);

  }

//  le nombre des annonces par mois 

CountAnnoncesGroupByMois() {
  return this.http.get(`${this.url}/api/admin/annoncesParMois`);

}


}
