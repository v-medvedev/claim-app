export class Credit {
    id?: number;
    courier: string;
    dateClaimSubmitted: Date;
    referenceNumber: string;
    reason: string;
    amountCredited: number;
    notes: string;
    isSelected?: boolean;
}