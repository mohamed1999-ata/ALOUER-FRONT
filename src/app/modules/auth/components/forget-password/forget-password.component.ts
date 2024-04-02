import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from 'src/app/services/auth/reset-password.service';
import { FormGroup , FormBuilder , Validators} from '@angular/forms' ;
import { ToastComponent, ToastCloseArgs, ToastPositionModel } from '@syncfusion/ej2-angular-notifications';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {


   public message : any ;
  constructor(
     private aus : ResetPasswordService ,
     private fb : FormBuilder     ) { }
forgetForm : any = FormGroup ;
  ngOnInit(): void {
   
    this.forgetForm = this.fb.group({
      email : ['' ,[Validators.required, Validators.email]]
  });
  }

  forget( f : any ){
    const email : any = { email : `${f.get('email').value}`}

    try {
      this.aus.forgotPassword(email).subscribe(res=>{
        this.successNotification()
        this.message = ""
        this.ngOnInit()
      }, err =>{
        this.message = "Aucun compte n’existe pour cet e-mail. "
      })
    } catch (error) {
      
    }
     
  }



  successNotification() {
    Swal.fire( `Un lien de réinitialisation de votre mot de passe a été envoyé à  ${this.forgetForm.value.email}` , '', 'success');
  }

  

}
