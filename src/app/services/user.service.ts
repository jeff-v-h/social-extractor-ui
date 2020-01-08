import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";

import { environment } from "@environments/environment";
import { User } from "../shared/models/api/user.model";
import { HttpErrorHandler, HandleError } from "./http-error-handler.service";
import { Observable } from "rxjs";
import { Role } from "@app/shared/models/api/role.model";
import { AppError } from "@app/shared/models/app-error.model";

const userUrl = `${environment.apiUrl}/users`;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
const emptyUser: User = {
  id: 0,
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  role: Role.User
};

@Injectable({ providedIn: "root" })
export class UserService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("UserService");
  }

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(userUrl)
      .pipe(
        retry(2),
        catchError(this.handleError("getAll", [], "Error getting users"))
      );
  }

  create(user: User): Observable<User> {
    return this.http
      .post<User>(userUrl, user, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError("create", emptyUser, "Error creating user"))
      );
  }

  updatePassword(username: string, oldPassword: string, newPassword: string) {
    const url = userUrl + "/password";
    const body = { username, oldPassword, newPassword };
    return this.http
      .put<User>(url, body, httpOptions)
      .pipe(
        retry(2),
        catchError(
          this.handleError(
            "updatePassword",
            { error: "Password not updated" } as AppError,
            "Error updating password"
          )
        )
      );
  }

  update(user: User) {
    return this.http
      .put<User>(userUrl, user, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError("update", emptyUser, "Error updating user"))
      );
  }

  delete(username: string) {
    const options = { ...httpOptions, body: { username } };
    return this.http
      .delete<User>(userUrl, options)
      .pipe(
        retry(2),
        catchError(this.handleError("delete", emptyUser, "Error deleting user"))
      );
  }
}
