import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SocialListBase } from "../../../shared/models/api/social-list-base.model";
import { MediaPost } from "../../../shared/models/api/media-post.model";

export interface MoveItemDialogData {
  mediaLists: SocialListBase[];
  selectedPost: MediaPost;
}

@Component({
  selector: "app-move-item-dialog",
  templateUrl: "move-item-dialog.component.html"
})
export class MoveItemDialogComponent implements OnInit {
  selectedPost: MediaPost;
  mediaLists: SocialListBase[];
  selectedItemIds: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<MoveItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MoveItemDialogData
  ) {
    this.mediaLists = data.mediaLists;
    this.selectedPost = data.selectedPost;
  }

  ngOnInit() {}

  checkItem(event: any) {
    if (event.target.checked) {
      this.selectedItemIds.push(event.target.value);
    } else {
      this.selectedItemIds = this.selectedItemIds.filter(
        i => i !== event.target.value
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  copy(): void {
    this.dialogRef.close({
      type: "copy",
      selectedPost: this.selectedPost,
      ids: this.selectedItemIds
    });
  }

  move(): void {
    this.dialogRef.close({
      type: "move",
      selectedPost: this.selectedPost,
      ids: this.selectedItemIds
    });
  }
}
