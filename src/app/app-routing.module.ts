import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { HomeComponent } from "../app/home/home.component";
import { SignupComponent } from "../app/signup/signup.component";
import { AvailablePapersComponent } from "./papers/available-papers/available-papers.component";
import { AddPaperComponent } from "./papers/add-paper/add-paper.component";
// import { AvailablePapersComponent } from "../app/available-papers/available-papers.component";
import { LoginComponent } from "../app/login/login.component";
import { UserAccountComponent } from "../app/user-account/user-account.component";
import { KeyCodeComponent } from "../app/key-code/key-code.component";
import { PaymentComponent } from "../app/payment/payment.component";
import { ForgotpasswordComponent } from "../app/forgotpassword/forgotpassword.component";
import { ResetpasswordComponent } from "../app/resetpassword/resetpassword.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "signup", component: SignupComponent},
  {path: "available-papers", component: AvailablePapersComponent},
  {path: "add-papers", component: AddPaperComponent},
  {path: "login", component: LoginComponent},
  {path: "addUser", component: UserAccountComponent},
  {path: "key-code", component: KeyCodeComponent},
  {path: "payment", component: PaymentComponent},
  {path: "forgot-password", component: ForgotpasswordComponent},
  {path: "reset-password", component: ResetpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
