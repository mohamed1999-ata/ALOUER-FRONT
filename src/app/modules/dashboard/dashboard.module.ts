import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';


import {MatStepperModule} from '@angular/material/stepper';
import {  MatIconModule } from '@angular/material/icon';



import { DashboardRoutingModule } from './dashboard-routing.module';
import { SejourComponent } from './components/sejour/sejour.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailComponent } from './components/detail/detail.component';
import { ModifierComponent } from './components/modifier/modifier.component';
import { DemandeReservationComponent } from './components/demande-reservation/demande-reservation.component';


@NgModule({
  declarations: [
    SejourComponent,
    AnnoncesComponent,
    NavbarComponent,
    DashboardComponent,
    DetailComponent,
    ModifierComponent,
    DemandeReservationComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class DashboardModule { }
