import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalComponentComponent } from './components/global-component/global-component.component';
import {ReactiveFormsModule } from '@angular/forms' ;
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' ;
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './modules/shared/shared.module';
import { AnnonceModule } from './modules/annonce/annonce.module';
import { NewAnnonceComponent } from './components/new-annonce/new-annonce.component';
import {LogementComponent} from './components/logement/logement.component';



@NgModule({
  declarations: [
    AppComponent,
    GlobalComponentComponent,
    HomeComponent,
    NewAnnonceComponent,
    LogementComponent  ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule ,
    SharedModule,
    AnnonceModule,

  ],
  
  
  bootstrap: [AppComponent]
})
export class AppModule { }
