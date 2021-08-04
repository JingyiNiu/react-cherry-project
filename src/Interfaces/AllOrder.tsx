export interface AllOrder {
  oederId: string;

  // User
  userId: number;
  batchId: string;
  userName: string;
  userEmail: string;
  userMobileNumber: string;
  userFirstName: string;
  userLastName: string;
  userCompanyName: string;
  // Product
  productId: number;
  productName: string;
  roductCode: string;
  width: number;
  length: number;
  weight: number;
  packageQty: number;
  qty: number;

  price: number;
  unitPrice: number;
  poNumber: string;
  // Recipient
  recipient: string;
  recipientCountry: string;
  recipientProvience: string;
  recipientCity: string;
  recipientAddr: string;
  recipientNumber: string;
  // Sender
  senderCountry: string;
  senderCity: string;
  senderAddr: string;
  senderNumber: string;
  senderName: string;
  status: number;
  trackNo: string;
  billingCompany: string;
  customerReferenceNo: string;
  senderCompanyName: string;
  paymentMethod: string;
  createdAt: string;
}
