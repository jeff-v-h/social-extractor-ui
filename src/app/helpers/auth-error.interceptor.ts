import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthenticationService } from "@app/services/authentication.service";
import { AppError } from "@app/shared/models/app-error.model";
import { noDbConnectMsg } from "@app/helpers/constants";

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.authenticationService.logout();
          location.reload(true);
        }

        let error = err.error.detail || err.error.message || err.statusText;
        if (
          !err.error.detail &&
          err.message.includes("Http failure response")
        ) {
          error = noDbConnectMsg;
        }

        return throwError({ error } as AppError);
      })
    );
  }
}
