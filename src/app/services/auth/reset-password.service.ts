import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  
  public headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  constructor(private http : HttpClient) { }

forgotPassword(data : any){
   return this.http.post("http://localhost:5000/forgot-password",  data ) ;
}
 resetPassword(body : any , token :any){
   return this.http.post("http://localhost:5000/reset/"+token, body) ;
 }

}
