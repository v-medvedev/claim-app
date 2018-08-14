import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';

import { AppComponent } from '../app.component';
import { ClaimsService } from '../claims.service';
import { Credit } from '../shared/credit-model';
import { AddCreditComponent } from '../add-credit/add-credit.component';
import { ConfirmRemoveComponent } from '../confirm-remove/confirm-remove.component';
import { EditCreditComponent } from '../edit-credit/edit-credit.component';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @Input() courier: string;
    
  displayedColumns: string[] = ['dateClaimSubmitted', 'referenceNumber', 'reason', 'amountCredited', 'notes'];
  dataSource? = new MatTableDataSource<Credit>();
  isEditCredit: boolean = false;
  editedProduct: Credit = null;

  constructor(private appComponent: AppComponent, private claimsService: ClaimsService, public dialog: MatDialog, private route: ActivatedRoute) {
    route.data.subscribe(data => {
      this.dataSource.data = data['credits'].map(item => {
        item.isSelected = false;
        return item;
      });
      this.dataSource.sort = this.sort;
      console.log('Credits Loaded:', this.dataSource.data.length);
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  selectRow(data: Credit) {
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
      this.isEditCredit = true;
      this.editedProduct = data;
    } else {
      this.isEditCredit = false;
    }
  }

  addCredit(): void {
    const dialogRef = this.dialog.open(AddCreditComponent, {
      width: '500px',
      data: {courier: this.courier}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let credit: Credit = result;
        credit.isSelected = false;
        credit.courier = this.courier;
        this.claimsService.addCredit(credit).subscribe(data => {
          const tableData = this.dataSource.data;
          tableData.push(data);
          this.dataSource.data = tableData;
          this.dataSource.sort = this.sort;
        });
      }
    });
  }

  editCredit(): void {
    const dialogRef = this.dialog.open(EditCreditComponent, {
      width: '500px',
      data: this.editedProduct
    });
    dialogRef.afterClosed().subscribe(result => {
      this.editedProduct.isSelected = false;
      if (result) {
        let credit: Credit = result;
        this.claimsService.editCredit(credit).subscribe(data => {
          const tableData = this.dataSource.data.map(item => {
            item.isSelected = false;
            if (item.id == data.id) {
              item = data;
            }
            return item;
          });
          this.dataSource.data = tableData;
        });
      }
      this.isEditCredit = false;
    });
  }

  deleteCredit(): void {
    const dialogRef = this.dialog.open(ConfirmRemoveComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.claimsService.deleteCredit(this.editedProduct).subscribe(data => {
          const tableData = this.dataSource.data.filter(item => {
            item.isSelected = false;
            return item.id != this.editedProduct.id;
          });
          this.dataSource.data = tableData;
        });
      }
      this.isEditCredit = false;
    });
  }

}
