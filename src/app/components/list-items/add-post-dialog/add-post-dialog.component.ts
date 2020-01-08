import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

export interface AddPostDialogData {
  platforms: string[];
}

@Component({
  selector: "app-add-post-dialog",
  templateUrl: "add-post-dialog.component.html"
})
export class AddPostDialogComponent implements OnInit {
  selectedPlatform: string;
  platforms: any[] = [
    { name: "twitter" },
    { name: "instagram" },
    { name: "facebook" }
  ];

  constructor(public dialogRef: MatDialogRef<AddPostDialogComponent>) {
    this.selectedPlatform = this.platforms[0].name;
  }

  ngOnInit() {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  addPost(): void {
    this.dialogRef.close({
      selectedPlatform: this.selectedPlatform
    });
  }
}
