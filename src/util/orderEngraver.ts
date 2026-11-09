import { OrderEngraver } from "type/engraver/processingOrder"
import { dateAsStringToDate, formatDateTime } from "util/formatting"

export const formatOrderEngraver = (orderEngraver: OrderEngraver) => {
  const name = orderEngraver.fio || orderEngraver.username
  const date = dateAsStringToDate(
    orderEngraver.finished_at || orderEngraver.started_at,
    true,
  )
  const details = date
    ? `${orderEngraver.status} · ${formatDateTime(date, true, "en-US")}`
    : orderEngraver.status

  return { name, details }
}
