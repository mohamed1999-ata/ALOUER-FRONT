import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Observable , BehaviorSubject  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  public User :BehaviorSubject<any>
  public currentUser:Observable<any>;
  helper: any;

  constructor(private http : HttpClient) {
    if (this.userLogedIn()){
      this.User = new BehaviorSubject(
        JSON.parse(localStorage.getItem('user') as any)
       )
       this.currentUser =  this.User.asObservable()
    }
    this.User = new BehaviorSubject(
         null
     )
     this.currentUser =  this.User.asObservable()

   }

  register(body : any){
    return this.http.post('http://localhost:5000/sign-up',body)

  }

  login(body : any){
    return this.http.post('http://localhost:5000/sign-in' , body)
  }

  saveToken(token : any ){
      localStorage.setItem('tokenUser' , token)
  }
  saveUser(user : any ){
    localStorage.setItem('user', JSON.stringify(user))
  }
 
  getCurrentUser() {
    return localStorage.getItem('user');
  }
  userLogedIn(){
    let token =localStorage.getItem('tokenUser');
    
     if(!token){
       return false
     }
     if(this.helper.isTokenExpired(token)){
       return false 
     }
      return true
  }
  
  verifyEmail(data : any){
    return this.http.post("http://localhost:5000/verify-email" , data) ;
  }
  
  loginWithGoogle(idToken : String){
   return this.http.post("http://localhost:5000/google-signin" ,{ idToken })
  }

  loginWithFacebook(){
  return this.http.get("http://localhost:5000/auth/facebook" )
  }

  editUser( body : any , id: any ){
    return this.http.post("http://localhost:5000/edit/"+id , body )
  }

  getUserId(){
    let token =localStorage.getItem('tokenUser');
    if(token){
      let data = JSON.parse(this.getCurrentUser() || '{}');
      let user = data.user._id;
      return user ;
    }
     return false
  }
  
  getUserByid(id : any): Observable<any>{
     return this.http.get("http://localhost:5000/oneUser/"+id).pipe(map(res=>{
       if(res){
        this.User.next(res)
        this.changeUserValue(res)
       }
       return res
    }))
  }

  getProfil( id: any){
    return this.http.get("http://localhost:5000/profil/"+id );
  }

  userAnnonce(id : any){
    return this.http.get("http://localhost:5000/userAnnonce/"+id );

  }

  uploadProfile(image : any , id: any){
    return this.http.put("http://localhost:5000/uploadProfile/"+id,image );
  }



   changeUserValue(userUpdated: any) {
    let user = JSON.parse(localStorage.getItem('user') as any);
    user.user = userUpdated;
    localStorage.setItem('user', JSON.stringify(user));
    this.User.next(user);
  }

  CurrentUser(){
    return this.User.value ;
  }

  allUsers(){
    return this.http.get("http://localhost:5000/allUsers");
  }
}
