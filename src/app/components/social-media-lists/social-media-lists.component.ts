import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";

import { SocialMediaService } from "../../services/social-media.service";
import { MessageService } from "../../services/message.service";
import { ModifyListsDialogComponent } from "./modify-lists-dialog/modify-lists-dialog.component";
import { SocialMediaListsDetails } from "../../shared/models/api/social-media-lists-details.model";
import { SocialListBase } from "../../shared/models/api/social-list-base.model";

@Component({
  selector: "app-social-media-lists",
  host: { class: "app-component" },
  templateUrl: "./social-media-lists.component.html",
  styleUrls: ["./social-media-lists.component.scss"]
})
export class SocialMediaListsComponent implements OnInit {
  listsDetails: SocialMediaListsDetails;
  recentlyAddedList: SocialListBase;
  mediaLists: SocialListBase[];
  newListName: string;
  disableButtons = false;

  constructor(
    private smService: SocialMediaService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getSocialMediaLists();
  }

  getSocialMediaLists(): void {
    this.disableButtons = true;
    this.smService
      .getSocialListsDetails()
      .subscribe((details: SocialMediaListsDetails) => {
        if (details && details.lists) {
          this.listsDetails = details;
          this.recentlyAddedList = details.lists.find(
            l => l.name === "Recently Added"
          );
          this.mediaLists = details.lists.filter(
            l => l.name !== "Recently Added"
          );
          this.disableButtons = false;
          console.log(this.mediaLists);
        }
      });
  }

  reorderLists(event: CdkDragDrop<SocialListBase[]>) {
    moveItemInArray(this.mediaLists, event.previousIndex, event.currentIndex);
    this.saveSocialMediaLists(this.mediaLists);
  }

  openDialog(type: string, id?: string, name?: string): void {
    const listNames: string[] = this.mediaLists.map(l => l.name);

    const dialogRef = this.dialog.open(ModifyListsDialogComponent, {
      data: { type, id, name, listNames }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Add to the media list
      if (result) {
        if (result.type === "delete") {
          this.deleteList(result.id);
        } else if (result.type === "edit") {
          this.editListName(result.id, result.name);
        } else {
          this.createNewList(result.name);
        }
      }
    });
  }

  createNewList(name) {
    // GET to refresh list again to obtain new list id
    this.smService
      .createSocialMediaList(name)
      .subscribe(list => this.getSocialMediaLists());
  }

  editListName(id, name) {
    const list = this.mediaLists.find(l => l.id === id);
    list.name = name;
    this.saveSocialMediaLists(this.mediaLists);
  }

  deleteList(id) {
    this.mediaLists = this.mediaLists.filter(l => l.id !== id);
    this.smService.deleteSocialMediaList(id).subscribe();
  }

  saveSocialMediaLists(mediaLists: SocialListBase[]) {
    this.listsDetails.lists = [this.recentlyAddedList, ...mediaLists];
    this.smService.saveSocialListsDetails(this.listsDetails).subscribe();
  }

  publishAll() {
    this.disableButtons = true;
    this.smService.publishAllLists().subscribe(res => {
      if (!res || !res.hasOwnProperty("error"))
        this.messageService.showQuickSuccess("All Lists Published", "Okay");
      this.disableButtons = false;
    });
  }
}
