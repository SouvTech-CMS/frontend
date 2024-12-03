import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Badge,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { ShelfCardMenu } from "component/shelf/ShelfCardMenu"
import { ShelfDeleteModal } from "component/shelf/ShelfDeleteModal"
import { ShelfGoodsList } from "component/shelf/ShelfGoodsList"
import { ShelfModal } from "component/shelf/ShelfModal"
import { FC } from "react"
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

  const { shelf_placement, storage_goods, ...shelf } = shelfWithGoods

  shelfWithGoods.shelf_placement = placement
  const fullCode = getShelfFullCode(shelfWithGoods)

  const goodsList = shelfWithGoods.storage_goods

  const totalQuantity = goodsList?.reduce(
    (total, good) => total + good.quantity,
    0,
  )

  const isQuantityZero = totalQuantity === 0
  const isShelfEmpty = goodsList?.length === 0

  const {
    isOpen: isShelfUpdateModalOpen,
    onOpen: onShelfUpdateModalOpen,
    onClose: onShelfUpdateModalClose,
  } = useDisclosure()

  const {
    isOpen: isShelfDeleteModalOpen,
    onOpen: onShelfDeleteModalOpen,
    onClose: onShelfDeleteModalClose,
  } = useDisclosure()

  return (
    <>
      <AccordionItem w="full" p={0} border="none">
        {({ isExpanded }) => (
          <Flex
            w="full"
            direction="column"
            bgColor="gray.100"
            px={2}
            py={3}
            borderRadius={10}
            gap={3}
          >
            <Flex w="full" direction="row" alignItems="center" gap={2}>
              <Flex w="full" direction="row" alignItems="center" gap={1}>
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
                  {fullCode}
                </Text>
              </Flex>

              {/* Free Badge */}
              {isQuantityZero && (
                <Badge w="fit-content" colorScheme="green">
                  Free
                </Badge>
              )}

              <ShelfCardMenu
                onEdit={onShelfUpdateModalOpen}
                onDelete={onShelfDeleteModalOpen}
              />
            </Flex>

            {/* Storage Goods List */}
            {isExpanded && (
              <Flex w="full" direction="column" gap={2}>
                {goodsList?.map((good, index) => (
                  <ShelfGoodsList key={index} good={good} />
                ))}

                {isShelfEmpty && (
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

      {/* Modals */}
      <>
        <ShelfModal
          placement={placement}
          prevShelf={shelf}
          isOpen={isShelfUpdateModalOpen}
          onClose={onShelfUpdateModalClose}
        />

        <ShelfDeleteModal
          placement={placement}
          shelf={shelf}
          isOpen={isShelfDeleteModalOpen}
          onClose={onShelfDeleteModalClose}
        />
      </>
    </>
  )
}
