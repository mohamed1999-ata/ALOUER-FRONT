import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/auth/reset-password.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 resetForm : any =  FormGroup;
 token : any ;
  constructor(private fb : FormBuilder , private aus : ResetPasswordService ,
    private router : Router , private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password : ['' , Validators.compose([])] ,
      confirmPassword : ['', Validators.compose([])]
    }) ;
    this.token = this.route.snapshot.paramMap.get('token');
  }


  reset(f : any ){
    this.aus.resetPassword({password : `${f.get('password').value}`} , this.token).subscribe(data=>{
          this.successNotification()
           this.router.navigate(['auth/login']) ;
           
    })
  }




  successNotification() {
    Swal.fire( `Mot de passe a changé avec succès. ` , '', 'success');
  }

}
