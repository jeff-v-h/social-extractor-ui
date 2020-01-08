import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import { environment } from "@environments/environment";
import { SocialList } from "@app/shared/models/api/social-list.model";
import { HttpErrorHandler, HandleError } from "./http-error-handler.service";
import { SocialMediaListsDetails } from "@app/shared/models/api/social-media-lists-details.model";
import { MediaPost } from "@app/shared/models/api/media-post.model";
import { AppError } from "@app/shared/models/app-error.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

const emptySocialList: SocialList = {
  id: "",
  name: "",
  created: "",
  mediaPosts: []
};

const emptyError: AppError = {
  error: ""
};

@Injectable({
  providedIn: "root"
})
export class SocialMediaService {
  socialMediaListsUrl = `${environment.apiUrl}/api/sociallists`;
  socialMediaListsDetailsUrl = `${this.socialMediaListsUrl}/details`;
  publishAllUrl = `${this.socialMediaListsDetailsUrl}/publish`;

  mockListsDetails = "../../assets/mocks/social_lists_details.json";
  mockList = "../../assets/mocks/social_list.json";
  useMocks = false;

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("SocialMediaService");
    // this.useMocks = true;
  }

  //#region list details requests
  getSocialListsDetails(): Observable<SocialMediaListsDetails> {
    const url = this.useMocks
      ? this.mockListsDetails
      : this.socialMediaListsDetailsUrl;

    return this.http
      .get<SocialMediaListsDetails>(url)
      .pipe(
        retry(3),
        catchError(
          this.handleError(
            "getSocialListsDetails",
            { id: "", lists: [] },
            "Error getting lists"
          )
        )
      );
  }

  saveSocialListsDetails(
    details: SocialMediaListsDetails
  ): Observable<SocialMediaListsDetails> {
    console.log(details.lists);
    const url = this.useMocks
      ? this.mockListsDetails
      : this.socialMediaListsDetailsUrl;

    return this.http
      .put<SocialMediaListsDetails>(url, details, httpOptions)
      .pipe(
        catchError(
          this.handleError("saveSocialListsDetails", details, "Unable to save")
        )
      );
  }
  //#endregion

  //#region single list requests
  createSocialMediaList(name: string): Observable<SocialList> {
    const list = { name, mediaPosts: [] };

    const url = this.useMocks ? this.mockList : this.socialMediaListsUrl;

    return this.http
      .post<SocialList>(url, list, httpOptions)
      .pipe(
        catchError(
          this.handleError(
            "createSocialMediaList",
            list,
            "Unable to create list"
          )
        )
      );
  }

  getSocialMediaList(id: string): Observable<SocialList> {
    const url = this.useMocks
      ? this.mockList
      : `${this.socialMediaListsUrl}/${id}`;

    return this.http
      .get<SocialList>(url)
      .pipe(
        retry(3),
        catchError(
          this.handleError(
            "getSocialMediaList",
            emptySocialList,
            "Error getting list data"
          )
        )
      );
  }

  saveSocialMediaList(list: SocialList): Observable<SocialList | AppError> {
    console.log(list);
    const url = this.useMocks
      ? this.mockList
      : `${this.socialMediaListsUrl}/${list.id}`;

    return this.http
      .put<SocialList>(url, list, httpOptions)
      .pipe(
        catchError(
          this.handleError(
            "saveSocialMediaList",
            emptyError,
            "Unable to save list data"
          )
        )
      );
  }

  deleteSocialMediaList(id: string): Observable<{}> {
    const url = this.useMocks
      ? this.mockList
      : `${this.socialMediaListsUrl}/${id}`;

    return this.http
      .delete<SocialList>(url, httpOptions)
      .pipe(
        catchError(
          this.handleError(
            "deleteSocialMediaList",
            { error: "" },
            "Error deleting list"
          )
        )
      );
  }
  //#endregion single list requests

  //#region single item within list requests
  addItemToList(listId: string, item: MediaPost): Observable<MediaPost> {
    const url = `${this.socialMediaListsUrl}/${listId}/items`;

    return this.http
      .post<MediaPost>(url, item, httpOptions)
      .pipe(
        catchError(
          this.handleError("addItemToList", item, "Unable to add item to list")
        )
      );
  }

  deleteItemFromList(listId: string, itemId: string): Observable<{}> {
    const url = `${this.socialMediaListsUrl}/${listId}/items/${itemId}`;

    return this.http
      .delete<SocialList>(url, httpOptions)
      .pipe(
        catchError(
          this.handleError("deleteItemFromList", {}, "Error deleting list item")
        )
      );
  }
  //#endregion

  //#region publish list
  saveAndPublishSocialMediaList(
    list: SocialList
  ): Observable<SocialList | AppError> {
    const url = `${this.socialMediaListsUrl}/${list.id}/publish`;
    return this.http
      .put<SocialList>(url, list, httpOptions)
      .pipe(
        catchError(
          this.handleError(
            "saveAndPublishSocialMediaList",
            emptyError,
            "Unable to publish list"
          )
        )
      );
  }

  publishAllLists(): Observable<{}> {
    return this.http
      .post<SocialList>(this.publishAllUrl, {}, httpOptions)
      .pipe(
        catchError(
          this.handleError(
            "publishAllLists",
            emptyError,
            "Error publishing lists"
          )
        )
      );
  }
  //#endregion
}
