import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LisAnnonceComponent } from './components/lis-annonce/lis-annonce.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { PageComponent } from './components/page/page.component';


const routes: Routes = [
  {path :"" , component: PageComponent , children :[
    {path : "dashboard" , component: AdminDashboardComponent},
    {path : "users" , component: ListUserComponent},
    {path : "annonces" , component: LisAnnonceComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
