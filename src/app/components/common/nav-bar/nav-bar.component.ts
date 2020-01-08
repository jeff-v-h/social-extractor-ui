import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/services/authentication.service";
import { Role } from "@app/shared/models/api/role.model";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  usersName = "";

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = user !== null;
      this.isAdmin = user && user.role === Role.Admin;
      this.usersName = user ? `${user.firstName} ${user.lastName}` : "";
    });
  }

  goAdmin() {
    this.router.navigate(["/admin"]);
  }

  logout() {
    this.authService.logout();
  }
}
