import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";
import { v4 as uuid } from "uuid";

import { SocialMediaService } from "../../services/social-media.service";
import { SocialList } from "../../shared/models/api/social-list.model";
import { MediaPost } from "../../shared/models/api/media-post.model";
import { MessageService } from "../../services/message.service";
import { SocialMediaListsDetails } from "../../shared/models/api/social-media-lists-details.model";
import { SocialListBase } from "../../shared/models/api/social-list-base.model";
import { MoveItemDialogComponent } from "./move-item-dialog/move-item.dialog.component";
import { AddPostDialogComponent } from "./add-post-dialog/add-post-dialog.component";

@Component({
  selector: "app-list-items",
  host: { class: "app-component" },
  templateUrl: "./list-items.component.html",
  styleUrls: ["./list-items.component.scss"]
})
export class ListItemsComponent implements OnInit {
  listData: SocialList;
  mediaLists: SocialListBase[];
  disableButtons = false;

  constructor(
    private route: ActivatedRoute,
    private smService: SocialMediaService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.disableButtons = true;
    const listId = this.route.snapshot.paramMap.get("id");
    this.smService.getSocialMediaList(listId).subscribe((data: SocialList) => {
      if (data) {
        this.listData = data;
        if (data.id) this.disableButtons = false;
        console.log(this.listData);
      }
    });
    this.smService
      .getSocialListsDetails()
      .subscribe((details: SocialMediaListsDetails) => {
        if (details && details.lists) {
          this.mediaLists = details.lists.filter(
            l => l.name !== "Recently Added"
          );
        }
      });
  }

  drop(event: CdkDragDrop<MediaPost[]>) {
    moveItemInArray(
      this.listData.mediaPosts,
      event.previousIndex,
      event.currentIndex
    );
  }

  // Save the data for a specific property for a media post (found via it's index in the list)
  saveInput(index: number, propertyKey: string, event): void {
    this.listData.mediaPosts[index][propertyKey] = event.target.value;
    console.log(this.listData.mediaPosts);
  }

  blurInput(event): void {
    event.target.blur();
  }

  openMoveTo(postId: string): void {
    const selectedPost = this.listData.mediaPosts.find(
      p => p.postId === postId
    );

    const dialogRef = this.dialog.open(MoveItemDialogComponent, {
      maxHeight: "70vh",
      maxWidth: "70vw",
      data: {
        mediaLists: this.mediaLists.filter(l => l.id !== this.listData.id),
        selectedPost
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Move/copy the item to the selected list (by id)
      if (result) {
        result.ids.forEach(listId => {
          this.smService.addItemToList(listId, result.selectedPost).subscribe();
        });

        if (result.type === "move") {
          this.delete(selectedPost.postId);
          this.save();
        }
      }
    });
  }

  delete(postId: string): void {
    this.listData.mediaPosts = this.listData.mediaPosts.filter(
      p => p.postId !== postId
    );
  }

  openAddPostDialog() {
    const dialogRef = this.dialog.open(AddPostDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const now = new Date();

        this.listData.mediaPosts.push({
          mediaHandle: "",
          displayName: "",
          mediaPlatform: result.selectedPlatform,
          postId: uuid(),
          mainContent: "",
          secondaryContent: "",
          attachments: [],
          timeAdded: `${now.getFullYear()}-${this.getMonth(
            now
          )}-${now.getDate()}`,
          addedBy: ""
        });
      }
    });
  }

  save(): void {
    this.disableButtons = true;
    this.smService.saveSocialMediaList(this.listData).subscribe(res => {
      if (!res || !res.hasOwnProperty("error"))
        this.messageService.showQuickSuccess("Save successful", "Okay");
      this.disableButtons = false;
    });
  }

  publish(): void {
    this.disableButtons = true;
    this.smService
      .saveAndPublishSocialMediaList(this.listData)
      .subscribe(res => {
        if (!res || !res.hasOwnProperty("error"))
          this.messageService.showQuickSuccess("Saved & Published", "Okay");
        this.disableButtons = false;
      });
  }

  getMonth(now: Date): string {
    const monthDate = now.getMonth() + 1;
    return monthDate < 10 ? "0" + monthDate.toString() : monthDate.toString();
  }
}
