import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';

import { AppComponent } from '../app.component';
import { EditClaimComponent } from '../edit-claim/edit-claim.component';
import { ClaimsService } from '../claims.service';
import { Claim } from '../shared/claim-model';
import { AddClaimComponent } from '../add-claim/add-claim.component';
import { ConfirmRemoveComponent } from '../confirm-remove/confirm-remove.component';
import { isDate } from 'moment';

@Component({
  selector: 'app-pd-claims',
  templateUrl: './pd-claims.component.html',
  styleUrls: ['./pd-claims.component.css']
})
export class PdClaimsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = ['dateOfClaim', 'orderNo', 'stockNumber', 'dispatchDate', 'dateToClaimFrom', 'trackingNumber', 'reasonForClaim', 'prepaidLabel', 'claimType', 'claimSubmitted', 'claimSubmittedDate'];
  dataSource? = new MatTableDataSource<Claim>();
  isEditClaim: boolean = false;
  editedProduct: Claim = null;

  constructor(private appComponent: AppComponent, private claimsService: ClaimsService, public dialog: MatDialog, private route: ActivatedRoute) {
    route.data.subscribe(data => {
      this.dataSource.data = data['claims'].map(item => {
        item.isSelected = false;
        return item;
      });
      this.dataSource.sort = this.sort;
      console.log('Claims Loaded:', this.dataSource.data.length);
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  addClaim(): void {
    const dialogRef = this.dialog.open(AddClaimComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let claim: Claim = result;
        claim.isSelected = false;
        this.claimsService.addClaim(claim).subscribe(data => {
          const tableData = this.dataSource.data;
          tableData.push(data);
          this.dataSource.data = tableData;
          this.dataSource.sort = this.sort;
        });
      }
    });
  }

  editClaim(): void {
    const dialogRef = this.dialog.open(EditClaimComponent, {
      width: '500px',
      data: this.editedProduct
    });
    dialogRef.afterClosed().subscribe(result => {
      this.editedProduct.isSelected = false;
      this.isEditClaim = false;
      if (result) {
        let claim: Claim = result;
        if (claim.claimType == '0') {
          claim.claimType = '';
        } else if (claim.claimType == '1') {
          claim.claimType = 'NATIONAL';
        } else if (claim.claimType == '2') {
          claim.claimType = 'INTERNATIONAL';
        }
        if (claim.claimSubmitted == '0') {
          claim.claimSubmitted = '';
        } else if (claim.claimSubmitted == '1') {
          claim.claimSubmitted = 'YES';
        }
        if (claim.claimStatus == '0') {
          claim.claimStatus = '';
        } else if (claim.claimStatus == '1') {
          claim.claimStatus = 'CLAIM PROCESSED';
        } else if (claim.claimStatus == '2') {
          claim.claimStatus = 'CLAIM PENDING (UK)';
        } else if (claim.claimStatus == '3') {
          claim.claimStatus = 'CLAIM PENDING (INTERNATIONAL)';
        } else if (claim.claimStatus == '4') {
          claim.claimStatus = 'CLAIM ACCEPTED';
        } else if (claim.claimStatus == '5') {
          claim.claimStatus = 'NO REPLY TO P91';
        } else if (claim.claimStatus == '6') {
          claim.claimStatus = 'OVER TIME PERIOD';
        } else if (claim.claimStatus == '7') {
          claim.claimStatus = 'DELIVERED/COLLECTED FROM DEPOT/RTS';
        } else if (claim.claimStatus == '8') {
          claim.claimStatus = 'UNABLE TO CLAIM';
        } else if (claim.claimStatus == '9') {
          claim.claimStatus = 'FOLLOW UP';
        }
        this.claimsService.editClaim(claim).subscribe(data => {
          const tableData = this.dataSource.data.map(item => {
            item.isSelected = false;
            if (item.id == data.id) {
              if (!isDate(data.claimSubmittedDate)) {
                data.claimSubmittedDate = null;
              }
              item = data;
            }
            return item;
          });
          this.dataSource.data = tableData;
        });
      }
    });
  }

  deleteClaim(): void {
    const dialogRef = this.dialog.open(ConfirmRemoveComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isEditClaim = false;
      if (result == 'yes') {
        this.claimsService.deleteClaim(this.editedProduct).subscribe(data => {
          const tableData = this.dataSource.data.filter(item => {
            item.isSelected = false;
            return item.id != this.editedProduct.id;
          });
          this.dataSource.data = tableData;
        });
      }
    });
  }

  selectRow(data: Claim) {
    let selectionState: boolean;
    // update selection
    this.dataSource.data.forEach((element, i) => {
      if (element.id != data.id) {
        element.isSelected = false;
      } else {
        element.isSelected = !element.isSelected;
        selectionState = element.isSelected;
      }      
    });
    // adjust buttons
    if (selectionState) {
      this.isEditClaim = true;
      this.editedProduct = data;
    } else {
      this.isEditClaim = false;
    }
  }

  getStyle(claim: Claim) {
    let style = {};
    if (claim.claimStatus == 'CLAIM PROCESSED') {
      style = { backgroundColor: "#29fc4c" };
    } else if (claim.claimStatus == 'CLAIM PENDING (UK)') {
      style = { backgroundColor: "#80a8ff" };
    } else if (claim.claimStatus == 'CLAIM PENDING (INTERNATIONAL)') {
      style = { backgroundColor: "#2465f4" };
    } else if (claim.claimStatus == 'CLAIM ACCEPTED') {
      style = { backgroundColor: "#d124f4" };
    } else if (claim.claimStatus == 'NO REPLY TO P91') {
      style = { backgroundColor: "#cef424" };
    } else if (claim.claimStatus == 'OVER TIME PERIOD') {
      style = { backgroundColor: "#fa390e" };
    } else if (claim.claimStatus == 'DELIVERED/COLLECTED FROM DEPOT/RTS') {
      style = { backgroundColor: "#e49c16" };
    } else if (claim.claimStatus == 'UNABLE TO CLAIM') {
      style = { backgroundColor: "#7f009e" };
    } else if (claim.claimStatus == 'FOLLOW UP') {
      style = { backgroundColor: "#9e630a" };
    }
    return style;
  }

}
