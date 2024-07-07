import { Button, Flex } from "@chakra-ui/react"
import { FC } from "react"
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi"

interface PaginationProps {
  totalPages?: number
  currentPage: number
  handlePageChange: (index: number) => void
  isLoading?: boolean
}

const pageLimit = 5

export const Pagination: FC<PaginationProps> = (props) => {
  const { totalPages, currentPage, handlePageChange, isLoading } = props

  if (!totalPages) {
    return <></>
  }

  const isPrevPagesExists = currentPage > 0 && !isLoading
  const isNextPagesExists = currentPage < totalPages - 1 && !isLoading

  const getPageNumbers = () => {
    let startPage = Math.floor(currentPage / pageLimit) * pageLimit
    let endPage = startPage + pageLimit

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(endPage - pageLimit, 1)
    }

    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i)
  }

  const handlePrevPage = () => {
    if (isPrevPagesExists) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (isNextPagesExists) {
      handlePageChange(currentPage + 1)
    }
  }

  const handleToStartPages = () => {
    if (isPrevPagesExists) {
      handlePageChange(0)
    }
  }

  const handleToEndPages = () => {
    if (isNextPagesExists) {
      handlePageChange(totalPages - 1)
    }
  }

  return (
    <Flex w="full" justifyContent="center" gap={2}>
      {/* To Start Btn */}
      <Button
        variant="ghost"
        colorScheme="blue"
        onClick={handleToStartPages}
        isDisabled={!isPrevPagesExists}
      >
        <FiChevronsLeft />
      </Button>

      {/* Left Page Btn */}
      <Button
        variant="ghost"
        colorScheme="blue"
        onClick={handlePrevPage}
        isDisabled={!isPrevPagesExists}
      >
        <FiChevronLeft />
      </Button>

      {/* Pages Btns */}
      {getPageNumbers().map((page) => (
        <Button
          key={page}
          variant="solid"
          colorScheme={page === currentPage ? "blue" : "gray"}
          onClick={() => handlePageChange(page)}
          isDisabled={isLoading}
        >
          {page + 1}
        </Button>
      ))}

      {/* Right Page Btn */}
      <Button
        variant="ghost"
        colorScheme="blue"
        onClick={handleNextPage}
        isDisabled={!isNextPagesExists}
      >
        <FiChevronRight />
      </Button>

      {/* To End Btn */}
      <Button
        variant="ghost"
        colorScheme="blue"
        onClick={handleToEndPages}
        isDisabled={!isNextPagesExists}
      >
        <FiChevronsRight />
      </Button>
    </Flex>
  )
}