import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BasicRequest } from './util/basic-request';

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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AvailablePapersService } from './services/available-papers.service'

//import { UtilService } from './services/util.service';
//import { PaymentComponent } from './payment/payment.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ResetpasswordComponentService } from './resetpassword/resetpassword.service';
import { ForgotPasswordComponentService } from './forgotpassword/forgotpassword.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
//import { DateService } from './services/util/date.service';
import { AddPaperComponent } from './papers/add-paper/add-paper.component';
import { Svg1Component } from './svg1/svg1.component';
import { Svg1MobileComponent } from './svg1-mobile/svg1-mobile.component';
import { FooterComponent } from './footer/footer.component'
import { UserComponent } from './admin/user/user.component';
// import { UtilService } from './services/util.service';
import { PaymentComponent } from './payment/payment.component'
import { DateService } from './services/util/date.service';
// import { AddPaperComponent } from './papers/add-paper/add-paper.component';
import { ShowPaperComponent } from './papers/show-paper/show-paper.component';
// import { TimerComponent } from './common/timer/timer.component';
 
import {UserAccessService } from './services/util/user-access.service'
// services
import {UploadService } from './services/paper/upload.service';
import {PaymentDetailsService } from './services/payment/payment-details.service';
import { TimerComponent } from './common/timer/timer.component';
import { ShowPaperService } from './services/paper/show-paper.service';
import { UserDetailsService } from './services/user/user-details.service';
import { PdfViewerComponent } from './common/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileUploaderComponent } from './common/file-uploader/file-uploader.component';
import { DndDirective } from './common/file-uploader/dnd.directive';
import { LoadingComponent } from './common/loading/loading.component';
import { AlertsComponent } from './common/alerts/alerts.component';
import { ListPapersComponent } from './papers/list-papers/list-papers.component';
import { LandingComponent } from './landing/landing.component';
import { ViewPaperAdminComponent } from './papers/view-paper-admin/view-paper-admin.component';
import { EditPaperAdminComponent } from './papers/edit-paper-admin/edit-paper-admin.component';
import { ShowResultComponent } from './papers/show-result/show-result.component';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { SidebarModule } from 'ng-sidebar';
import { UserDetailsComponent } from './admin/user-details/user-details.component';
import { UserDetailsGridComponent } from './admin/user-details-grid/user-details-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { DeleteEditorButtonComponent } from './admin/user-details-grid/delete-editor-button/delete-editor-button.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
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
    
    ResetpasswordComponent,
    ForgotpasswordComponent,
    Svg1Component,
    Svg1MobileComponent,
    FooterComponent,
    ShowPaperComponent,
    TimerComponent,
    PdfViewerComponent,
    FileUploaderComponent,
    DndDirective,
    LoadingComponent,
    AlertsComponent,
     PaymentComponent,
     ListPapersComponent,
     LandingComponent,
     ViewPaperAdminComponent,
     EditPaperAdminComponent,
     ShowResultComponent,
     AdminRootComponent,
     UserComponent,
     UserDetailsComponent,
     UserDetailsGridComponent,
     DeleteEditorButtonComponent,
     AdminLoginComponent,
     DashboardComponent,
     NavigationComponent,
     SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    SidebarModule.forRoot(),
    AgGridModule.withComponents([])
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
    ResetpasswordComponentService,
    ForgotPasswordComponentService,
    UploadService,
    HttpClientModule,
    TimerComponent,
    ShowPaperService,
    FileUploaderComponent,
    PdfViewerComponent,
    LoadingComponent,
    AlertsComponent,
    UserAccessService,
    UserDetailsService,
    PaymentDetailsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicRequest,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
