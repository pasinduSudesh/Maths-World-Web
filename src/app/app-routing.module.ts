import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { HomeComponent } from "../app/home/home.component";
import { SignupComponent } from "../app/signup/signup.component";

//admin components
import { adminRoutes } from './admin/admin-routing';
import { studentRoutes } from './student/student-routing';
import { UserDetailsComponent } from './admin/user-details/user-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "signupEmpty", component: SignupComponent},
  {path: "addEditorDetails", component: UserDetailsComponent},
  {path: "admin", children: adminRoutes},
  {path: "", children: studentRoutes},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
