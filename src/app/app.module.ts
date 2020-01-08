import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule
} from "@angular/material";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { ModifyUserDialogComponent } from "./components/admin/modify-user-dialog/modify-user-dialog.component";
import { AdminComponent } from "./components/admin/admin.component";
import { ListItemsComponent } from "./components/list-items/list-items.component";
import { MoveItemDialogComponent } from "./components/list-items/move-item-dialog/move-item.dialog.component";
import { AddPostDialogComponent } from "./components/list-items/add-post-dialog/add-post-dialog.component";
import { NavBarComponent } from "./components/common/nav-bar/nav-bar.component";
import { ModifyListsDialogComponent } from "./components/social-media-lists/modify-lists-dialog/modify-lists-dialog.component";
import { SocialMediaListsComponent } from "./components/social-media-lists/social-media-lists.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { MessagesComponent } from "./components/common/messages/messages.component";

import { AppRoutingModule } from "./app-routing.module";
import { HttpErrorHandler } from "./services/http-error-handler.service";
import { MessageService } from "./services/message.service";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { AuthErrorInterceptor } from "./helpers/auth-error.interceptor";
import { GetMediaAttachmentsPipe } from "./helpers/get-media-attachments.pipe";
import { GetMediaLogoPipe } from "./helpers/get-media-logo.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MessagesComponent,
    SocialMediaListsComponent,
    ModifyListsDialogComponent,
    LoginComponent,
    AdminComponent,
    ModifyUserDialogComponent,
    SettingsComponent,
    ListItemsComponent,
    MoveItemDialogComponent,
    AddPostDialogComponent,
    GetMediaAttachmentsPipe,
    GetMediaLogoPipe
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
