import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalComponentComponent } from './components/global-component/global-component.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/guards/auth.guard';
import { AnnonceDetailComponent } from './modules/annonce/components/annonce-detail/annonce-detail.component';
import { ReservationComponent } from './modules/annonce/components/reservation/reservation.component';
import { ResultComponent } from './modules/annonce/components/result/result.component';
import { ProfilPublicComponent } from './modules/annonce/components/profil-public/profil-public.component';
import { RoleGuardGuard } from './services/guards/role-guard.guard';
import { NewAnnonceComponent } from './components/new-annonce/new-annonce.component';
import { LogementComponent } from './components/logement/logement.component';

const routes: Routes = [
  {
    path: '',
    component: GlobalComponentComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'profil',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        canActivate: [AuthGuard],
      },
      { path: '', component: HomeComponent },
      {
        path: '',
        loadChildren: () =>
          import('./modules/annonce/annonce.module').then((m) => m.AnnonceModule),
        canActivate: [AuthGuard],
      },
      { path: 'publier-votre-anonnce/new', component: LogementComponent },
      { path: 'reservation/:id', component: ReservationComponent },
      {
        path: 'annonces',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, RoleGuardGuard],
  },
  
  {
    path: '',
    component: NewAnnonceComponent,
    children: [
      {
        path: 'publier-votre-anonnce',
        loadChildren: () =>
          import('./modules/publier-annonce/publier-annonce.module').then(
            (m) => m.PublierAnnonceModule
          ),
      },
    ],
  },
 

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
