import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms' ;
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthService , FacebookLoginProvider } from 'angularx-social-login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm : any =FormGroup;
   dataToken : any ;
   messageError :any ;
   public user : any;
   public userName : String 
   public inputPassword : String ="password" ;
  

  
  constructor( private fb : FormBuilder , private aus:AuthServiceService,
    private router : Router , private socialAuthService : SocialAuthService
    ) { 
   
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['' , Validators.compose([Validators.required , Validators.email])],
      password: ['' , Validators.required]
 }) ;

  }
  loginsub( f : any) {
    
    let data = f.value
    try {
      this.aus.login(data).subscribe(res =>{
        this.dataToken = res

        this.aus.saveToken(this.dataToken.token)
        this.aus.saveUser(res)
        this.user =  JSON.parse(JSON.stringify(res))
        this.userName = this.user.user.firstName
        localStorage.setItem('firstName' , JSON.stringify(this.userName))
        this.aus.getCurrentUser()
        this.successNotification()
        if(this.user?.user.roles[0] == "user" || this.user?.user.roles[0] == ""){
               this.router.navigate(['profil/edit'])
        }
        else if(this.user?.user.roles[0] == "admin"){
          this.router.navigate(['admin/dashboard'])

        }
     } , (err) =>{
        this.messageError = "invalid password or email "
     })
    } catch (error) {
       this.messageError = "invalid email or password !"
       console.log(error)
    }
   }
   
   
   showPasswor(event:any):void{
     if(event.target.checked){
      this.inputPassword = "text"
     }
     else{
       this.inputPassword ="password"
     }
   }

     //login with google
   loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) =>{
        this.aus.loginWithGoogle(user.idToken)
        .subscribe((res:any)=> 
          {
            this.aus.saveToken(res.token)
            this.aus.saveUser(res)
            this.successNotification()
            this.router.navigate(['profil/edit'])

          }
        );
      }) 
  }

 //login with facebook

  facebookSignin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(user=>{
      this.aus.loginWithFacebook().subscribe(data=>{
        console.log(data)
      })
    })
  }
   

  successNotification() {
    Swal.fire( `bienvenue ${this.userName}`, 'complétez les information de votre profil', 'success');
  }



}
