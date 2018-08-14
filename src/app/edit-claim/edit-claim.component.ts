import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Claim } from '../shared/claim-model';

@Component({
  selector: 'app-edit-claim',
  templateUrl: './edit-claim.component.html',
  styleUrls: ['./edit-claim.component.css']
})
export class EditClaimComponent {

  claim: Claim;

  constructor(
    public dialogRef: MatDialogRef<EditClaimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Claim) {
      this.claim = Object.assign({}, data);
      if (this.claim.claimType == 'NATIONAL') {
        this.claim.claimType = '1';
      } else if (this.claim.claimType == 'INTERNATIONAL') {
        this.claim.claimType = '2';
      } else {
        this.claim.claimType = '0';
      }
      if (this.claim.claimSubmitted == 'YES') {
        this.claim.claimSubmitted = '1';
      } else {
        this.claim.claimSubmitted = '0';
      }
      if (this.claim.claimStatus == 'CLAIM PROCESSED') {
        this.claim.claimStatus = '1';
      } else if (this.claim.claimStatus == 'CLAIM PENDING (UK)') {
        this.claim.claimStatus = '2';
      } else if (this.claim.claimStatus == 'CLAIM PENDING (INTERNATIONAL)') {
        this.claim.claimStatus = '3';
      } else if (this.claim.claimStatus == 'CLAIM ACCEPTED') {
        this.claim.claimStatus = '4';
      } else if (this.claim.claimStatus == 'NO REPLY TO P91') {
        this.claim.claimStatus = '5';
      } else if (this.claim.claimStatus == 'OVER TIME PERIOD') {
        this.claim.claimStatus = '6';
      } else if (this.claim.claimStatus == 'DELIVERED/COLLECTED FROM DEPOT/RTS') {
        this.claim.claimStatus = '7';
      } else if (this.claim.claimStatus == 'UNABLE TO CLAIM') {
        this.claim.claimStatus = '8';
      } else if (this.claim.claimStatus == 'FOLLOW UP') {
        this.claim.claimStatus = '9';
      } else {
        this.claim.claimStatus = '0';
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
