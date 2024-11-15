import { MONTHS_LIST } from "constant/reports"

export const getCurrentYear = () => {
  const year = new Date().getFullYear()
  return year
}

export const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1
  return month
}

export const getMonthsListByYear = (year: number) => {
  const currentYear = getCurrentYear()

  if (year === currentYear) {
    return MONTHS_LIST.slice(0, getCurrentMonth())
  }

  return MONTHS_LIST
}
