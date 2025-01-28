import { BackgroundProps, Theme } from "@chakra-ui/react"

type ThemeColors = Theme["colors"]

type Color = BackgroundProps["bgColor"]
type BgColor = Color
type BorderColor = Color

const BG_COLOR_ID = 400
const BORDER_COLOR_ID = 500

export const getShopColor = (
  colors: ThemeColors,
  shopId?: number,
): [BgColor, BorderColor] => {
  let colorType: Color = "gray"

  switch (shopId) {
    case 1:
      colorType = "red"
      break
    case 2:
      colorType = "blue"
      break
    case 3:
      colorType = "green"
      break
    case 4:
      colorType = "yellow"
      break
    case 5:
      colorType = "purple"
      break
    case 6:
      colorType = "orange"
      break
  }

  const color = colors[colorType as keyof typeof colors]

  return [color[BG_COLOR_ID], color[BORDER_COLOR_ID]]
}
