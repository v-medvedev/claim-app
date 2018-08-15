import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { Claim } from './shared/claim-model';
import { Credit } from './shared/credit-model';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private baseURL_Api_Endpoint: string = 'http://172.25.0.35/claims-app/api.php';
  
  constructor(private http: HttpClient) { }

  getClaims(): Observable<Claim[]> {
    let params = {
      action: 'getClaims'
    };
    return this.http.get<Claim[]>(this.baseURL_Api_Endpoint, {params: params});
  }

  addClaim(claim: Claim): Observable<Claim> {
    let params = {
      action: 'addClaim',
      dateOfClaim: moment(claim.dateOfClaim).format('YYYY-MM-DD'),
      orderNo: claim.orderNo.toString().trim(),
      stockNumber: claim.stockNumber.toString().trim(),
      dispatchDate: moment(claim.dispatchDate).format('YYYY-MM-DD'),
      dateToClaimFrom: moment(claim.dateToClaimFrom).format('YYYY-MM-DD'),
      trackingNumber: claim.trackingNumber.toString().trim(),
      reasonForClaim: claim.reasonForClaim.toString().trim(),
      prepaidLabel: claim.prepaidLabel.toString().trim()
    };
    return this.http.get<Claim>(this.baseURL_Api_Endpoint, {params: params});
  }

  editClaim(claim: Claim): Observable<Claim> {
    let params = {
      action: 'editClaim',
      id: claim.id.toString(),
      dateOfClaim: moment(claim.dateOfClaim).format('YYYY-MM-DD'),
      orderNo: claim.orderNo.toString().trim(),
      stockNumber: claim.stockNumber.toString().trim(),
      dispatchDate: moment(claim.dispatchDate).format('YYYY-MM-DD'),
      dateToClaimFrom: moment(claim.dateToClaimFrom).format('YYYY-MM-DD'),
      trackingNumber: claim.trackingNumber.toString().trim(),
      reasonForClaim: claim.reasonForClaim.toString().trim(),
      prepaidLabel: claim.prepaidLabel.toString().trim(),
      claimType: claim.claimType.toString().trim(),
      claimSubmitted: claim.claimSubmitted.toString().trim(),
      claimSubmittedDate: moment(claim.claimSubmittedDate).format('YYYY-MM-DD'),
      claimStatus: claim.claimStatus.toString().trim()
    };
    return this.http.get<Claim>(this.baseURL_Api_Endpoint, {params: params});
  }

  deleteClaim(claim: Claim): Observable<any> {
    let params = {
      action: 'deleteClaim',
      id: claim.id.toString()
    };
    return this.http.get<any>(this.baseURL_Api_Endpoint, {params: params});
  }

  getCredits(courier: string): Observable<Credit[]> {
    let params = {
      action: 'getCredits',
      courier: courier
    };
    return this.http.get<Credit[]>(this.baseURL_Api_Endpoint, {params: params});
  }

  addCredit(credit: Credit): Observable<Credit> {
    let params = {
      action: 'addCredit',
      courier: credit.courier.toString().trim(),
      dateClaimSubmitted: moment(credit.dateClaimSubmitted).format('YYYY-MM-DD'),
      referenceNumber: credit.referenceNumber.toString().trim(),
      reason: credit.reason.toString().trim(),
      amountCredited: credit.amountCredited.toString(),
      notes: credit.notes
    };
    return this.http.get<Credit>(this.baseURL_Api_Endpoint, {params: params});
  }

  editCredit(credit: Credit): Observable<Credit> {
    let params = {
      action: 'editCredit',
      id: credit.id.toString(),
      courier: credit.courier.toString().trim(),
      dateClaimSubmitted: moment(credit.dateClaimSubmitted).format('YYYY-MM-DD'),
      referenceNumber: credit.referenceNumber.toString().trim(),
      reason: credit.reason.toString().trim(),
      amountCredited: credit.amountCredited.toString(),
      notes: credit.notes
    };
    return this.http.get<Credit>(this.baseURL_Api_Endpoint, {params: params});
  }

  deleteCredit(credit: Credit): Observable<any> {
    let params = {
      action: 'deleteCredit',
      id: credit.id.toString()
    };
    return this.http.get<any>(this.baseURL_Api_Endpoint, {params: params});
  }

}
