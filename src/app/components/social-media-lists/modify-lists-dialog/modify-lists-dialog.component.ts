import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  type: string;
  id: string;
  name: string;
  listNames: string[];
}

@Component({
  selector: "app-modify-lists-dialog",
  templateUrl: "modify-lists-dialog.component.html"
})
export class ModifyListsDialogComponent implements OnInit {
  listNames: string[];
  modifyType: string;
  currentListName: string;
  errorMsg: string;

  constructor(
    public dialogRef: MatDialogRef<ModifyListsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.modifyType = this.capitalise(data.type);
    this.listNames = data.listNames;
    this.currentListName = data.name ? data.name : "";
  }

  ngOnInit() {}

  capitalise(word: string): string {
    if (!word) {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.substring(1);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  closeAndModifyList(type: string, id: string, nameString: string): void {
    const name = nameString.trim();
    this.errorMsg = "";
    if ((type === "edit" || type === "new") && this.listNames.includes(name)) {
      this.errorMsg = `Name "${name}" already exists`;
      return;
    }

    this.dialogRef.close({ type, id, name });
  }
}
