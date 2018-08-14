export class Claim {
    id?: number;
    dateOfClaim: Date;
    orderNo: string;
    stockNumber: string;
    dispatchDate: Date;
    dateToClaimFrom: Date;
    trackingNumber: string;
    reasonForClaim: string;
    prepaidLabel: string;
    claimType?: string;
    claimSubmitted?: string;
    claimSubmittedDate?: Date;
    claimStatus?: string;
    isSelected?: boolean;
}