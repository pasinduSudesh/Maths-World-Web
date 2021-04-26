import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { HomeComponent } from "../app/home/home.component";
import { SignupComponent } from "../app/signup/signup.component";
import { AvailablePapersComponent } from "./student/papers/available-papers/available-papers.component";
import { ShowPaperComponent } from "./student/papers/show-paper/show-paper.component";
// import { AvailablePapersComponent } from "../app/available-papers/available-papers.component";
import { LoginComponent } from "./student/login/login.component";
import { UserAccountComponent } from "../app/user-account/user-account.component";
import { KeyCodeComponent } from "./student/key-code/key-code.component";
import { PaymentComponent } from "./student/payment/payment.component";
import { ForgotpasswordComponent } from "../app/forgotpassword/forgotpassword.component";
import { ResetpasswordComponent } from "./student/resetpassword/resetpassword.component";
// import { ListPapersComponent } from "./admin/list-papers/list-papers.component";
import { LandingComponent } from "./student/landing/landing.component";
import { ShowResultComponent } from "./student/papers/show-result/show-result.component";



//admin components
import { adminRoutes } from './admin/admin-routing';
import { UserDetailsComponent } from './admin/user-details/user-details.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "signup", component: SignupComponent},
  {path: "available-papers", component: AvailablePapersComponent},
  {path: "login", component: LoginComponent},
  {path: "addUser", component: UserAccountComponent},
  {path: "key-code", component: KeyCodeComponent},
  {path: "payment", component: PaymentComponent},
  {path: "forgot-password", component: ForgotpasswordComponent},
  {path: "reset-password", component: ResetpasswordComponent},
  {path: "show-paper", component: ShowPaperComponent},
  {path: "payment", component: PaymentComponent},
  // {path: "paper-list", component: ListPapersComponent},
  {path: "landing", component: LandingComponent},
  {path: "show-result", component: ShowResultComponent },
  {path: "addEditorDetails", component: UserDetailsComponent},
  {path: "admin", children: adminRoutes}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
