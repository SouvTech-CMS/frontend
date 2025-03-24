import { MONTHS_LIST } from "constant/reports"

export const getCurrentYear = () => {
  const year = new Date().getFullYear()
  return year
}

export const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1
  return month
}

export const getMonthsListByYear = (year?: number) => {
  const currentYear = getCurrentYear()

  if (year === currentYear) {
    const currentMonth = getCurrentMonth()
    return MONTHS_LIST.slice(0, currentMonth)
  }

  return MONTHS_LIST
}

export const getFirstCurrentYearDateString = () => {
  const currentYear = getCurrentYear()
  return `1.1.${currentYear}`
}

export const getLastCurrentYearDateString = () => {
  const currentYear = getCurrentYear()
  return `31.12.${currentYear}`
}

export const getFirstCurrentMonthDateString = () => {
  const currentYear = getCurrentYear()
  const currentMonth = getCurrentMonth()
  return `1.${currentMonth}.${currentYear}`
}

export const getLastCurrentMonthDateString = () => {
  const currentYear = getCurrentYear()
  const currentMonth = getCurrentMonth()
  const currentDate = new Date().getDate()
  return `${currentDate}.${currentMonth}.${currentYear}`
}

export const getUserTimezone = () => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return userTimezone
}
