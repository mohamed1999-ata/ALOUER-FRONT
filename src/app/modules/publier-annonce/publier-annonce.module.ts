import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublierAnnonceRoutingModule } from './publier-annonce-routing.module';
import { PhotosComponent } from './components/photos/photos.component';
import { DescriptionComponent } from './components/description/description.component';
import { EmplacementComponent } from './components/emplacement/emplacement.component';
import { EquipementsDeBaseComponent } from './components/equipements-de-base/equipements-de-base.component';
import { CalendrierComponent } from './components/calendrier/calendrier.component';
import { NotionDeBaseComponent } from './components/notion-de-base/notion-de-base.component';
import { SharedModule } from '../shared/shared.module';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';



import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MaterialModule } from '../../material.module';
import {registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr-TN';
import { DatePipeModule } from '../shared/pipes/date-pipe.module';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { TestComponent } from './components/test/test.component';

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    CalendrierComponent,
    PhotosComponent,
    NotionDeBaseComponent,
    DescriptionComponent,
    EmplacementComponent,
    EquipementsDeBaseComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    PublierAnnonceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    DatePipeModule,
    //DateFormatPipe
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ]
})
export class PublierAnnonceModule { }
