import {
  Button,
  Divider,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { ProductionInfoModalInput } from "component/productionInfo/ProductionInfoModalInput"
import { StorageGoodSelect } from "component/select/StorageGoodSelect"
import { FC, useEffect, useState } from "react"
import { useProductionInfoCreateMutation } from "service/productionInfo/productionInfo"
import { ModalProps } from "type/modalProps"
import {
  GoodProductionInfo,
  ProductionInfo,
} from "type/productionInfo/productionInfo"
import { notify } from "util/toasts"

interface NewProductionInfoModalProps extends ModalProps {}

export const NewProductionInfoModal: FC<NewProductionInfoModalProps> = (
  props,
) => {
  const { isOpen, onClose } = props

  const [goodId, setGoodId] = useState<number>(0)
  const [productionInfo, setProductionInfo] = useState<ProductionInfo>()

  const productionInfoCreateMutation = useProductionInfoCreateMutation()

  const isSelectedStorageGoodInvalid = goodId === 0

  const isLoading = productionInfoCreateMutation.isLoading

  const isSaveBtnDisabled = isLoading || isSelectedStorageGoodInvalid

  const handleChange = (param: string, value: number | string) => {
    setProductionInfo((prevProductionInfo) => ({
      ...prevProductionInfo,
      [param]: value,
    }))
  }

  const handleProductionInfoUpdate = async () => {
    const body: GoodProductionInfo = {
      ...productionInfo,
      good_id: goodId!,
    }
    await productionInfoCreateMutation.mutateAsync(body)

    notify(`Storage Good #${goodId} Production updated successfully`, "success")

    onClose()
  }

  useEffect(() => {
    setGoodId(0)
    setProductionInfo(undefined)
  }, [isOpen])

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>New Production Info</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
            {/* Good Name & SKU */}
            <Divider />
            <StorageGoodSelect
              selectedId={goodId}
              onSelect={setGoodId}
              // Goods without Production Info
              hasProductionInfo={false}
            />
            <Divider />

            {/* Production Info */}
            <Grid templateColumns="repeat(2, 1fr)" gap={5}>
              {/* Power */}
              <ProductionInfoModalInput
                placeholder="Power"
                value={productionInfo?.power}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("power", value)
                }}
                isDisabled={false}
              />

              {/* Speed */}
              <ProductionInfoModalInput
                placeholder="Speed"
                value={productionInfo?.speed}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("speed", value)
                }}
                isDisabled={false}
              />

              {/* Penetration Step */}
              <ProductionInfoModalInput
                placeholder="Penetration Step"
                value={productionInfo?.penetration_step}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("penetration_step", value)
                }}
                isDisabled={false}
              />

              {/* Engraving Width Max */}
              <ProductionInfoModalInput
                placeholder="Engraving Width Max"
                value={productionInfo?.engraving_width_max}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("engraving_width_max", value)
                }}
                isDisabled={false}
              />

              {/* Engraving Height Max */}
              <ProductionInfoModalInput
                placeholder="Engraving Height Max"
                value={productionInfo?.engraving_height_max}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("engraving_height_max", value)
                }}
                isDisabled={false}
              />

              {/* Length Inch */}
              <ProductionInfoModalInput
                placeholder="Length Inch"
                value={productionInfo?.length_inch}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("length_inch", value)
                }}
                isDisabled={false}
              />

              {/* Width Inch */}
              <ProductionInfoModalInput
                placeholder="Width Inch"
                value={productionInfo?.width_inch}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("width_inch", value)
                }}
                isDisabled={false}
              />

              {/* Thickness Inch */}
              <ProductionInfoModalInput
                placeholder="Thickness Inch"
                value={productionInfo?.thickness_inch}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("thickness_inch", value)
                }}
                isDisabled={false}
              />

              {/* Package Size Max */}
              <ProductionInfoModalInput
                placeholder="Package Size Max"
                value={productionInfo?.package_size_max}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("package_size_max", value)
                }}
                isDisabled={false}
              />

              {/* Weight Oz */}
              <ProductionInfoModalInput
                placeholder="Weight Oz"
                value={productionInfo?.weight_oz}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("weight_oz", value)
                }}
                isDisabled={false}
              />

              {/* Production Time */}
              <ProductionInfoModalInput
                placeholder="Production Time"
                value={productionInfo?.production_time}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("production_time", value)
                }}
                isDisabled={false}
              />

              {/* Cost Of Good */}
              <ProductionInfoModalInput
                placeholder="Cost Of Good"
                value={productionInfo?.cost_of_good}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("cost_of_good", value)
                }}
                isDisabled={false}
              />

              {/* Competitive Price */}
              <ProductionInfoModalInput
                placeholder="Competitive Price"
                value={productionInfo?.competitive_price}
                onChange={(e) => {
                  const value = e.target.value
                  handleChange("competitive_price", value)
                }}
                isDisabled={false}
              />
            </Grid>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={handleProductionInfoUpdate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
            </Button>

            <Button
              variant="solid"
              colorScheme="gray"
              onClick={onClose}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
