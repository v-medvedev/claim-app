import { Component, OnInit } from '@angular/core';

export interface IReasonCode {
  class: string;
  reason: string;
}

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {

  displayedColumns: string[] = ['reason'];

  colorCodes: IReasonCode[] = [
    { class: 'claim_processed', reason: 'CLAIM PROCESSED' },
    { class: 'claim_pending_uk', reason: 'CLAIM PENDING (UK)' },
    { class: 'claim_pending_intl', reason: 'CLAIM PENDING (INTERNATIONAL)' },
    { class: 'claim_accepted', reason: 'CLAIM ACCEPTED' },
    { class: 'claim_no_reply', reason: 'NO REPLY TO P91' },
    { class: 'claim_over_time', reason: 'OVER TIME PERIOD' },
    { class: 'claim_delivered', reason: 'DELIVERED/COLLECTED FROM DEPOT/RTS' },
    { class: 'claim_unable', reason: 'UNABLE TO CLAIM' },
    { class: 'claim_follow_up', reason: 'FOLLOW UP' }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
