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
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react"
import { getAllSuppliers } from "api/supplier"
import { getManagersBySupplierId } from "api/supplierManager"
import { CommentInput } from "component/comment/Comment"
import { PurchaseGoodsTable } from "component/purchaseGood/PurchaseGoodsTable"
import { useCommentInput } from "hook/useCommentInput"
import { FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { usePurchaseCreateMutation } from "service/purchase"
import { usePurchaseGoodCreateMutation } from "service/purchaseGood"
import { ModalProps } from "type/modalProps"
import { Purchase } from "type/purchase"
import { PurchaseGood } from "type/purchaseGood"
import { Supplier } from "type/supplier"
import { SupplierManager } from "type/supplierManager"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface NewPurchaseModalProps extends ModalProps {}

const newPurchase: Purchase = {
  supplier_id: NaN,
  supplier_manager_id: NaN,
  deadline: Math.floor(Date.now() / 1000),
  amount: NaN,
}

export const NewPurchaseModal: FC<NewPurchaseModalProps> = (props) => {
  const { isOpen, onClose } = props

  const [purchase, setPurchase] = useState<Purchase>(newPurchase)
  const [goods, setGoods] = useState<PurchaseGood[]>([])
  const [deadline, setDeadline] = useState<string>(
    new Date(newPurchase.deadline * 1000).toISOString().split("T")[0],
  )

  const purchaseCreateMutation = usePurchaseCreateMutation()
  const purchaseGoodCreateMutation = usePurchaseGoodCreateMutation()

  const isLoading =
    purchaseCreateMutation.isLoading || purchaseGoodCreateMutation.isLoading

  const { data: suppliersList, isLoading: isSuppliersLoading } = useQuery<
    WithId<Supplier>[]
  >("suppliersList", getAllSuppliers)

  const { data: managersList, isLoading: isManagersLoading } = useQuery<
    WithId<SupplierManager>[]
  >(
    ["suppliersList", purchase.supplier_id],
    () => getManagersBySupplierId(purchase.supplier_id!),
    { enabled: !!purchase.supplier_id },
  )

  const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
    useCommentInput({
      objectName: "purchase",
    })

  const isManagerSelectDisabled = isManagersLoading || !purchase.supplier_id
  const isSaveBtnDisabled =
    isLoading ||
    !purchase.supplier_id ||
    !purchase.supplier_manager_id ||
    goods.length === 0 ||
    !deadline.trim()

  const handlePurchaseUpdate = (param: string, value: number | string) => {
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      [param]: value,
    }))
  }

  const onPurchaseCreate = async () => {
    const goodsAmountSum = goods.reduce(
      (sum, good) => sum + (good.amount || 0),
      0,
    )

    const formattedDeadline = new Date(deadline).getTime() / 1000

    const body: Purchase = {
      ...purchase,
      deadline: formattedDeadline,
      amount: goodsAmountSum,
    }

    const { id: purchaseId } = await purchaseCreateMutation.mutateAsync(body)

    goods.forEach(async (good) => {
      const body: PurchaseGood = {
        ...good,
        purchase_id: purchaseId,
      }
      await purchaseGoodCreateMutation.mutateAsync(body)
    })

    await onCommentSubmit(purchaseId)

    notify("Purchase created successfully", "success")
    onClose()
  }

  useEffect(() => {
    setPurchase(newPurchase)
    setGoods([])
  }, [isOpen])

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />

      <ModalContent>
        <ModalHeader>New Purchase</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={10}>
            <PurchaseGoodsTable goods={goods} setGoods={setGoods} />

            {/* Supplier and Manager */}
            <Flex w="full" gap={10}>
              {/* Supplier Select */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Supplier:</Text>

                <Select
                  placeholder="Select supplier"
                  isDisabled={isSuppliersLoading}
                  value={purchase.supplier_id}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    handlePurchaseUpdate("supplier_id", value)
                  }}
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
                  isDisabled={isManagerSelectDisabled}
                  value={purchase.supplier_manager_id}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    handlePurchaseUpdate("supplier_manager_id", value)
                  }}
                >
                  {managersList?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>

            {/* Shipping and Deadline */}
            <Flex w="full" gap={10}>
              {/* Shipping */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Shipping:</Text>

                <Input
                  placeholder="Shipping"
                  value={purchase.shipping}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.valueAsNumber
                    handlePurchaseUpdate("shipping", value)
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
              variant="solid"
              colorScheme="blue"
              onClick={onPurchaseCreate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button variant="solid" colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
