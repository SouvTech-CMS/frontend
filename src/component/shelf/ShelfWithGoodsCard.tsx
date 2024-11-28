import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Badge,
  Flex,
  Text,
} from "@chakra-ui/react"
import { ShelfGoodsList } from "component/shelf/ShelfGoodsList"
import { FC } from "react"
import { titleCase } from "title-case"
import { ShelfWithStorageGoods } from "type/shelf/shelf"
import { ShelfPlacement } from "type/shelf/shelfPlacement"
import { WithId } from "type/withId"
import { getShelfFullCode } from "util/shelf"

interface ShelfWithGoodsCardProps {
  placement: WithId<ShelfPlacement>
  shelfWithGoods: ShelfWithStorageGoods
}

export const ShelfWithGoodsCard: FC<ShelfWithGoodsCardProps> = (props) => {
  const { placement, shelfWithGoods } = props

  shelfWithGoods.shelf_placement = placement
  const fullCode = getShelfFullCode(shelfWithGoods)

  const goodsList = shelfWithGoods.storage_goods

  const totalQuantity = goodsList?.reduce(
    (total, good) => total + good.quantity,
    0,
  )

  const isShelfsEmpty = totalQuantity === 0

  return (
    <AccordionItem p={0} border="none">
      {({ isExpanded }) => (
        <Flex
          w="full"
          direction="column"
          bgColor="white"
          px={2}
          py={3}
          borderRadius={10}
          gap={3}
        >
          <Flex direction="row" alignItems="center" gap={4}>
            <Flex direction="row" alignItems="center" gap={1}>
              {/* Collapse Btn */}
              <AccordionButton w="fit-content" p={1} borderRadius={5}>
                <AccordionIcon />
              </AccordionButton>

              {/* Shelf Name */}
              <Text
                w="full"
                fontSize="xl"
                fontWeight="bold"
                whiteSpace="nowrap"
              >
                {titleCase(fullCode)}
              </Text>
            </Flex>

            {/* Free Badge */}
            {isShelfsEmpty && (
              <Badge w="fit-content" colorScheme="green">
                Free
              </Badge>
            )}
          </Flex>

          {/* Storage Goods List */}
          {isExpanded && (
            <Flex w="full" direction="column" gap={2}>
              {goodsList?.map((good, index) => (
                <ShelfGoodsList key={index} good={good} />
              ))}

              {isShelfsEmpty && (
                <Flex px={5} py={2}>
                  <Text fontSize="sm" color="gray" textAlign="center">
                    No Storage Goods on Shelf
                  </Text>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      )}
    </AccordionItem>
  )
}
