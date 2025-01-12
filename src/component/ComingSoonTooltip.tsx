import { CustomTooltip } from "component/CustomTooltip"
import { FCC } from "type/fcc"

export const ComingSoonTooltip: FCC = (props) => {
  const { children } = props

  return (
    <CustomTooltip label="Coming Soon.." placement="end">
      {children}
    </CustomTooltip>
  )
}
