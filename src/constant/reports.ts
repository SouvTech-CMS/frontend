import { getCurrentYear } from "util/formatting"

export const INITIAL_REPORTS_YEAR = 2021

export const YEARS_LIST = Array.from(
  { length: getCurrentYear() - INITIAL_REPORTS_YEAR + 1 },
  (_, i) => INITIAL_REPORTS_YEAR + i,
)

export const MONTHS_LIST = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
