import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profil-public',
  templateUrl: './profil-public.component.html',
  styleUrls: ['./profil-public.component.css']
})
export class ProfilPublicComponent implements OnInit {
  profil : any ;
  annonces : any ;
  totalLength : any 
  page:number = 1
  constructor(private route : ActivatedRoute , private aus : AuthServiceService) { }

  ngOnInit(): void {
    this.getProfile()
    this.getAnnonce()

    this.aus.userAnnonce(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
    })
  }
   getProfile(){
    let id = this.route.snapshot.paramMap.get('id');
    this.aus.getProfil(id).subscribe(res=>{
      this.profil = res
    })
   }

   getAnnonce(){
    let id = this.route.snapshot.paramMap.get('id');
    this.aus.userAnnonce(id).subscribe((res:any)=>{
      this.annonces = res
      this.totalLength= res.length
      console.log(res)
    })
   }

   pageChangeEvent(event : number){
    this.page = event ;
    this.getAnnonce()
 
  }


}
