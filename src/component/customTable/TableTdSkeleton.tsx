import { Skeleton } from "@chakra-ui/react"
import { FCC } from "type/fcc"

interface TableTdSkeletonProps {
  isLoading?: boolean
}

export const TableTdSkeleton: FCC<TableTdSkeletonProps> = (props) => {
  const { children, isLoading } = props

  return (
    <Skeleton
      minH={4}
      minW={10}
      h="fit-content"
      w="fit-content"
      isLoaded={!isLoading}
    >
      {children}
    </Skeleton>
  )
}
