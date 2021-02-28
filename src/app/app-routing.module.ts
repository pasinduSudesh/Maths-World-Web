import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { HomeComponent } from "../app/home/home.component";
import { SignupComponent } from "../app/signup/signup.component";
import { AvailablePapersComponent } from "../app/available-papers/available-papers.component";
import { LoginComponent } from "../app/login/login.component";
import { UserAccountComponent } from "../app/user-account/user-account.component";
import { KeyCodeComponent } from "../app/key-code/key-code.component";
import { PaymentComponent } from "../app/payment/payment.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "signup", component: SignupComponent},
  {path: "available-papers", component: AvailablePapersComponent},
  {path: "login", component: LoginComponent},
  {path: "addUser", component: UserAccountComponent},
  {path: "key-code", component: KeyCodeComponent},
  {path: "payment", component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
