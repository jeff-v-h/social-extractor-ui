import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import {
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { HttpErrorHandler } from "./services/http-error-handler.service";
import { MessageService } from "./services/message.service";
import { GetMediaAttachmentsPipe } from "./helpers/get-media-attachments.pipe";
import { GetMediaLogoPipe } from "./helpers/get-media-logo.pipe";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { AuthErrorInterceptor } from "./helpers/auth-error.interceptor";

import { AppComponent } from "./app.component";
import { MessagesComponent } from "./components/common/messages/messages.component";
import { SocialMediaListsComponent } from "./components/social-media-lists/social-media-lists.component";
import { ListItemsComponent } from "./components/list-items/list-items.component";
import { ModifyListsDialogComponent } from "./components/social-media-lists/modify-lists-dialog/modify-lists-dialog.component";
import { MoveItemDialogComponent } from "./components/list-items/move-item-dialog/move-item.dialog.component";
import { AddPostDialogComponent } from "./components/list-items/add-post-dialog/add-post-dialog.component";
import { LoginComponent } from "./components/login/login.component";
import { NavBarComponent } from "./components/common/nav-bar/nav-bar.component";
import { AdminComponent } from "./components/admin/admin.component";
import { ModifyUserDialogComponent } from "./components/admin/modify-user-dialog/modify-user-dialog.component";
import { SettingsComponent } from "./components/settings/settings.component";

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    SocialMediaListsComponent,
    ModifyListsDialogComponent,
    ListItemsComponent,
    MoveItemDialogComponent,
    AddPostDialogComponent,
    GetMediaAttachmentsPipe,
    GetMediaLogoPipe,
    LoginComponent,
    NavBarComponent,
    AdminComponent,
    ModifyUserDialogComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ModifyListsDialogComponent,
    MoveItemDialogComponent,
    AddPostDialogComponent,
    ModifyUserDialogComponent
  ],
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
