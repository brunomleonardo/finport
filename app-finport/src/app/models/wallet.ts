import { DtoWalletDeposits } from "./walletDeposits";
import { DtoCurrencies } from "./currencies";

export class DtoWallet {
    id?: number;
    amount: number;
    currencyId: number;
    currency: DtoCurrencies;
    userId: number;
    deposits: DtoWalletDeposits[];
}