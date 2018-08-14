import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

import { Credit } from '../shared/credit-model';

export interface DialogData {
  courier: string;
}

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.css']
})
export class AddCreditComponent {

  credit: Credit = {
    courier: this.data.courier,
    dateClaimSubmitted: new Date(),
    referenceNumber: '',
    reason: '',
    amountCredited: 0,
    notes: ''
  };
  
  constructor(public dialogRef: MatDialogRef<AddCreditComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm) {
    this.dialogRef.close(f.form.value);
  }

}
