import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-remove',
  templateUrl: './confirm-remove.component.html',
  styleUrls: ['./confirm-remove.component.css']
})
export class ConfirmRemoveComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmRemoveComponent>) { }

  onYesClick(): void {
    this.dialogRef.close('yes');
  }

  onNoClick(): void {
    this.dialogRef.close('no');
  }
}
