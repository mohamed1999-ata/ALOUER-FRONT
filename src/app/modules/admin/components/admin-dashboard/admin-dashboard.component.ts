import { Component, OnInit } from '@angular/core';
import { Chart, registerables   } from 'chart.js';


import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  CountLogementByVille: any = [];
  CountAnnonces: any = [];
  Ville: [String];
  countNumber = [Number];
  Mois: [String];
  AnnonceCount = [Number];
  Chart: any = [];

  lineChartData: any[] 
  lineChartLabels: any[] 
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: '#2ECA6A',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private adminService: AdminService) {
    Chart.register(...registerables);
    
    
  }

  ngOnInit(): void {
    this.adminService.CountLogementGroupByVille().subscribe((res: any) => {
      this.CountLogementByVille = res;
      console.log('count logement group by ville = ', res);
      this.countNumber = this.CountLogementByVille.map(
        (count: any) => count.villeCount
      );
      this.Ville = this.CountLogementByVille.map(
        (count: any) => count._id.gouvernorat
      );
      this.Chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.Ville,
          datasets: [
            {
              label: 'nombre de logement par ville',
              data: this.countNumber,
              borderWidth: 3,
              fill: 1,
              backgroundColor: 'rgba(93,175,89,0.1)',
              borderColor: '#3e95cd',
            },
          ],
        },
      });
    });


    this.NbrAnnoncesParMois()
  
  }



  // nombre des annonces par mois 
  NbrAnnoncesParMois(){
    this.adminService.CountAnnoncesGroupByMois().subscribe((res:any)=>{
      this.CountAnnonces = res
      this.AnnonceCount = this.CountAnnonces.map(
        (count: any) => count.nbrAnnonce
      );
      this.Mois = this.CountAnnonces.map(
        (count: any) => count._id.date
      );
   this.lineChartLabels = this.getMonth(this.Mois)
   this.lineChartData=[
    { data: this.AnnonceCount, label: 'nombre des annonces par mois ' },
  ];
     console.log("month tab",this.getMonth(this.Mois))

    })
  }



  
getMonth(tab:any){
  let months = [ "","Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", 
           "Juillet", "Aout", "September", "October", "November", "December" ];
  let tab1:any =[String]
  for(let i =0 ;i<tab.length ; i++){
    console.log(tab[i])
    tab1.push(months[tab[i]])
  }
  tab1.splice(0,1)
  return tab1
}



}




