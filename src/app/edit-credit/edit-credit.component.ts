import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Credit } from '../shared/credit-model';

@Component({
  selector: 'app-edit-credit',
  templateUrl: './edit-credit.component.html',
  styleUrls: ['./edit-credit.component.css']
})
export class EditCreditComponent {

  credit: Credit;

  constructor(public dialogRef: MatDialogRef<EditCreditComponent>, @Inject(MAT_DIALOG_DATA) public data: Credit) {
    this.credit = Object.assign({}, data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
