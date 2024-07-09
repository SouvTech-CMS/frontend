import {
  Badge,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { usePurchaseTabsContext } from "context/purchaseTabs"
import { useSearchContext } from "context/search"
import { FC } from "react"
import { ModalProps } from "type/modalProps"
import { PurchaseGood } from "type/purchaseGood"
import { WithId } from "type/withId"

interface PurchaseDeliveryGoodsModalProps extends ModalProps {
  purchaseDeliveryId: number
  goods: WithId<PurchaseGood>[]
}

export const PurchaseDeliveryGoodsModal: FC<PurchaseDeliveryGoodsModalProps> = (
  props
) => {
  const { purchaseDeliveryId, goods, isOpen, onClose } = props

  const { setQuery } = useSearchContext()
  const { setTabIndex } = usePurchaseTabsContext()

  const handlePurchaseOpen = (goodName: string) => {
    setQuery(goodName)
    setTabIndex(0)
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>Delivery #{purchaseDeliveryId} Goods</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={2}>
            {goods.map((good, index) => (
              <Card key={index} borderRadius={20}>
                <CardHeader>
                  <Flex direction="column" gap={2}>
                    {/* Purchase Id Badge */}
                    <Badge w="fit-content" colorScheme="blue">
                      Purchase #{good.purchase_id}
                    </Badge>

                    {/* Good Info */}
                    <Flex justifyContent="space-between">
                      <Flex direction="column" gap={2}>
                        <Flex alignItems="center" gap={5}>
                          <Heading size="md">{good.name}</Heading>
                        </Flex>

                        <Text fontSize="sm" fontStyle="italic" color="gray">
                          {good.description}
                        </Text>
                      </Flex>

                      {/* Side Badges */}
                      <Flex direction="column" gap={3}>
                        <Badge fontSize="sm">Quantity: {good.quantity}</Badge>
                        <Badge fontSize="sm">
                          Unit Price: ${good.price_per_item}
                        </Badge>
                        <Badge fontSize="sm">Amount: ${good.amount}</Badge>
                      </Flex>
                    </Flex>

                    {/* Find in purchases Btn */}
                    <Button
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => handlePurchaseOpen(good.name)}
                    >
                      Find this good in purchases
                    </Button>
                  </Flex>
                </CardHeader>
              </Card>
            ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="solid" colorScheme="gray" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
