import { ROWS_PER_PAGE } from "constant/tables"

export const getPagesCount = (count?: number) => {
  if (count === undefined) {
    return 0
  }

  return Math.floor(count / ROWS_PER_PAGE) + 1
}
