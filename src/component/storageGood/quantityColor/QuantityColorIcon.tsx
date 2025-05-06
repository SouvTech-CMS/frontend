import { CustomTooltip } from "component/CustomTooltip"
import { FC } from "react"
import { FiAlertCircle } from "react-icons/fi"
import { QuantityColor } from "type/storage/quantityColor/quantityColor"

interface QuantityColorIconProps {
  quantityColor?: QuantityColor
}

export const QuantityColorIcon: FC<QuantityColorIconProps> = (props) => {
  const { quantityColor } = props

  if (!quantityColor) {
    return <></>
  }

  const { color, description } = quantityColor

  return (
    <CustomTooltip
      label={description}
      placement="top"
      fontStyle="normal"
      fontWeight="normal"
    >
      <span>
        <FiAlertCircle color={color} />
      </span>
    </CustomTooltip>
  )
}
