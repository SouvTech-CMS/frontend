const DAY_1_IN_SECONDS = 24 * 60 * 60

export enum AllPurchaseDeadline {
  // Purchase
  Payment = DAY_1_IN_SECONDS * 2,
  Processing = DAY_1_IN_SECONDS * 3,

  // Delivery
  Packing = DAY_1_IN_SECONDS * 20,
  InTransit = DAY_1_IN_SECONDS * 10,
  DutyTaxPaid = DAY_1_IN_SECONDS * 30,
  Delivered = DAY_1_IN_SECONDS * 5,
}
