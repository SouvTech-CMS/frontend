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
import { useCommentInput } from "hook/useCommentInput"
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"
import { usePurchaseUpdateMutation } from "service/purchase/purchase"
import { ModalProps } from "type/modalProps"
import { FullPurchase, PurchaseUpdate } from "type/purchase/purchase"
import { SupplierWithManagers } from "type/supplier/supplier"
import { notify } from "util/toasts"

interface PurchaseUpdateModalProps extends ModalProps {
  prevPurchase: FullPurchase
  prevSupplierId: number
  prevManagerId: number
}

export const PurchaseUpdateModal: FC<PurchaseUpdateModalProps> = (props) => {
  const { prevPurchase, prevSupplierId, prevManagerId, isOpen, onClose } = props

  const purchaseId = prevPurchase.id

  const prevPurchaseData = useMemo(
    () => ({
      id: purchaseId,
      supplier_manager_id: prevManagerId,
      deadline: prevPurchase.deadline,
      amount: prevPurchase.amount,
      deposit: prevPurchase.deposit,
      status: prevPurchase.status,
    }),
    [purchaseId, prevManagerId, prevPurchase],
  )

  const [purchase, setPurchase] = useState<PurchaseUpdate>(prevPurchaseData)
  const [supplierId, setSupplierId] = useState<number>(prevSupplierId)

  const purchaseUpdateMutation = usePurchaseUpdateMutation()

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
      objectId: purchaseId,
    })

  const isLoading = purchaseUpdateMutation.isLoading

  const isManagerSelectDisabled = supplierId === 0
  const isSaveBtnDisabled =
    isLoading || isManagerSelectDisabled || !purchase.supplier_manager_id

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

  const onPurchaseUpdate = async () => {
    const body: PurchaseUpdate = {
      ...purchase,
      supplier_manager_id: purchase.supplier_manager_id,
    }

    await purchaseUpdateMutation.mutateAsync(body)

    await onCommentSubmit()

    notify(`Purchase #${purchaseId} updated successfully`, "success")
    onClose()
  }

  useEffect(() => {
    setPurchase(prevPurchaseData)
  }, [prevPurchaseData])

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Purchase #{purchaseId}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
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
              onClick={onPurchaseUpdate}
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
