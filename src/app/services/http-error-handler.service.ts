import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

import { MessageService } from "./message.service";
import { noDbConnectMsg } from "@app/helpers/constants";

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError = <T>(
  operation?: string,
  result?: T,
  displayMessage?: string
) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = "") => <T>(
    operation = "operation",
    result = {} as T,
    displayMessage?: string
  ) => this.handleError(serviceName, operation, result, displayMessage);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(
    serviceName = "",
    operation = "operation",
    result = {} as T,
    displayMessage?: string
  ) {
    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message =
        error.error instanceof ErrorEvent
          ? error.error.message
          : `server returned code ${error.status} with body "${error.error}"`;

      // Show errors
      let msg = displayMessage
        ? displayMessage
        : `${serviceName}: ${operation} failed: ${message}`;

      if (error.error === noDbConnectMsg) {
        msg = noDbConnectMsg;
      } else if (serviceName === "UserService") {
        msg = error.error;
      }

      this.messageService.addError(msg);
      if (displayMessage) {
        this.showErrorBar(msg);
      }

      // Let the app keep running by returning a safe result.
      return of(result);
    };
  }

  showErrorBar(message: string, duration: number = 3000) {
    const config = new MatSnackBarConfig();
    config.panelClass = ["snack-error"];
    config.duration = duration;
    this.snackBar.open(message, "x", config);
  }
}
