export interface QuoteDTO {
  exchangeRate: number;
  inverseExchangeRate: number;
  finalAmount: number;
  initialCurrency: string;
  finalCurrency: string;
  initialAmount: number;
  createdAt: string;
  expiresAt: string;
  exchangeConfirmationToken: string;
  transactionCost: number;
  id: string;
}
