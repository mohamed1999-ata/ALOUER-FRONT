import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl}  from '@angular/forms';
import { Router } from '@angular/router';

import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import { AuthServiceService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sejour',
  templateUrl: './sejour.component.html',
  styleUrls: ['./sejour.component.css']
})
export class SejourComponent implements OnInit {
  show1 : Boolean  ;
  show2 : Boolean  ;
  filterTerm!: string;
  userSerjours : any =[]
  totalLength : any 
  page:number = 1
  propritaire :any;
  locataire :any;
  messages : any = []
  showMessages :  Boolean ;
  messageForm:any;
  sender : any ;
  currentUser:any ;
  annonce: any

  myForm: any;

  constructor(
    private annonceService : AnnonceService,
    private aus : AuthServiceService,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message : new FormControl('')
    })

    this.myForm = new FormGroup({
      ville : new FormControl(''),
    
    })
    this.currentUser =  JSON.parse(localStorage.getItem('user') as any)
    this.getUserSejours()
     this.getMessages()
  }

  getUserSejours(){
     let id = this.aus.getUserId()
 
     this.annonceService.getUserSejours(id).subscribe((res:any)=>{
      if(res.length == 0){
          this.show2 = true
      }else{
        this.userSerjours = res
        this.totalLength= res.length
        this.show1 = true
        console.log(res)
      }
      
     })
  }

  getUserSejoursAccepter(){


  }

  supprimer(id:any){

  }

  pageChangeEvent(event : number){
    this.page = event ;
    this.getUserSejours()
  
  }

  getIdSender(id,annonce){
    this.annonce = annonce
    this.sender = id
    this.aus.getProfil(id).subscribe(res=>{
      this.propritaire = res
    })
      this.getMessages()
  }


  //get messages //

  getMessages(){
    let from = this.sender
    let to  = this.currentUser.user._id
    const annonce = this.annonce
    this.propritaire =  this.currentUser.user  
    this.annonceService.getMsg({from : `${from}`,to : `${to}`,annonce : `${annonce}`}).subscribe(res=>{
      if(res == []){
        this.showMessages = false
      } else{
        this.showMessages = true
        this.messages = res
        console.log(res)
      } 
   
    })
  }




// send message 
  sendMessage(){

    let from = this.currentUser.user._id;
    let to = this.sender
    
    console.log("from = ", from)
    console.log("to = ", to)
    console.log("annonce = ", this.annonce)

       this.annonceService.addMsg({from : `${from}`, to : `${to}` ,
        message : `${this.messageForm.value.message}` , annonce : `${this.annonce}`}).subscribe(res=>{
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
