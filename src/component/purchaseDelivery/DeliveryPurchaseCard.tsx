import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Divider,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { getPurchaseServices } from "api/purchase/purchaseService"
import { DividerWithTitle } from "component/DividerWithTitle"
import { CommentTooltip } from "component/comment/CommentTooltip"
import { PurchaseDocumentsModal } from "component/document/PurchaseDocumentsModal"
import { PurchaseCardGoodsList } from "component/purchase/PurchaseCardGoodsList"
import { PurchaseGoodsModal } from "component/purchase/PurchaseGoodsModal"
import { PurchaseSupplierModal } from "component/purchase/PurchaseSupplierModal"
import { DeliveryPurchaseCardMenu } from "component/purchaseDelivery/DeliveryPurchaseCardMenu"
import { PurchaseServicesModal } from "component/purchaseService/PurchaseServicesModal"
import { useCommentInput } from "hook/useCommentInput"
import { useUserPermissions } from "hook/useUserPermissions"
import { FC } from "react"
import { FiFileText } from "react-icons/fi"
import { useQuery } from "react-query"
import { FullPurchase } from "type/purchase/purchase"
import { PurchaseService } from "type/purchase/purchaseService"
import { WithId } from "type/withId"
import { numberWithCurrency, roundNumber } from "util/formatting"

interface DeliveryPurchaseCardProps {
  purchase: FullPurchase
}

export const DeliveryPurchaseCard: FC<DeliveryPurchaseCardProps> = (props) => {
  const { purchase } = props

  const { canReadPurchasesDocuments } = useUserPermissions()

  const purchaseId = purchase.id
  const goods = purchase.goods
  const manager = purchase.manager
  const supplier = manager?.supplier
  const files = purchase.files

  const { data: servicesList } = useQuery<WithId<PurchaseService>[]>(
    ["purchaseServicesList", purchaseId],
    () => getPurchaseServices(purchaseId),
  )
  const isServicesExist = servicesList !== undefined

  const goodsAmount = purchase.goods.reduce(
    (total, good) => total + good.total_amount,
    0,
  )

  const servicesAmount = isServicesExist
    ? servicesList?.reduce((total, service) => total + service.total_amount, 0)
    : 0

  const totalAmount = goodsAmount + servicesAmount

  const isDepositExists = purchase.deposit !== undefined

  const { comment } = useCommentInput({
    objectName: "purchase",
    objectId: purchaseId,
  })

  const isCommentExists = !!comment.trim()

  // Documents
  const {
    isOpen: isDocumentsModalOpen,
    onOpen: onDocumentsModalOpen,
    onClose: onDocumentsModalClose,
  } = useDisclosure()

  // Goods
  const {
    isOpen: isGoodsModalOpen,
    onOpen: onGoodsModalOpen,
    onClose: onGoodsModalClose,
  } = useDisclosure()

  // Services
  const {
    isOpen: isServicesModalOpen,
    onOpen: onServicesModalOpen,
    onClose: onServicesModalClose,
  } = useDisclosure()

  // Manager
  const {
    isOpen: isSupplierManagerModalOpen,
    onOpen: onSupplierManagerModalOpen,
    onClose: onSupplierManagerModalClose,
  } = useDisclosure()

  return (
    <>
      <Flex
        w="full"
        direction="column"
        bgColor="white"
        p={2}
        borderRadius={8}
        borderWidth={1}
        borderColor="gray.200"
        gap={2}
      >
        {/* Purchase Card Header */}
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={1}>
            <AccordionButton w="fit-content" p={2} borderRadius={5}>
              <AccordionIcon />
            </AccordionButton>

            {/* Purchase ID */}
            <Text fontSize="lg" fontWeight="semibold">
              Order #{purchaseId}
            </Text>
          </Flex>

          {/* Menu Btns */}
          <Flex alignItems="center" gap={1}>
            {/* Comment */}
            {isCommentExists && <CommentTooltip comment={comment} />}

            {/* Documents */}
            {canReadPurchasesDocuments && (
              <IconButton
                aria-label="documents-icon-btn"
                size="sm"
                variant="ghost"
                icon={<FiFileText />}
                onClick={onDocumentsModalOpen}
              />
            )}

            {/* Menu Btn */}
            <DeliveryPurchaseCardMenu
              onDocuments={onDocumentsModalOpen}
              onGoods={onGoodsModalOpen}
              onServices={onServicesModalOpen}
              onSupplierManager={onSupplierManagerModalOpen}
            />
          </Flex>
        </Flex>

        {/* Card Content with Goods */}
        <AccordionPanel>
          <Flex direction="column" gap={5}>
            {/* Deposit */}
            {isDepositExists && (
              <Flex alignItems="center" gap={2} fontWeight="semibold">
                <Text>Deposit:</Text>
                <Text>{numberWithCurrency(roundNumber(purchase.deposit))}</Text>
              </Flex>
            )}

            {/* Goods List */}
            <Flex w="full" direction="column" gap={3}>
              <DividerWithTitle title="Goods" />

              <PurchaseCardGoodsList goods={goods} />

              <Divider />
            </Flex>

            {/* Total Amount */}
            <Text fontWeight="semibold">
              Total amount: {numberWithCurrency(roundNumber(totalAmount))}
            </Text>
          </Flex>
        </AccordionPanel>
      </Flex>

      {/* Purchase Modals */}
      <>
        <PurchaseDocumentsModal
          purchaseId={purchaseId}
          documents={files}
          isOpen={isDocumentsModalOpen}
          onClose={onDocumentsModalClose}
          isReadOnly
        />

        <PurchaseGoodsModal
          purchaseId={purchaseId}
          goods={goods}
          isOpen={isGoodsModalOpen}
          onClose={onGoodsModalClose}
          isReadOnly
        />

        <PurchaseServicesModal
          purchaseId={purchaseId}
          isOpen={isServicesModalOpen}
          onClose={onServicesModalClose}
          isReadOnly
        />

        <PurchaseSupplierModal
          purchaseId={purchaseId}
          supplier={supplier}
          manager={manager}
          isOpen={isSupplierManagerModalOpen}
          onClose={onSupplierManagerModalClose}
          isReadOnly
        />
      </>
    </>
  )
}
