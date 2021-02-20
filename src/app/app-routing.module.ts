import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { HomeComponent } from "../app/home/home.component";
import { SignupComponent } from "../app/signup/signup.component";
import { AvailablePapersComponent } from "./papers/available-papers/available-papers.component";
import { AddPaperComponent } from "./papers/add-paper/add-paper.component";

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "signup", component: SignupComponent},
  {path: "available-papers", component: AvailablePapersComponent},
  {path: "add-papers", component: AddPaperComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
