import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfilComponent } from './components/edit-profil/edit-profil.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path : '' , component: ProfileComponent},
  {path : 'edit' , component: EditProfilComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
