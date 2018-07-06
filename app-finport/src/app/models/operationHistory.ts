import { DtoProduct } from "./product";

export class DtoOperationHistory {
    id: number;
    userId: number;
    buyPrice: number;
    conversionUSD: number;
    amount: number;
    totalConverted: number;
    total: number;
    feeValue: number;
    product: DtoProduct;
};

