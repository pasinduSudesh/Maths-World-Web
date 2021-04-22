import { Routes } from "@angular/router";
import { EditPaperAdminComponent } from "../papers/edit-paper-admin/edit-paper-admin.component";
import { ShowResultComponent } from "../papers/show-result/show-result.component";
import { ViewPaperAdminComponent } from "../papers/view-paper-admin/view-paper-admin.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminRootComponent } from "./admin-root/admin-root.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserComponent } from "./user/user.component";

export const adminRoutes: Routes = [

  { path: "", component: AdminRootComponent },
  {
    path: "admin-view-paper", component: AdminRootComponent, children: [
      { path: "", component: ViewPaperAdminComponent, outlet: 'adminRouter' }
    ]
  },
  {
    path: "admin-edit-paper", component: AdminRootComponent, children: [
      { path: "", component: EditPaperAdminComponent, outlet: 'adminRouter' }
    ]
  },
  {
    path: "show-result", component: AdminRootComponent, children: [
      { path: "", component: ShowResultComponent, outlet: 'adminRouter' }
    ]
  },
  {
    path: "addEditor", component: AdminRootComponent, children: [
      { path: "", component: UserComponent, outlet: 'adminRouter' }
    ]
  },
  {
    path: "addEditorDetails", component: AdminRootComponent, children: [
      { path: "", component: UserDetailsComponent, outlet: 'adminRouter' }
    ]
  },
  {
    path: "adminLogin", component: AdminLoginComponent
  },
  // { path: "admin-view-paper", component: ViewPaperAdminComponent },
  // { path: "admin-edit-paper", component: EditPaperAdminComponent },
  // { path: "show-result", outlet: 'adminRouter', component: ShowResultComponent },
  // { path: "addEditor", component: UserComponent },
  // { path: "addEditorDetails", component: UserDetailsComponent },
  // { path: "adminLogin", component: AdminLoginComponent }


];