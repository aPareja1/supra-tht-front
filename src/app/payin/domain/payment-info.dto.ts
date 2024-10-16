import { PaymentStatus } from "./payment-status.enum";

export interface PaymentInfoDTO {
  amount: number;
  cellPhone: string;
  createdAt: string;
  currency: string;
  description: string;
  document: string;
  documentType: string;
  email: string;
  fullName: string;
  id: string;
  paymentLink: string;
  provider: string;
  quoteId: string;
  redirectUrl: string;
  referenceId: string;
  status: PaymentStatus;
}
export interface CurrencyBalanceDTO {
  currency: string;
  amount: number;
}
