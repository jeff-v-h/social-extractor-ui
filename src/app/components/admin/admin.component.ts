import { Component, OnInit } from "@angular/core";
import { UserService } from "@app/services/user.service";
import { User } from "@app/shared/models/api/user.model";
import { MatDialog } from "@angular/material";
import {
  ModifyUserDialogComponent,
  UserDialogTypes
} from "./modify-user-dialog/modify-user-dialog.component";

@Component({
  selector: "app-admin",
  host: { class: "app-component" },
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  users: User[];
  disableButtons = false;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(users => (this.users = users));
  }

  openDialog(type: string, username?: string): void {
    const listUsernames: string[] = this.users.map(u => u.username);
    const user = this.users.find(u => u.username === username);

    const dialogRef = this.dialog.open(ModifyUserDialogComponent, {
      data: {
        type,
        firstName: user ? user.firstName : "",
        lastName: user ? user.lastName : "",
        username,
        password: user ? user.password : "",
        listUsernames
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.type === UserDialogTypes.Delete) {
          this.deleteUser(result.username);
        } else if (result.type === UserDialogTypes.Update) {
          this.editUser(result.username, result.firstName, result.lastName);
        } else if (result.type === UserDialogTypes.Create) {
          this.addNewUser(
            result.username,
            result.password,
            result.firstName,
            result.lastName
          );
        }
      }
    });
  }

  addNewUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const newUser = { firstName, lastName, username, password } as User;
    this.userService.create(newUser).subscribe(() => this.getUsers());
  }

  editUser(username: string, firstName: string, lastName: string) {
    const user = this.users.find(u => u.username === username);
    user.firstName = firstName;
    user.lastName = lastName;
    this.userService.update(user).subscribe(() => this.getUsers());
  }

  deleteUser(username: string) {
    this.userService.delete(username).subscribe(() => this.getUsers());
  }
}
