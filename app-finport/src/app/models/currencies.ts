export class CurrenciesDTO {
    CurrencyId: number;
    Symbol: string;
    Designation: string;
    Name: string;
    constructor(currencyId: number){
        this.CurrencyId = currencyId;
    }
}