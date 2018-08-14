import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  getStyleName(claimStatus: string): string {
    if (claimStatus == 'CLAIM PROCESSED') {
      return 'claim_processed';
    } else if (claimStatus == 'CLAIM PENDING (UK)') {
      return 'claim_pending_uk';
    } else if (claimStatus == 'CLAIM PENDING (INTERNATIONAL)') {
      return 'claim_pending_intl';
    } else if (claimStatus == 'CLAIM ACCEPTED') {
      return 'claim_accepted';
    } else if (claimStatus == 'NO REPLY TO P91') {
      return 'claim_no_reply';
    } else if (claimStatus == 'OVER TIME PERIOD') {
      return 'claim_over_time';
    } else if (claimStatus == 'DELIVERED/COLLECTED FROM DEPOT/RTS') {
      return 'claim_delivered';
    } else if (claimStatus == 'UNABLE TO CLAIM') {
      return 'claim_unable';
    } else if (claimStatus == 'FOLLOW UP') {
      return 'claim_follow_up';
    } else {
      return '';
    }
  }

}
