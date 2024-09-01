import { useState } from "react"

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)

  const resetCurrentPage = () => {
    setCurrentPage(0)
  }

  return {
    currentPage,
    setCurrentPage,
    resetCurrentPage,

    offset,
    setOffset,
  }
}
