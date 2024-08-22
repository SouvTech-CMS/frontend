import { Skeleton } from "@chakra-ui/react"
import { FCC } from "type/fcc"

interface TableTdSkeletonProps {
  isLoading?: boolean
}

export const TableTdSkeleton: FCC<TableTdSkeletonProps> = (props) => {
  const { children, isLoading } = props

  return (
    <Skeleton h={4} w={10} isLoaded={!isLoading}>
      {children}
    </Skeleton>
  )
}
