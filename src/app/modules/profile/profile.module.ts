import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { EditProfilComponent } from './components/edit-profil/edit-profil.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfilComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileModule { }
