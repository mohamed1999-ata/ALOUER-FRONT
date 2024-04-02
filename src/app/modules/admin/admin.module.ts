import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';




import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminSideBarComponent } from './components/admin-side-bar/admin-side-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { NgChartsModule } from 'ng2-charts';


import { ListUserComponent } from './components/list-user/list-user.component';
import { LisAnnonceComponent } from './components/lis-annonce/lis-annonce.component';
import { HeaderComponent } from './components/header/header.component';
import { PageComponent } from './components/page/page.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminSideBarComponent,
    ListUserComponent,
    LisAnnonceComponent,
    HeaderComponent,
    PageComponent,
    
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    NgxPaginationModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    FormsModule,
    MatBadgeModule,
    NgChartsModule 

    
    


  ]
})
export class AdminModule { }
