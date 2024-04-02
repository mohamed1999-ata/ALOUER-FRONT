import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultComponent } from './components/result/result.component';
import { SearchComponent } from './components/search/search.component';
import { ProfilPublicComponent } from './components/profil-public/profil-public.component';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { AnnonceDetailComponent } from './components/annonce-detail/annonce-detail.component';



const routes: Routes = [

  { path: 'annonce/:id', component: AnnonceDetailComponent },
      { path: 'result', component: ResultComponent },
      { path: 'user/profil/:id', component: ProfilPublicComponent },
 

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnonceRoutingModule { }
