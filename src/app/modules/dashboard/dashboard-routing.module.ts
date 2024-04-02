import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { SejourComponent } from './components/sejour/sejour.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModifierComponent } from './components/modifier/modifier.component';
import { DemandeReservationComponent } from './components/demande-reservation/demande-reservation.component';


const routes: Routes = [
  {path :"" , component: DashboardComponent , children :[

    {path : "sejour" , component: SejourComponent},
    {path : "user" , component: AnnoncesComponent},
    {path : "user/modifier/:id" , component: ModifierComponent},
    {path : "user/demande-reservation/:id" , component: DemandeReservationComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
