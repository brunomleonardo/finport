import { WalletDepositsDTO } from './walletDeposits';
import { CurrenciesDTO } from './currencies';

export class WalletsDTO {
    Amount: number;
    CurrencySymbol: string;
    CurrencyDesignation: string;
    CurrencyName: string;
    Currency: CurrenciesDTO;
    UsersUserId: number;
    UsersUsername: string;
    UsersFirstName: string;
    UsersLastName: string;
    WalletDeposits: WalletDepositsDTO[];
    constructor(amount: number){
        this.Amount = amount;
        this.Currency = new CurrenciesDTO(0);
    }
}
