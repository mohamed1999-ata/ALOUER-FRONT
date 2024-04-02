import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl}  from '@angular/forms';
import { ActivatedRoute , Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { AuthServiceService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-demande-reservation',
  templateUrl: './demande-reservation.component.html',
  styleUrls: ['./demande-reservation.component.css']
})
export class DemandeReservationComponent implements OnInit {
   reservation : any =[]
   reservationAccepter : any ;
   totalLength : any 
   page:number = 1
   filterTerm!: string;
   propritaire :any;
   locataire :any;
   messages : any = []
   showMessages :  Boolean ;
   messageForm:any;
   sender : any ;
   currentUser:any ;
   show1: Boolean ;
   show2: Boolean ;
   myForm: any;


  constructor(
    private annonceService : AnnonceService,
    private route : ActivatedRoute,
    private  aus : AuthServiceService,
    private router: Router

    ) {

     }

  ngOnInit(): void {
    this.currentUser =  JSON.parse(localStorage.getItem('user') as any)
    this.messageForm = new FormGroup({
      message : new FormControl('')
    })
    this.myForm = new FormGroup({
      ville : new FormControl(''),
    
    })
    this.getMessages()
    this.getReservation()

  }

  getReservation(){
    const  id  = this.route.snapshot.params['id'];    
    this.annonceService.getReservationByAnnonce(id).subscribe((res:any)=>{
      if(res.length == 0){
        this.show2 = true
    }else{
      this.show1 = true
      this.reservation = res 
      console.log("reservation = ",res)
      this.totalLength= res.length
    }
      
    })
  }


  getResrvationAccepter(){

  }

  pageChangeEvent(event : number){
    this.page = event ;
    this.getReservation()
  
  }

  getIdSender(id){
    this.sender =  id
     this.aus.getProfil(id).subscribe(res=>{
      this.locataire = res
    })
      

    this.getMessages()
  }

  getMessages(){
    let  annonce  = this.route.snapshot.params['id'];  
    let from = this.sender
    let to  = this.currentUser.user._id
    this.propritaire =  this.currentUser.user
  
  
    
    this.annonceService.getMsg({from : `${from}`,to : `${to}`,annonce : `${annonce}`}).subscribe(res=>{
      if(res == []){
        this.showMessages = false
      } else{
        this.showMessages = true
        this.messages = res
      } 
   
    })
  }


  sendMessage(){
    let from = this.propritaire._id;
    let to = this.locataire?._id;
    let  annonce  = this.route.snapshot.params['id'];  
       this.annonceService.addMsg({from : `${from}`, to : `${to}` ,
        message : `${this.messageForm.value.message}` , annonce : `${annonce}`}).subscribe(res=>{
           this.ngOnInit()
        })

  }

// accept reservation 

getReservationById(id:String){
     this.annonceService.getReservationById(id).subscribe((res:any)=>{
       this.reservationAccepter = res ;
       this.acceptReservation(this.reservationAccepter)
     })  
}


// accepter annuler reservation 
  acceptReservation(reservation : any){

          let data = {
            reservationId : `${reservation?._id}`,
            annonceId : `${reservation?.annonce}`,
            depart : `${reservation?.depart}`,
            arriver : `${reservation?.arriveer}`,
          }
          this.annonceService.acceptReservation(data).subscribe(res=>{
            console.log(res)
            this.ngOnInit()
          })
  }



  annulerReservation(reservation :any){
    let data = {
      reservationId : `${reservation?._id}`,
      annonceId : `${reservation?.annonce._id}`,
      depart : `${reservation?.depart}`,
      arriver : `${reservation?.arrive}`,
    }
    this.annonceService.annulerReservation(data).subscribe(res=>{
      console.log(res)
      this.ngOnInit()
    })
  }




  chercherAnnonce(){
    this.annonceService.searchAnnonce(this.myForm.value)
    this.annonceService.annonceRecherche.subscribe((res)=>{
           if(res){
            this.router.navigate(['result'])
           }
    })
  }

}
