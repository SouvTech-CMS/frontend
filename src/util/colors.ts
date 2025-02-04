import { BackgroundProps, Theme } from "@chakra-ui/react"

type ThemeColors = Theme["colors"]

type Color = BackgroundProps["bgColor"]
type BgColor = Color
type BorderColor = Color

const BG_COLOR_ID = 200
const BORDER_COLOR_ID = 500

export const getColorsForItem = (
  colors: ThemeColors,
  id?: number,
): [BgColor, BorderColor] => {
  let colorType: Color = "gray"

  switch (id) {
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
      colorType = "gray"
      break
    case 7:
      colorType = "orange"
      break
    case 8:
      colorType = "pink"
      break
    case 9:
      colorType = "teal"
      break
    case 10:
      colorType = "cyan"
      break
  }

  const color = colors[colorType as keyof typeof colors]

  return [color[BG_COLOR_ID], color[BORDER_COLOR_ID]]
}
