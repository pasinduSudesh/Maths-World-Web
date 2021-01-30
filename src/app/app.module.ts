import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AvailablePapersComponent } from './available-papers/available-papers.component';

import { HttpClientModule } from '@angular/common/http';

import { AvailablePapersService } from './services/available-papers.service'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    AvailablePapersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    ],
  providers: [
    NavbarComponent,
    AvailablePapersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
