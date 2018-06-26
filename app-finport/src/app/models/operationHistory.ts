export class DtoOperationHistory {
    id?: number;
    tickerId: number;
    userId: number;
    buyPrice: number;
    conversionUSD: number;
    amount: number;
    totalConverted: number;
    total: number;

    constructor() {
        this.buyPrice = 98.00;
        this.conversionUSD = 1.99;
        this.amount = 2;
    }
}   