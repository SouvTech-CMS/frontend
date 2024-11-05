import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Text,
} from "@chakra-ui/react"
import { getAllSuppliers } from "api/supplier/supplier"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { CommentInput } from "component/comment/Comment"
import { PurchaseGoodsTable } from "component/purchaseGood/PurchaseGoodsTable"
import { PurchaseServicesTable } from "component/purchaseService/PurchaseServicesTable"
import {
  INITIAL_PURCHASE_STATUS,
  PurchaseStatus,
} from "constant/purchaseStatus"
import { useCommentInput } from "hook/useCommentInput"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { usePurchaseCreateMutation } from "service/purchase/purchase"
import { ModalProps } from "type/modalProps"
import { PurchaseCreate, PurchaseWithManager } from "type/purchase/purchase"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { PurchaseService } from "type/purchase/purchaseService"
import { SupplierWithManagers } from "type/supplier/supplier"
import {
  dateAsStringToTimestamp,
  timestampToDateAsString,
} from "util/formatting"
import { getPurchaseDeadlineByStatus } from "util/purchaseDeadline"
import { notify } from "util/toasts"

interface NewPurchaseModalProps extends ModalProps {}

const newPurchase: PurchaseWithManager = {
  supplier_manager_id: NaN,
  deadline: getPurchaseDeadlineByStatus(INITIAL_PURCHASE_STATUS),
  amount: NaN,
  status: INITIAL_PURCHASE_STATUS,
}

export const NewPurchaseModal: FC<NewPurchaseModalProps> = (props) => {
  const { isOpen, onClose } = props

  const [purchase, setPurchase] = useState<PurchaseWithManager>(newPurchase)
  const [supplierId, setSupplierId] = useState<number>(0)
  const [goods, setGoods] = useState<PurchaseGood[]>([])
  const [services, setServices] = useState<PurchaseService[]>([])
  const [deadline, setDeadline] = useState<string>(
    timestampToDateAsString(newPurchase.deadline),
  )

  const purchaseCreateMutation = usePurchaseCreateMutation()

  const { data: suppliersList, isLoading: isSuppliersLoading } = useQuery<
    SupplierWithManagers[]
  >("suppliersList", getAllSuppliers)

  const selectedSupplier = suppliersList?.find(
    (supplier) => supplier.id === supplierId,
  )
  const managersList = selectedSupplier?.managers

  const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
    useCommentInput({
      objectName: "purchase",
    })

  const isLoading = purchaseCreateMutation.isLoading

  const isSupplierSelected = !!supplierId
  const isManagerSelected = !!purchase.supplier_manager_id
  const isSaveBtnDisabled =
    isLoading ||
    // !isSupplierSelected ||
    // !isManagerSelected ||
    goods.length === 0 ||
    !deadline.trim()

  const handleSupplierUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value)
    setSupplierId(value)
  }

  const handlePurchaseUpdate = (param: string, value: number | string) => {
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      [param]: value,
    }))
  }

  const onPurchaseCreate = async () => {
    // Count full purchase amount
    const goodsAmountSum = goods.reduce(
      (sum, good) => sum + (good.amount || 0),
      0,
    )

    const formattedDeadline = dateAsStringToTimestamp(deadline)

    const body: PurchaseCreate = {
      purchase: {
        ...purchase,
        amount: goodsAmountSum,
        deadline: formattedDeadline,
        status: isManagerSelected
          ? PurchaseStatus.Order
          : PurchaseStatus.Request,
      },
      goods,
      services,
    }

    const { id: purchaseId } = await purchaseCreateMutation.mutateAsync(body)

    await onCommentSubmit(purchaseId)

    notify("Purchase created successfully", "success")
    onClose()
  }

  useEffect(() => {
    setPurchase(newPurchase)
    setGoods([])
    setServices([])
    setSupplierId(0)
  }, [isOpen])

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>New Purchase</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
            {/* Goods Table */}
            <Flex w="full" direction="column" gap={2}>
              <Text fontSize="xl" fontWeight="semibold">
                Goods
              </Text>

              <PurchaseGoodsTable goods={goods} setGoods={setGoods} />
            </Flex>

            {/* Services Table */}
            <Flex w="full" direction="column" gap={2}>
              <Text fontSize="xl" fontWeight="semibold">
                Services
              </Text>

              <PurchaseServicesTable
                services={services}
                setServices={setServices}
              />
            </Flex>

            {/* Supplier and Manager */}
            <Flex w="full" gap={10}>
              {/* Supplier Select */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Supplier:</Text>

                <Select
                  placeholder="Select supplier"
                  isDisabled={isSuppliersLoading}
                  value={supplierId}
                  onChange={handleSupplierUpdate}
                >
                  {suppliersList?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Flex>

              {/* Manager Select */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Manager:</Text>

                <Select
                  placeholder="Select manager"
                  value={purchase.supplier_manager_id}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    handlePurchaseUpdate("supplier_manager_id", value)
                  }}
                  isDisabled={!isSupplierSelected}
                >
                  {managersList?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>

            {/* Deposit */}
            <Flex w="full" direction="column" gap={1}>
              <Text fontWeight="bold">Deposit:</Text>

              <Input
                placeholder="Deposit"
                value={purchase.deposit}
                type="number"
                onChange={(e) => {
                  const value = e.target.valueAsNumber
                  handlePurchaseUpdate("deposit", value)
                }}
              />
            </Flex>

            {/* Deadline */}
            <Flex w="full" direction="column" gap={1}>
              <Text fontWeight="bold">Deadline:</Text>

              <Input
                placeholder="Deadline"
                value={deadline}
                type="date"
                onChange={(e) => {
                  const value = e.target.value
                  setDeadline(value)
                }}
              />
            </Flex>

            {/* Comment */}
            <CommentInput
              comment={comment}
              handleCommentChange={handleCommentChange}
              isDisabled={isCommentLoading}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onPurchaseCreate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
