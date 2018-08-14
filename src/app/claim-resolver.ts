import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ClaimsService } from "./claims.service";

@Injectable({
    providedIn: 'root'
})
export class ClaimResolver implements Resolve<any> {

    constructor(private claimService: ClaimsService) {}

    resolve(): Observable<any> {
        return this.claimService.getClaims();
    }

}