import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './components/photos/photos.component';
import { DescriptionComponent } from './components/description/description.component';
import { EmplacementComponent } from './components/emplacement/emplacement.component';
import { EquipementsDeBaseComponent } from './components/equipements-de-base/equipements-de-base.component';
import { NotionDeBaseComponent } from './components/notion-de-base/notion-de-base.component';
import { CalendrierComponent } from './components/calendrier/calendrier.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {path:"notion-de-base",component:NotionDeBaseComponent},
  {path:"description",component:DescriptionComponent},
  {path:"emplacement",component:EmplacementComponent},
  {path:"photo",component:PhotosComponent},
  {path:"equipement",component:EquipementsDeBaseComponent},
  {path:'agenda', component:CalendrierComponent},
  {path:'test', component:TestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublierAnnonceRoutingModule { }
