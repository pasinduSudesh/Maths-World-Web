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
import { ShowPaperComponent } from './papers/show-paper/show-paper.component';
// import { TimerComponent } from './common/timer/timer.component';
 

// services
import {UploadService } from './services/paper/upload.service';
import { TimerComponent } from './common/timer/timer.component';
import { ShowPaperService } from './services/paper/show-paper.service';
import { PdfViewerComponent } from './common/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileUploaderComponent } from './common/file-uploader/file-uploader.component';
import { DndDirective } from './common/file-uploader/dnd.directive';
import { LoadingComponent } from './common/loading/loading.component';
import { AlertsComponent } from './common/alerts/alerts.component';
import { ListPapersComponent } from './papers/list-papers/list-papers.component';


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
    ShowPaperComponent,
    TimerComponent,
    PdfViewerComponent,
    FileUploaderComponent,
    DndDirective,
    LoadingComponent,
    AlertsComponent,
     PaymentComponent,
     ListPapersComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
    ],
  exports: [
    TimerComponent
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
    UploadService,
    HttpClientModule,
    TimerComponent,
    ShowPaperService,
    FileUploaderComponent,
    PdfViewerComponent,
    LoadingComponent,
    AlertsComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
