import { OrderEngraver } from "type/engraver/processingOrder"
import { dateAsStringToDate } from "util/formatting"

const CLIENT_TIME_ZONE = "America/Chicago"
const EMPTY_VALUE = "—"

const getDurationInSeconds = (duration?: string) => {
  if (!duration) {
    return
  }

  const [hours, minutes, seconds] = duration.split(":").map(Number)
  // NOTE: backend sends fractional seconds, e.g. "01:02:57.806475"
  return Math.floor(hours * 60 * 60 + minutes * 60 + seconds)
}

const formatDuration = (seconds?: number) => {
  if (seconds === undefined || Number.isNaN(seconds)) {
    return EMPTY_VALUE
  }

  // NOTE: shown in whole minutes, a short non-zero time is "<1m"
  const totalMinutes = Math.round(seconds / 60)
  if (totalMinutes === 0) {
    return seconds > 0 ? "<1m" : "0m"
  }

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const parts = []

  if (hours) {
    parts.push(`${hours}h`)
  }

  if (minutes || !hours) {
    parts.push(`${minutes}m`)
  }

  return parts.join(" ")
}

const formatClientDateTime = (dateString?: string) => {
  const date = dateAsStringToDate(dateString, true)

  if (!date) {
    return EMPTY_VALUE
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: CLIENT_TIME_ZONE,
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

export const formatOrderEngraver = (orderEngraver: OrderEngraver) => {
  const name = orderEngraver.fio || orderEngraver.username
  const startedAt = formatClientDateTime(orderEngraver.started_at)
  const finishedAt = formatClientDateTime(orderEngraver.finished_at)
  const startedDate = dateAsStringToDate(orderEngraver.started_at, true)
  const finishedDate = dateAsStringToDate(orderEngraver.finished_at, true)
  const calculatedDuration =
    startedDate && finishedDate
      ? Math.floor((finishedDate.getTime() - startedDate.getTime()) / 1000)
      : undefined
  const grossDuration =
    getDurationInSeconds(orderEngraver.processing_time) ?? calculatedDuration
  const pausedSeconds = orderEngraver.paused_seconds
  const elapsedSeconds = calculatedDuration ?? grossDuration
  const durationSeconds =
    pausedSeconds != null && elapsedSeconds !== undefined
      ? Math.max(0, elapsedSeconds - pausedSeconds)
      : grossDuration

  return {
    name: name || EMPTY_VALUE,
    status: orderEngraver.status || EMPTY_VALUE,
    startedAt,
    finishedAt,
    duration: formatDuration(durationSeconds),
    pauseDuration: formatDuration(pausedSeconds ?? undefined),
    durationSeconds,
  }
}

export const formatOrderEngraversTotalDuration = (
  orderEngravers: OrderEngraver[],
) => {
  const durations = orderEngravers
    .map((orderEngraver) => formatOrderEngraver(orderEngraver).durationSeconds)
    .filter((duration): duration is number => duration !== undefined)

  if (!durations.length) {
    return EMPTY_VALUE
  }

  const totalDuration = durations.reduce(
    (total, duration) => total + duration,
    0,
  )

  return formatDuration(totalDuration)
}
