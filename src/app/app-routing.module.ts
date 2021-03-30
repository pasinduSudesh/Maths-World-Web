import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { HomeComponent } from "../app/home/home.component";
import { SignupComponent } from "../app/signup/signup.component";
import { AvailablePapersComponent } from "./papers/available-papers/available-papers.component";
import { ShowPaperComponent } from "./papers/show-paper/show-paper.component";
import { AddPaperComponent } from "./papers/add-paper/add-paper.component";
// import { AvailablePapersComponent } from "../app/available-papers/available-papers.component";
import { LoginComponent } from "../app/login/login.component";
import { UserAccountComponent } from "../app/user-account/user-account.component";
import { KeyCodeComponent } from "../app/key-code/key-code.component";
import { PaymentComponent } from "../app/payment/payment.component";
import { ListPapersComponent } from "../app/papers/list-papers/list-papers.component";
import { LandingComponent } from "../app/landing/landing.component";
import { ViewPaperAdminComponent } from "../app/papers/view-paper-admin/view-paper-admin.component";
import { EditPaperAdminComponent } from "../app/papers/edit-paper-admin/edit-paper-admin.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "signup", component: SignupComponent},
  {path: "available-papers", component: AvailablePapersComponent},
  {path: "add-papers", component: AddPaperComponent},
  {path: "login", component: LoginComponent},
  {path: "addUser", component: UserAccountComponent},
  {path: "key-code", component: KeyCodeComponent},
  {path: "show-paper", component: ShowPaperComponent},
  {path: "payment", component: PaymentComponent},
  {path: "paper-list", component: ListPapersComponent},
  {path: "landing", component: LandingComponent},
  {path: "admin-view-paper", component: ViewPaperAdminComponent},
  {path: "admin-edit-paper", component: EditPaperAdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
