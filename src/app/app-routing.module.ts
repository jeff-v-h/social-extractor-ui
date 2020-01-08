import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SocialMediaListsComponent } from "./components/social-media-lists/social-media-lists.component";
import { AuthGuard } from "./helpers/auth.guard";
import { ListItemsComponent } from "./components/list-items/list-items.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminComponent } from "./components/admin/admin.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { Role } from "./shared/models/api/role.model";

const routes: Routes = [
  { path: "", redirectTo: "/social-media-lists", pathMatch: "full" },
  {
    path: "social-media-lists",
    component: SocialMediaListsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "social-media-lists/:id",
    component: ListItemsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
