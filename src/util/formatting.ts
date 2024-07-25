export const stringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split(".").map(Number)
  const date = new Date(year, month - 1, day)
  return date
}

export const roundNumber = (
  num: number,
  fractionDigits: number = 2,
): number => {
  const roundedNum = parseFloat(num.toFixed(fractionDigits))
  return roundedNum
}

export const numberWithCurrency = (num: number, currencyChar: string = "$") => {
  return `${currencyChar}${num}`
}

export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return date
}
