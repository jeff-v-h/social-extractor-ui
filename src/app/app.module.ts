import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpErrorHandler } from "./services/http-error-handler.service";
import { MessageService } from "./services/message.service";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { AuthErrorInterceptor } from "./helpers/auth-error.interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ModifyListsDialogComponent } from "./components/social-media-lists/modify-lists-dialog/modify-lists-dialog.component";
import { SocialMediaListsComponent } from "./components/social-media-lists/social-media-lists.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule
} from "@angular/material";
import { LoginComponent } from "./components/login/login.component";
import { ModifyUserDialogComponent } from "./components/admin/modify-user-dialog/modify-user-dialog.component";
import { AdminComponent } from "./components/admin/admin.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SocialMediaListsComponent,
    ModifyListsDialogComponent,
    LoginComponent,
    AdminComponent,
    ModifyUserDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  entryComponents: [ModifyListsDialogComponent, ModifyUserDialogComponent],
  providers: [
    HttpErrorHandler,
    MessageService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
