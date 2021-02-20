import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AvailablePapersComponent } from './papers/available-papers/available-papers.component';

import { HttpClientModule } from '@angular/common/http';

import { AvailablePapersService } from './services/available-papers.service'
import { DateService } from './services/util/date.service';
import { AddPaperComponent } from './papers/add-paper/add-paper.component'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    AvailablePapersComponent,
    AddPaperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    ],
  providers: [
    NavbarComponent,
    AvailablePapersService,
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
