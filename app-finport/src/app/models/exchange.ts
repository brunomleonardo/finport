import { CurrenciesDTO } from "./currencies";

export class DtoExchange {
    id: number;
    symbol: string;
    designation: string;
    currency: CurrenciesDTO;
}