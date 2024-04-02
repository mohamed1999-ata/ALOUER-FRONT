import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { AuthServiceService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  annonce: any;
  reservationInfo: any;
  currentUser: any;
  messageForm : any;
  message : any
  constructor(
    private annonceService: AnnonceService,
    private route: ActivatedRoute,
    private aus : AuthServiceService,
    private router : Router
  ) {
    this.reservationInfo = JSON.parse(
      localStorage.getItem('reservation') as any
    );
    this.currentUser = JSON.parse(localStorage.getItem('user') as any);

    this.messageForm = new FormGroup({
      message : new FormControl()
    })

  
  }

  ngOnInit(): void {
    this.getAnnonce();
    console.log("format date" ,this.formatDate(new Date(Date.now())))
  }

  formatDate( date :Date){

    var toDate:any = date.getDate()
    if(toDate <10){
      toDate = '0' + toDate
    }
    var month:any = date.getMonth()+1
    if(month<10){
      month = '0' + month
    }
    var year : any = date.getFullYear()
    return  year + '/' + month +'/' +toDate
   }

  getAnnonce() {
    const id: any = this.route.snapshot.paramMap.get('id');
    this.annonceService.getAnnonceById(id).subscribe((res) => {
      this.annonce = res;
      this.message = `salut  ${this.annonce?.propritaire.firstName} 
       a proposde votre annonce  
       ${this.annonce?.titre}  à ${this.annonce?.logement.ville}
       de je demande de réserver ce logement de ${this.formatDate(new Date(this.reservationInfo?.depart))} 
       à ${this.formatDate(new Date(this.reservationInfo?.arriver))},
       pour  ${this.reservationInfo?.nbInvite} personne  `

       console.log("message = " ,this.message)

    });
  }

 



  sendMessage(){
       let propritaire_id  = this.annonce?.propritaire._id
       let currentUserId =  this.aus.getUserId()
       let message = {

          from :  `${currentUserId}` ,
          to :     `${propritaire_id}` ,
          message : `${this.message}`,
          annonce :  `${this.reservationInfo?.annonce}`
       }

       this.annonceService.addMsg(message).subscribe(res=>{
           this.router.navigate(['annonces/sejour'])
           Swal.fire( `Votre demande de réservation est ajoutée avec succès.
            `, '','success');
       }) ;

      this.ReserverAnnonce()
   
     }

     ReserverAnnonce() {
      let currentUserId =  this.aus.getUserId()

      var reservation = {
           depart : `${this.reservationInfo?.depart}`,
           arriver : `${this.reservationInfo?.arriver}`,
           prix_final : `${this.reservationInfo?.prixfinal}`,
           locataire : `${currentUserId}`,
           nbInvite :  `${this.reservationInfo?.nbInvite}`,
           annonce : `${this.reservationInfo?.annonce}`
      }
      this.annonceService.ReserverAnnonce(reservation).subscribe(res=>{
            console.log(res)
      })
  
    }




}
