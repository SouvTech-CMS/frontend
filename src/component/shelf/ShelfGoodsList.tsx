import { AccordionPanel, Flex, Text } from "@chakra-ui/react"
import { SKUBadge } from "component/badge/SKUBadge"
import { FC } from "react"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"

interface ShelfGoodsListProps {
  good: Omit<WithId<StorageGood>, "shelf">
}

export const ShelfGoodsList: FC<ShelfGoodsListProps> = (props) => {
  const { good } = props

  return (
    <AccordionPanel w="full" p={0} border="none">
      <Flex
        w="full"
        direction="column"
        bgColor="gray.100"
        px={3}
        py={3}
        borderRadius={8}
        gap={2}
      >
        {/* SKU */}
        <SKUBadge sku={good.uniquename} />

        {/* Name */}
        <Text fontSize="xl" fontWeight="medium" lineHeight="normal">
          {good.name}
        </Text>

        {/* Quantity */}
        <Text fontSize="md" color="gray" whiteSpace="nowrap">
          Total Quantity: {good.quantity}
        </Text>
      </Flex>
    </AccordionPanel>
  )
}
