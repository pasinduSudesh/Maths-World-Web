import { Routes } from "@angular/router";
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";
import { KeyCodeComponent } from "./key-code/key-code.component";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import { AvailablePapersComponent } from "./papers/available-papers/available-papers.component";
import { PayedPapersComponent } from "./papers/paid-papers/payed-papers.component";
import { ShowPaperComponent } from "./papers/show-paper/show-paper.component";
import { ShowResultComponent } from "./papers/show-result/show-result.component";
import { PaymentComponent } from "./payment/payment.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";
import { StudentRootComponent } from "./student-root/student-root.component";
import { UserAccountComponent } from "./user-account/user-account.component";
import { AddSubjectComponent } from "./add-subject/add-subject.component";


export const studentRoutes: Routes = [

  // { path: "dashboard", component: StudentRootComponent },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "dashboard", component: StudentRootComponent
  },

  {
    path: "paper/view", component: StudentRootComponent, children: [
      { path: "", component: ShowPaperComponent, outlet: 'studentRouter' }
    ]
  },
  {
    path: "paper/result", component: StudentRootComponent, children: [
      { path: "", component: ShowResultComponent, outlet: 'studentRouter' }
    ]
  },
  {
    path: "paper/list", component: StudentRootComponent, children: [
      { path: "", component: LandingComponent, outlet: 'studentRouter' }
    ]
  },
  {
    path: "paper/paid", component: StudentRootComponent, children: [
      { path: "", component: PayedPapersComponent, outlet: 'studentRouter' }
    ]
  },

  {
    path: "payment", component: StudentRootComponent, children: [
      { path: "", component: PaymentComponent, outlet: 'studentRouter' }
    ]
  },
  {
    path: "addNewSubject", component: StudentRootComponent, children: [
      { path: "", component: AddSubjectComponent, outlet: 'studentRouter' }
    ]
  },

  {
    path: "forgot-password", component: ForgotpasswordComponent
  },
  {
    path: "reset-password", component: ResetpasswordComponent
  },
  {
    path: "signup", component: UserAccountComponent
  },
  {
    path: "verify", component: KeyCodeComponent
  },

];