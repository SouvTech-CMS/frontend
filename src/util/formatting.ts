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

export const getCurrentYear = () => {
  const year = new Date().getFullYear()
  return year
}

export const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1
  return month
}
