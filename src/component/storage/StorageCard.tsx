import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { ShelfBadge } from "component/ShelfBadge"
import { StorageCardMenu } from "component/storage/StorageCardMenu"
import { StorageDeleteModal } from "component/storage/StorageDeleteModal"
import { StorageModal } from "component/storage/StorageModal"
import { FC } from "react"
import { Storage } from "type/storage/storage"
import { WithId } from "type/withId"
import {
  numberWithCurrency,
  roundNumber,
  timestampToDate,
} from "util/formatting"
import { parseShelfs } from "util/shelf"

interface StorageCardProps {
  storage: WithId<Storage>
}

export const StorageCard: FC<StorageCardProps> = (props) => {
  const { storage } = props

  const storageId = storage.id
  const storageGoodId = storage.storage_good_id

  const isCreatedAtExists = storage.created_at !== undefined
  const storageDate = timestampToDate(storage.created_at)

  const isPrimeCostExists = storage.prime_cost !== undefined
  const isItemPriceExists = storage.cost_per_item !== undefined

  const shelfsList = parseShelfs(storage.shelf)

  const {
    isOpen: isStorageUpdateModalOpen,
    onOpen: onStorageUpdateModalOpen,
    onClose: onStorageUpdateModalClose,
  } = useDisclosure()

  const {
    isOpen: isStorageDeleteModalOpen,
    onOpen: onStorageDeleteModalOpen,
    onClose: onStorageDeleteModalClose,
  } = useDisclosure()

  return (
    <>
      <Card h="full" w="full" minH={300} size="sm">
        <CardHeader>
          <Flex direction="column" gap={2}>
            {/* Created At */}
            {isCreatedAtExists && (
              <Heading size="md" fontWeight="medium">
                <Text>Moved to storage at</Text>
                <Text>{storageDate.toDateString()}</Text>
              </Heading>
            )}
          </Flex>

          <StorageCardMenu
            onEdit={onStorageUpdateModalOpen}
            onDelete={onStorageDeleteModalOpen}
          />
        </CardHeader>

        <CardBody>
          <Flex direction="column" gap={2}>
            {/* Shelf */}
            <Flex alignItems="center" gap={2}>
              <Text fontWeight="light" color="gray">
                Shelfs:
              </Text>

              {shelfsList?.map((shelf, index) => (
                <ShelfBadge key={index} shelf={shelf} />
              ))}
            </Flex>

            {/* Prime Price */}
            {isPrimeCostExists && (
              <Flex alignItems="center" gap={2}>
                <Text fontWeight="light" color="gray">
                  Prime Price:
                </Text>

                <Text>
                  {numberWithCurrency(roundNumber(storage.prime_cost!))}
                </Text>
              </Flex>
            )}

            {/* Item Price */}
            {isItemPriceExists && (
              <Flex alignItems="center" gap={2}>
                <Text fontWeight="light" color="gray">
                  Item Price:
                </Text>

                <Text>
                  {numberWithCurrency(roundNumber(storage.cost_per_item!))}
                </Text>
              </Flex>
            )}

            {/* Quantity */}
            <Flex alignItems="center" gap={2}>
              <Text fontWeight="light" color="gray">
                Quantity:
              </Text>

              <Text>{storage.quantity}</Text>
            </Flex>

            {/* In Box Quantity */}
            <Flex alignItems="center" gap={2}>
              <Text fontWeight="light" color="gray">
                Goods In Box Quantity:
              </Text>

              <Text>{storage.in_box_quantity}</Text>
            </Flex>

            {/* Box Quantity */}
            <Flex alignItems="center" gap={2}>
              <Text fontWeight="light" color="gray">
                Boxes Quantity:
              </Text>

              <Text>{storage.box_quantity}</Text>
            </Flex>

            {/* Shops */}
            <Flex alignItems="center" flexWrap="wrap" gap={2}>
              <Text fontWeight="light" color="gray">
                To Shops:
              </Text>

              {storage.shops?.map((shop, index) => (
                <Badge key={index}>{shop.name}</Badge>
              ))}
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      {/* Modals */}
      <>
        <StorageModal
          storageGoodId={storageGoodId}
          prevStorage={storage}
          isOpen={isStorageUpdateModalOpen}
          onClose={onStorageUpdateModalClose}
        />

        <StorageDeleteModal
          storageId={storageId}
          isOpen={isStorageDeleteModalOpen}
          onClose={onStorageDeleteModalClose}
        />
      </>
    </>
  )
}
