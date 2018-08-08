import { WalletsDTO } from "./wallet";

export class UsersDTO {
    UserId: number;
    Username: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Password: string;
    PasswordConfirmation?: string
    Wallet: WalletsDTO;
    UserAmount: number;
    UserWalletSymbol: string;
    UserWalletDesignation: string;
    // UserExchangeTaxes: IEnumerable<UserExchangeTaxesDTO>;
    // UserOperationHistories: IEnumerable<UserOperationHistoriesDTO>;
    constructor(){
        this.Wallet = new WalletsDTO(0);
    }
}
