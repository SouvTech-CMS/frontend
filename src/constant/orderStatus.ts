export enum OrderStatus {
  Paid = "paid",
  Canceled = "canceled",
  Completed = "completed",
  PartiallyRefunded = "partially refunded",
  FullyRefunded = "fully refunded",
}

export enum ProcessingOrderStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  PAUSED = "Paused",
  FINISHED = "Finished",
  CANCELED = "Canceled",
}

// Get list of values from ProcessingOrderStatus
export const ALL_PROCESSING_ORDER_STATUSES_LIST = Object.values(
  ProcessingOrderStatus,
)

// When can start processing order
export const ORDER_READY_TO_PROCESS_STATUSES = [
  ProcessingOrderStatus.NOT_STARTED,
  ProcessingOrderStatus.PAUSED,
]

// When cannot start processing order
export const PROCESSING_FINISHED_STATUSES = [
  ProcessingOrderStatus.FINISHED,
  ProcessingOrderStatus.CANCELED,
]
