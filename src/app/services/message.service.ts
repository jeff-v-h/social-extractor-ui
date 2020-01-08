import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable()
export class MessageService {
  messages: string[] = [];

  constructor(private snackBar: MatSnackBar) {}

  addError(message: string) {
    this.messages.push(message);
  }

  showQuickSuccess(message: string, action?: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ["snack-success"];
    config.duration = 3000;
    this.snackBar.open(message, action, config);
  }

  clear() {
    this.messages = [];
  }
}
