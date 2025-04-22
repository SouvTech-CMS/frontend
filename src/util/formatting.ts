export const stringToDate = (dateString?: string) => {
  if (!dateString) {
    return
  }

  const [day, month, year] = dateString.split(".").map(Number)
  const date = new Date(year, month - 1, day)
  return date
}

export const stringToTime = (timeString?: string) => {
  if (!timeString) {
    return
  }

  const [hours, minutes, seconds] = timeString.split(":").map(Number)
  const date = new Date()
  date.setHours(hours, minutes, seconds, 0)
  return date
}

export const roundNumber = (num?: number, fractionDigits: number = 2) => {
  if (!num) {
    return 0
  }

  const roundedNum = parseFloat(num.toFixed(fractionDigits))
  return roundedNum
}

export const numberWithCurrency = (
  num?: number,
  currencyChar: string = "$",
) => {
  if (!num) {
    return
  }

  if (num > 0) {
    return `${currencyChar}${num}`
  }
  return `-${currencyChar}${Math.abs(num)}`
}

export const timestampToDate = (timestamp: number = 0) => {
  const date = new Date(timestamp * 1000)
  return date
}

export const dateAsStringToTimestamp = (dateAsString: string) => {
  const timestamp = new Date(dateAsString).getTime() / 1000
  return timestamp
}

export const timestampToDateAsString = (timestamp: number) => {
  const date = timestampToDate(timestamp)
  const dateAsString = date.toISOString().split("T")[0]
  return dateAsString
}

export const dateToDateAsString = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const dateAsString = `${day}.${month}.${year}`

  return dateAsString
}

export const dateAsStringToDate = (
  dateAsString?: string,
  isUTC: boolean = false,
) => {
  if (!dateAsString) {
    return
  }

  let date
  if (isUTC) {
    // Если строка содержит миллисекунды, обрезаем их до 3 знаков
    const normalizedDateString = dateAsString.replace(
      /\.\d+$/,
      (match) => match.slice(0, 4), // Оставляем только 3 знака после точки
    )

    // Добавляем суффикс Z, чтобы указать, что это UTC
    const utcDateString = `${normalizedDateString}Z`

    // Создаем объект Date
    date = new Date(utcDateString)
  } else {
    date = new Date(dateAsString)
  }

  return date
}

export const formatDate = (
  date?: Date,
  isShortDate: boolean = false,
  withTime: boolean = false,
  locale?: string,
) => {
  if (!date) {
    return
  }

  const options: Intl.DateTimeFormatOptions = isShortDate
    ? { dateStyle: "short" }
    : {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }

  if (withTime) {
    options.hour = "2-digit"
    options.minute = "2-digit"
    options.second = "2-digit"
  }

  // Format date
  const formatedDate = date
    .toLocaleString(locale || navigator.language, options)
    // Remove ","
    .replaceAll(",", "")
  return formatedDate
}

export const formatDateTime = (
  date?: Date,
  isShortDate: boolean = false,
  locale?: string,
) => {
  return formatDate(date, isShortDate, true, locale)
}

export const getShortTime = (timeString?: string) => {
  if (!timeString) {
    return
  }

  // Extract hours and minutes from the time string
  const [hours, minutes] = timeString.split(":")

  const time = `${hours}:${minutes}`
  return time
}

export const formatTime = (timeString?: string) => {
  if (!timeString) {
    return
  }

  // Extract hours and minutes from the time string
  const [hours, minutes] = timeString.split(":")

  // Create a Date object using the current date and the extracted time
  const date = new Date()
  date.setHours(parseInt(hours, 10))
  date.setMinutes(parseInt(minutes, 10))

  // Format the time in local format
  const formatedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  })
  return formatedTime
}

export const formatTimeFromDate = (dateWithTime?: Date, locale?: string) => {
  if (!dateWithTime) {
    return
  }

  // Format the time in local format
  const formatedTime = dateWithTime.toLocaleTimeString(
    locale || navigator.language,
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  )
  return formatedTime
}

export const truncateText = (text?: string, length: number = 30) => {
  if (!text) {
    return
  }

  if (text.length <= length) {
    return text
  }

  const truncatedText = text.slice(0, length) + "..."
  return truncatedText
}
