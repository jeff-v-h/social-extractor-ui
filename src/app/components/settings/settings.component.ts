import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "@app/services/authentication.service";
import { User } from "@app/shared/models/api/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "@app/services/user.service";
import { MessageService } from "@app/services/message.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  user: User;
  submitted = false;
  loading = false;
  error = "";
  userForm: FormGroup;
  username: string;
  oldPassword: string;
  newPassword: string;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
      this.username = user ? user.username : "";
    });

    this.userForm = this.fb.group({
      oldPassword: [this.oldPassword, Validators.required],
      newPassword: [this.newPassword, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const values = this.userForm.value;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      this.error = "Password must to be at least 8 characters";
      return;
    }

    if (values.oldPassword === values.newPassword) {
      this.error = "Passwords should not match";
      return;
    }

    this.loading = true;
    this.error = "";

    this.userService
      .updatePassword(this.username, values.oldPassword, values.newPassword)
      .subscribe(result => {
        if (result && "error" in result) {
          this.error = result.error;
        } else {
          this.messageService.showQuickSuccess("Password Changed", "Okay");
          this.userForm.reset();
        }

        this.loading = false;
      });
  }
}
