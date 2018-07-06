import { DtoMarket } from "./market";

export class DtoProduct {
    id: number;
    abbv: string;
    company: string;
    index_traded: string;
    currency: string;
    current_price: number;
    Change: number;
    sector: string;
    industry: string;
    market_cap: string;
    href: string;
    market: DtoMarket;
}
