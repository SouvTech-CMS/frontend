const DAY_1_IN_SECONDS = 24 * 60 * 60

export enum AllPurchaseDeadline {
  // Purchase
  Order = DAY_1_IN_SECONDS * 2,
  Payment = DAY_1_IN_SECONDS * 3,
  Processing = DAY_1_IN_SECONDS * 20,

  // Delivery
  Packing = DAY_1_IN_SECONDS * 10,
  InTransit = DAY_1_IN_SECONDS * 30,
  DutyTaxPaid = DAY_1_IN_SECONDS * 5,
}
