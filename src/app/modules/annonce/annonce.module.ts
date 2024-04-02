import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnnonceRoutingModule } from './annonce-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ResultComponent } from './components/result/result.component';
import { SearchComponent } from './components/search/search.component';
import { ProfilPublicComponent } from './components/profil-public/profil-public.component';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { AnnonceDetailComponent } from './components/annonce-detail/annonce-detail.component';
import { SearchVilleComponent } from './components/search-ville/search-ville.component';



import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {  MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
  declarations: [
    AnnonceComponent,
    AnnonceDetailComponent,
    ReservationComponent,
    ResultComponent,
    SearchComponent,
    ProfilPublicComponent,
    SearchVilleComponent
  ],
  imports: [
    CommonModule,
    AnnonceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatFormFieldModule , 
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
   

  ],
  exports :[
    AnnonceComponent,
    ReservationComponent,
    SearchComponent,
    SearchVilleComponent
  ],
})
export class AnnonceModule { }
