import { Routes } from "@angular/router";
import { EditPaperAdminComponent } from "./edit-paper-admin/edit-paper-admin.component";
import { ViewPaperAdminComponent } from "./view-paper-admin/view-paper-admin.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminRootComponent } from "./admin-root/admin-root.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserComponent } from "./user/user.component";
import { AddPaperComponent } from "./add-paper/add-paper.component";

export const adminRoutes: Routes = [

  { path: "", component: AdminRootComponent },
  {
    path: "login", component: AdminLoginComponent
  },
  {
    path: "paper/view", component: AdminRootComponent, children: [
      { path: "", component: ViewPaperAdminComponent, outlet: 'adminRouter' }
    ]
  },
  {
    path: "paper/add", component: AdminRootComponent, children: [
      { path: "", component: AddPaperComponent, outlet: 'adminRouter' }
    ]
  },
  {
    path: "paper/edit", component: AdminRootComponent, children: [
      { path: "", component: EditPaperAdminComponent, outlet: 'adminRouter' }
    ]
  },
  {
    path: "users", component: AdminRootComponent, children: [
      { path: "", component: UserComponent, outlet: 'adminRouter' }
    ]
  },


];