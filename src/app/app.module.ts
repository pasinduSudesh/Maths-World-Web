import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AvailablePapersComponent } from './available-papers/available-papers.component';
import { LoginComponent } from './login/login.component';
import { LocalStorage } from './util/localStorage.service';
import { AlertService } from './util/alert/alert.service';
import { AlertComponent } from './util/alert/alert.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserAccountComponent } from './user-account/user-account.component';
import { KeyCodeComponent } from './key-code/key-code.component';
import { AuthenticationService } from './util/authentication.service';
import { UserService } from './user-account/user.service';
import { HttpClientModule } from '@angular/common/http';

import { AvailablePapersService } from './services/available-papers.service'
import { UtilService } from './services/util.service'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    AvailablePapersComponent,
    SignupComponent,
    LoginComponent,
    AlertComponent,
    UserAccountComponent,
    KeyCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [
    NavbarComponent,
    AvailablePapersService,
    UtilService,
    LocalStorage,
    AlertService,
    UserService,
    AuthenticationService,
    HttpClientModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
