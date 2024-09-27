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
  Text,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { SKUBadge } from "component/SKUBadge"
import { ProductionInfoModalInput } from "component/productionInfo/ProductionInfoModalInput"
import { FC, useEffect, useState } from "react"
import { useProductionInfoUpdateMutation } from "service/productionInfo/productionInfo"
import { ModalProps } from "type/modalProps"
import {
  GoodProductionInfo,
  ProductionInfo,
} from "type/productionInfo/productionInfo"
import { StorageGood } from "type/storage/storageGood"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface ProductionInfoModalProps extends ModalProps {
  good: WithId<StorageGood>
  prevProductionInfo?: ProductionInfo
}

export const ProductionInfoModal: FC<ProductionInfoModalProps> = (props) => {
  const { good, prevProductionInfo, isOpen, onClose } = props

  const goodId = good.id
  const isNewProductionInfo = !prevProductionInfo

  const [productionInfo, setProductionInfo] = useState<
    ProductionInfo | undefined
  >(prevProductionInfo)

  const productionInfoUpdateMutation = useProductionInfoUpdateMutation()

  const isLoading = productionInfoUpdateMutation.isLoading

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

    await productionInfoUpdateMutation.mutateAsync(body)

    notify(`Storage Good #${goodId} Production updated successfully`, "success")

    onClose()
  }

  useEffect(() => {
    if (isNewProductionInfo) {
      setProductionInfo(undefined)
    } else {
      setProductionInfo(prevProductionInfo)
    }
  }, [isOpen, isNewProductionInfo, prevProductionInfo])

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Storage Good #{goodId} ProductionInfo</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={5}>
            {/* Good Name & SKU */}
            <Divider />
            <Flex
              w="full"
              justifyContent="center"
              alignItems="center"
              fontSize="lg"
              gap={2}
            >
              <SKUBadge sku={good.uniquename} size="md" />

              <Text fontWeight="semibold">{good.name}</Text>
            </Flex>
            <Divider />

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
            <Button onClick={handleProductionInfoUpdate} isLoading={isLoading}>
              Save
            </Button>

            <Button
              variant="solid"
              colorScheme="gray"
              onClick={onClose}
              isLoading={isLoading}
            >
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
