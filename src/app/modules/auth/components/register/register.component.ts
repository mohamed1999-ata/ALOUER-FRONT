import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/modules/shared/validators/validators';
import { AuthServiceService } from 'src/app/services/auth/auth.service';
import {Router}  from '@angular/router' ;
import { HttpErrorResponse } from '@angular/common/http';
import { AsyncEmail } from 'src/app/modules/shared/validators/async-email';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm :any = FormGroup ;
  messageError : any ;
  public inputPassword : String ="password" ;


  constructor(
      private fb : FormBuilder  ,
      private aus : AuthServiceService ,
      private router:Router,
      private emailValidator :AsyncEmail
      ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['' , Validators.compose([Validators.required , Validators.pattern('[a-z]*') ])],
      lastName: ['' , Validators.required],
      email: ['',
      [Validators.required, Validators.email],
      [this.emailValidator.existingEmailValidator( )]
      ],
      password: ['', Validators.compose([Validators.required , Validators.minLength(8) ])],
      confirmPassword: ['',Validators.compose([Validators.required ])],
    } ,
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
    );
  
    
  }
 
  onSubmit( f: any ) {
    let data = f.value
    this.aus.register(data).subscribe(data=>{
      this.router.navigate(['auth/login'])
      console.log(data)
    },(err:HttpErrorResponse)=> { this.messageError=err.error.error
      console.log(err);
      
    }
   )
  }
  
 showPassword( event:any ):void{
     if(event.target.checked){
      this.inputPassword = "text"
     }
     else{
     this.inputPassword ="password"
     }
 }
}
