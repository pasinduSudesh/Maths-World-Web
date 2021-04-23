import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AvailablePapersComponent } from './papers/available-papers/available-papers.component';

// import { AvailablePapersComponent } from './available-papers/available-papers.component';
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

// import { UtilService } from './services/util.service';
import { PaymentComponent } from './payment/payment.component'
import { DateService } from './services/util/date.service';
import { AddPaperComponent } from './papers/add-paper/add-paper.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NavigationComponent } from './admin/navigation/navigation.component';
import { SummaryComponent } from './admin/summary/summary.component'



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    AvailablePapersComponent,
    AddPaperComponent,
    SignupComponent,
    LoginComponent,
    AlertComponent,
    UserAccountComponent,
    KeyCodeComponent,
    PaymentComponent,
    DashboardComponent,
    NavigationComponent,
    SummaryComponent
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
    DateService,
    // UtilService,
    LocalStorage,
    AlertService,
    UserService,
    AuthenticationService,
    HttpClientModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
