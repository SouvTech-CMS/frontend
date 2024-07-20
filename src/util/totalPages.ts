import { ROWS_PER_PAGE } from "constant/tables"

export const getPagesCount = (count?: number) => {
  if (count === undefined) {
    return 0
  }

  return Math.ceil(count / ROWS_PER_PAGE)
}
