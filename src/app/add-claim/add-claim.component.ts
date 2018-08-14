import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

import { Claim } from '../shared/claim-model';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.css']
})
export class AddClaimComponent {

  claim: Claim = {
    dateOfClaim: new Date,
    orderNo: '',
    stockNumber: '',
    dispatchDate: null,
    dateToClaimFrom: null,
    trackingNumber: '',
    reasonForClaim: '',
    prepaidLabel: ''
  };
  
  constructor(public dialogRef: MatDialogRef<AddClaimComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm) {
    this.dialogRef.close(f.form.value);
  }
  
}
