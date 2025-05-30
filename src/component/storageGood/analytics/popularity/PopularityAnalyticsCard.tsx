import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { Container } from "component/Container"
import { PopularityModal } from "component/storageGood/analytics/popularity/PopularityModal"
import { TableContextProvider } from "context/table"
import { FC } from "react"
import { OrderSearchFilter } from "type/order/order"

export const PopularityAnalyticsCard: FC = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  return (
    <>
      <Container w="full" alignSelf="stretch" p={4} gap={2}>
        {/* Heading */}
        <Heading size="md">Popularity</Heading>

        {/* Description */}
        <Text color="hint">
          Analytics of the most popular storage goods based on sales.
        </Text>

        {/* Modal Btn */}
        <Button
          w="full"
          variant="ghost"
          colorScheme="blue"
          onClick={onModalOpen}
          mt="auto"
        >
          View
        </Button>
      </Container>

      <TableContextProvider<OrderSearchFilter>>
        <PopularityModal isOpen={isModalOpen} onClose={onModalClose} />
      </TableContextProvider>
    </>
  )
}
