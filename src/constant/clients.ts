export enum ClientType {
  BULK_ORDERS = "bulk_orders",
  LOYAL = "loyal",
  HIGH_SPENDING = "high_spending",
}

export const CLIENTS_TYPES_INFO = {
  [ClientType.BULK_ORDERS]: {
    name: "Bulk Orders",
    description: "Customers who place bulk (large) orders.",
    conditions: [
      "Amount of all goods in orders at least 50.",
      "Difference between first and last orders (sorted by date) 3 days maximum.",
    ],
  },
  [ClientType.LOYAL]: {
    name: "Loyal",
    description: "Customers who periodically return and order again.",
    conditions: [
      "Minimum 3 orders.",
      "Difference between any 3 of all orders at least 1 week.",
    ],
  },
  [ClientType.HIGH_SPENDING]: {
    name: "High-Spending",
    description: "Customers who have spent a lot.",
    conditions: ["Amount spent for year more than $500."],
  },
}
