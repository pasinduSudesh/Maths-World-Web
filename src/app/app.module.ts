import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { Ng2GoogleRecaptchaModule } from 'ng2-google-recaptcha';
import { BasicRequest } from './util/basic-request';
// import { RecaptchaModule } from "ng-recaptcha";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AvailablePapersComponent } from './student/papers/available-papers/available-papers.component';

// import { AvailablePapersComponent } from './available-papers/available-papers.component';
import { LoginComponent } from './student/login/login.component';
import { LocalStorage } from './util/localStorage.service';
import { AlertService } from './util/alert/alert.service';
import { AlertComponent } from './util/alert/alert.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserAccountComponent } from './student/user-account/user-account.component';
import { KeyCodeComponent } from './student/key-code/key-code.component';
import { AuthenticationService } from './util/authentication.service';
import { UserService } from './student/user-account/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AvailablePapersService } from './services/available-papers.service'

//import { UtilService } from './services/util.service';
//import { PaymentComponent } from './payment/payment.component';
import { ResetpasswordComponent } from './student/resetpassword/resetpassword.component';
import { ResetpasswordComponentService } from './student/resetpassword/resetpassword.service';
import { ForgotPasswordComponentService } from './student/forgotpassword/forgotpassword.service';
import { ForgotpasswordComponent } from './student/forgotpassword/forgotpassword.component';
//import { DateService } from './services/util/date.service';
import { AddPaperComponent } from './admin/add-paper/add-paper.component';
import { Svg1Component } from './svg1/svg1.component';
import { Svg1MobileComponent } from './svg1-mobile/svg1-mobile.component';
import { FooterComponent } from './footer/footer.component'
import { UserComponent } from './admin/user/user.component';
// import { UtilService } from './services/util.service';
import { PaymentComponent } from './student/payment/payment.component'
import { DateService } from './services/util/date.service';
// import { AddPaperComponent } from './papers/add-paper/add-paper.component';
import { ShowPaperComponent } from './student/papers/show-paper/show-paper.component';
// import { TimerComponent } from './common/timer/timer.component';

import { UserAccessService } from './services/util/user-access.service'
// services
import { UploadService } from './services/paper/upload.service';
import { PaymentDetailsService } from './services/payment/payment-details.service';
import { TimerComponent } from './common/timer/timer.component';
import { ShowPaperService } from './services/paper/show-paper.service';
import { UserDetailsService } from './services/user/user-details.service';
import { PdfViewerComponent } from './common/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileUploaderComponent } from './common/file-uploader/file-uploader.component';
import { DndDirective } from './common/file-uploader/dnd.directive';
import { LoadingComponent } from './common/loading/loading.component';
import { LoadingComponent1 } from './util/loading/loading.component';
import { LoadingService } from './util/loading/loading.service';
import { AlertsComponent } from './common/alerts/alerts.component';
import { ListPapersComponent } from './admin/list-papers/list-papers.component';
import { LandingComponent } from './student/landing/landing.component';
import { ViewPaperAdminComponent } from './admin/view-paper-admin/view-paper-admin.component';
import { EditPaperAdminComponent } from './admin/edit-paper-admin/edit-paper-admin.component';
import { ShowResultComponent } from './student/papers/show-result/show-result.component';
import { AdminRootComponent } from './admin/admin-root/admin-root.component';
import { SidebarModule } from 'ng-sidebar';
import { UserDetailsComponent } from './admin/user-details/user-details.component';
import { UserDetailsGridComponent } from './admin/user-details-grid/user-details-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { DeleteEditorButtonComponent } from './admin/user-details-grid/delete-editor-button/delete-editor-button.component';
import { PayedPapersComponent } from './student/papers/paid-papers/payed-papers.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { SummaryComponent } from './admin/summary/summary.component';
import { DownloadPdfComponent } from './admin/summary/download-pdf/download-pdf.component';
import { DownloadPdfStudentComponent } from './admin/summary/download-pdf-student/download-pdf-student.component';
import { StudentRootComponent } from './student/student-root/student-root.component';
import { SvgSlide2Component } from './svg-slide2/svg-slide2.component';
import { UpdateMarksComponent } from './admin/update-marks/update-marks.component';
import { UpdateMarkButtonComponent } from './admin/summary/update-mark-button/update-mark-button.component';

import { RecaptchaModule } from "ng-recaptcha";




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
    LoadingComponent1,
    AlertsComponent,
     PaymentComponent,
     ListPapersComponent,
     LandingComponent,
     ViewPaperAdminComponent,
     EditPaperAdminComponent,
     ShowResultComponent,
     AdminRootComponent,
     StudentRootComponent,
     UserComponent,
     UserDetailsComponent,
     UserDetailsGridComponent,
     DeleteEditorButtonComponent,
     PayedPapersComponent,
     AdminLoginComponent,
     SummaryComponent,
     DownloadPdfComponent,
     DownloadPdfStudentComponent,
     SvgSlide2Component,
     UpdateMarksComponent,
     UpdateMarkButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    SidebarModule.forRoot(),
    // AgGridModule.withComponents([]),
    AgGridModule.withComponents([DownloadPdfComponent, DownloadPdfStudentComponent, UpdateMarkButtonComponent]),
    RecaptchaModule
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
    LoadingService,
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
