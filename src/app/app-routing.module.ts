import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SocialMediaListsComponent } from "./components/social-media-lists/social-media-lists.component";
import { AuthGuard } from "./helpers/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/social-media-lists", pathMatch: "full" },
  {
    path: "social-media-lists",
    component: SocialMediaListsComponent
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
