export interface PaymentResponseDto {
  amount: number;
  cellPhone: string;
  currency: string;
  description: string;
  document: string;
  documentType: string;
  email: string;
  fullName: string;
  id: string;
  paymentLink: string;
  quoteId: string;
  redirectUrl: string;
  referenceId: string;
  status: string;
  userId: string;
}
