import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface DialogData {
  type: UserDialogTypes;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  listUsernames: string[];
}

export enum UserDialogTypes {
  Create = "create",
  Update = "update",
  Delete = "delete"
}

@Component({
  selector: "app-modify-user-dialog",
  templateUrl: "modify-user-dialog.component.html"
})
export class ModifyUserDialogComponent implements OnInit {
  modifyType: string;
  form: FormGroup;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  listUsernames: string[];
  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModifyUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.modifyType = this.capitalise(data.type);
    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password;
    this.listUsernames = data.listUsernames;
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      username: [this.username, Validators.required],
      password: [this.password, Validators.required]
    });
  }

  capitalise(word: string): string {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.substring(1);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.errorMsg = "";
    const values = this.form.value;

    // Form validation
    if (this.data.type === UserDialogTypes.Create) {
      if (this.form.status === "INVALID") {
        this.errorMsg = "All fields need to be filled out";
        return;
      }

      if (values.username.length < 6) {
        this.errorMsg = "Username must at least 6 characters";
        return;
      }

      if (values.password.length < 6) {
        this.errorMsg = "Password must at least 8 characters";
        return;
      }

      if (this.listUsernames.includes(values.username)) {
        this.errorMsg = `Username "${values.username}" already exists`;
        return;
      }
    }

    const returnValues = {
      type: this.data.type,
      username: values.username ? values.username.trim() : "",
      firstName: values.firstName ? values.firstName.trim() : "",
      lastName: values.lastName ? values.lastName.trim() : "",
      password: values.password
    };

    this.dialogRef.close(returnValues);
  }
}
