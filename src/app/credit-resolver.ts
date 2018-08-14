import { Injectable } from "@angular/core";
import { Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs";

import { ClaimsService } from "./claims.service";
import { Credit } from "./shared/credit-model";

@Injectable({
    providedIn: 'root'
})
export class CreditResolver implements Resolve<Credit[]> {

    constructor(private claimService: ClaimsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Credit[]> {
        let courier = '';
        if (state.url == '/royal-mail-credits') {
            courier = 'Royal Mail';
        } else if (state.url == '/fedex-credits') {
            courier = 'Fedex';
        } else if (state.url == '/dhl-credits') {
            courier = 'DHL';
        } else if (state.url == '/wn-direct-credits') {
            courier = 'WN Direct';
        } else if (state.url == '/hermes-credits') {
            courier = 'Hermes';
        } else if (state.url == '/fastway-credits') {
            courier = 'Fastway';
        } else if (state.url == '/report') {
            courier = 'All Couriers';
        }
        return this.claimService.getCredits(courier);
    }

}