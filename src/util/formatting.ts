export const stringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split(".").map(Number)
  const date = new Date(year, month - 1, day)
  return date
}

export const roundNumber = (
  num: number = 0,
  fractionDigits: number = 2,
): number => {
  if (num > 0) {
    const roundedNum = parseFloat(num.toFixed(fractionDigits))
    return roundedNum
  }

  return 0
}

export const numberWithCurrency = (
  num: number = 0,
  currencyChar: string = "$",
) => {
  return `${currencyChar}${num}`
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

export const dateAsStringToDate = (dateAsString?: string) => {
  if (!dateAsString) {
    return
  }

  const date = new Date(dateAsString)
  return date
}

export const formatDate = (date?: Date) => {
  if (!date) {
    return
  }

  const formatedDate = date
    .toLocaleString(undefined, {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    // Remove ","
    .replaceAll(",", "")
  return formatedDate
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
