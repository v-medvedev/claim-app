import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _moment from 'moment';
import * as jsPDF from 'jspdf';

import { ClaimsService } from '../claims.service';
import { Claim } from '../shared/claim-model';
import { Credit } from '../shared/credit-model';

export interface IClaimMetric {
  name: string;
  value: number;
  class?: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  dataSourceClaims?: Claim[];
  dataSourceCredits?: Credit[];
  dateFrom = new FormControl(_moment());
  dateTo = new FormControl(_moment());

  displayedColumns: string[] = ['name', 'value'];

  claimMetrics: IClaimMetric[] = [];
  creditMetrics: IClaimMetric[] = [];

  carrierAmounts = [];
  
  reportDone = false;

  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  colorScheme = {
    domain: ['#cccccc', '#29fc4c','#d124f4', '#80a8ff','#2465f4', '#fa390e', '#cef424']
  };
  colorScheme2 = {
    domain: ['#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a']
  };
  claims_data: any[] = [];
    
  constructor(private claimService: ClaimsService, private route: ActivatedRoute) {
    route.data.subscribe(data => {
      if (data['claims']) {
        this.dataSourceClaims = data['claims'];
        console.log('Claims Loaded:', this.dataSourceClaims.length);
      }
      if (data['credits']) {
        this.dataSourceCredits = data['credits'];
        console.log('Credits Loaded:', this.dataSourceCredits.length);
      }
    });
  }

  createReport() {

    this.reportDone = true;
    this.claimMetrics = [];
    this.creditMetrics = [];

    let dFrom = _moment(this.dateFrom.value).format('YYYY-MM-DD');
    let dTo = _moment(this.dateTo.value).format('YYYY-MM-DD');

    let filteredClaims: Claim[] = this.dataSourceClaims.filter(d => {
      return (_moment(d.dateOfClaim).isSameOrAfter(dFrom) && _moment(d.dateOfClaim).isSameOrBefore(dTo));
    });
    let filteredCredits: Credit[] = this.dataSourceCredits.filter(d => {
      return (_moment(d.dateClaimSubmitted).isSameOrAfter(dFrom) && _moment(d.dateClaimSubmitted).isSameOrBefore(dTo));
    });

    this.claimMetrics = [
      {
        name: 'Total Claims',
        value: filteredClaims.length,
        class: ''
      },
      {
        name: 'Submitted',
        value: filteredClaims.filter(item => item.claimSubmitted == 'YES').length,
        class: 'claim_processed'
      },
      {
        name: 'Accepted',
        value: filteredClaims.filter(item => item.claimStatus == 'CLAIM ACCEPTED').length,
        class: 'claim_accepted'
      },
      {
        name: 'Pending (UK)',
        value: filteredClaims.filter(item => item.claimStatus == 'CLAIM PENDING (UK)').length,
        class: 'claim_pending_uk'
      },
      {
        name: 'Pending (Intl)',
        value: filteredClaims.filter(item => item.claimStatus == 'CLAIM PENDING (INTERNATIONAL)').length,
        class: 'claim_pending_intl'
      },
      {
        name: 'Refused',
        value: filteredClaims.filter(item => item.claimStatus == 'OVER TIME PERIOD' || item.claimStatus == 'DELIVERED/COLLECTED FROM DEPOT/RTS' || item.claimStatus == 'UNABLE TO CLAIM').length,
        class: 'claim_over_time'
      },
      {
        name: 'No Reply To P91',
        value: filteredClaims.filter(item => item.claimStatus == 'NO REPLY TO P91').length,
        class: 'claim_no_reply'
      }
    ];  

    let carrires = ['Royal Mail', 'Fedex', 'DHL', 'WN Direct', 'Hermes', 'Fastway'];
    
    for (let i=0; i<carrires.length; i++) {
      let carrier = carrires[i];
      let amountCredited = Number(filteredCredits.reduce((acc, item) => {
        if (item.courier == carrires[i]) {
          return acc + item.amountCredited;
        } else {
          return acc;
        }
      }, 0)).toFixed(2);
      this.creditMetrics.push({
        name: carrier,
        value: Number(amountCredited),
        class: ''
      });
    }
    
  }

}
