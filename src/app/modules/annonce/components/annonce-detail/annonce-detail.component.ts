import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl} from '@angular/forms' ;
import { ActivatedRoute , Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce/annonce.service';
import * as L from 'leaflet';



@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.css']
})
export class AnnonceDetailComponent implements OnInit {
  MyForm :any = FormGroup ;
   prixfinal : any ;
   annonce:any
   annonceImage:any =[] 
   dateMin : any ;
   LongitudeLatitude : any = []
   message : String
    dateFilter : any = []
    depart : Date ;
    arriver : Date ;

   private map: L.Map;
   public centroid: L.LatLngExpression  //
   long :any  
   lat : any 
   
 

  constructor( private  route : ActivatedRoute , private annonceService : AnnonceService , private router : Router) { 
     this.getDate()

  }

  ngOnInit(): void {;
   this.MyForm = new FormGroup({
     'depart' : new FormControl() ,
     'arriver' : new FormControl() ,
     'nbInvite' : new FormControl(1),
   })
   this.MyForm?.get('depart')?.valueChanges.subscribe((selectedValue) => {
     var currentDate : Date = new Date()
     var date : any = this.getDate2(currentDate)
    this.MyForm?.get('arriver')?.setValue(selectedValue +`${this.getDate()}` , {
      onlySelf: true,
    });
  });
   this.getAnnonceDetail()
   
  
   
  }
  getDate(){
    var date = new Date()
    var toDate:any = date.getDate()
    if(toDate <10){
      toDate = '0' + toDate
    }
    var month:any = date.getMonth()+1
    if(month<10){
      month = '0' + month
    }
    var year : any = date.getFullYear()
    this.dateMin = year + '-' + month +'-' +toDate
   }
   getDate2(date:Date){
    var toDate:any = date.getDate()
    if(toDate <10){
      toDate = '0' + toDate
    }
    var month:any = date.getMonth()+1
    if(month<10){
      month = '0' + month
    }
    var year : any = date.getFullYear()
    this.dateMin = year + '-' + month +'-' +toDate
   }

  getAnnonceDetail(){
    const id = this.route.snapshot.paramMap.get('id');
    let disponbilte : any =[]
    this.annonceService.getAnnonceById(id).subscribe(res=>{
      this.annonce = res
      disponbilte  = this.annonce.disponibilte
      this.depart = disponbilte[0].start
      this.arriver = disponbilte[disponbilte.length-1].start
    
      this.long = this.annonce.coordinate?.longitude
      this.lat = this.annonce.coordinate?.latitude
      this.initMap(this.lat,this.long);
     console.log(this.getDisponiblte(disponbilte)) 

      
  })
  }

  /// intialitation de map 
  private initMap(lat?,long?): void {
    this.map = L.map('map', {
      center: [lat,long],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    

    tiles.addTo(this.map);
    var circle = L.circle([lat, long], {
      color: 'blue',
      fillColor: '#f03',
      fillOpacity: 0.1,
      radius: 1000
  }).addTo(this.map);
  L.marker([lat, long]).addTo(this.map)
    .bindPopup(`${this.annonce.titre}`)
    .openPopup();
  
  }
    /// intialitation de map 

getDisponiblte(data:[]){
    var  verif : any
    for(let i =0 ; i<data.length ; i++){
             verif = data[i]
             if(!verif.etat){
               var date = new Date(verif.start)
               this.dateFilter.push(this.formatDate(date))
             }
    }
    console.log("get dispo" , this.dateFilter)
}


myHolidayFilter  = (d: Date | null): boolean => {
  const time=d?.getTime();
  return !this.dateFilter.find(x=> new Date(x).getTime()==time);
};


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
  return  month + '/' + toDate +'/' +year
 }

 formatDate2( date :Date){

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

  funsubmit($event : typeof event){

    if(this.MyForm.value.nbInvite <=this.annonce?.logement.capacite){
        let days : any ;
    let x :any ;
    const prix = this.annonce?.prix;
    var a = new Date(this.MyForm.value.depart);
    var b = new Date(this.MyForm.value.arriver);
    let nbrI = this.MyForm.value.nbInvite
    this.prixfinal = (this.difference(a,b) * prix ) *nbrI;
    const data = {
      depart : this.MyForm.value.depart ,
      arriver : this.MyForm.value.arriver ,
      prixfinal : this.prixfinal ,
      nbInvite : this.MyForm.value.nbInvite,
      annonce : this.annonce?._id,
      locataire : this.annonce?.propritaire?._id
    }
      this.message = ""
    localStorage.setItem('reservation' , JSON.stringify(data))
    }
    else {
      this.message = "le nombre d'invite de superieur a la capacité d’accueil "
      this.prixfinal = null
      depart : this.MyForm.value.depart = null
      arriver : this.MyForm.value.arriver = null
     }
  }

   difference(date1:any, date2:any) {  
    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
      const day = 1000*60*60*24;
    return(date2utc - date1utc)/day
  }

  reserver(){
    if(this.prixfinal){
      this.router.navigateByUrl(`reservation/${this.annonce._id}`)
    }
  }


 

 

 



}
