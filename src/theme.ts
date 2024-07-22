import {
  theme as baseTheme,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react"
import "@fontsource-variable/dm-sans"

export const appTheme = extendTheme({
  colors: {
    bodyText: "#1B254B",
    sidebar: baseTheme.colors.white,
    appLayout: baseTheme.colors.gray["100"],
    thinBorder: baseTheme.colors.gray["200"],
    auth: {
      base: baseTheme.colors.white,
      card: baseTheme.colors.gray["200"],
    },
  },
  fonts: {
    body: "DM Sans Variable",
    heading: "DM Sans Variable",
  },
  sizes: {
    logo: {
      xs: "25%",
      sm: "35%",
      md: "50%",
      lg: "100%",
    },
  },
  shadows: {
    base: "none",
  },
  styles: {
    global: {
      div: {
        color: "bodyText",
      },
    },
  },
  components: {
    Button: defineStyleConfig({
      variants: {
        active: {
          bgColor: "bodyText",
          color: baseTheme.colors.white,
          _hover: {
            bgColor: baseTheme.colors.gray["300"],
            color: "bodyText",
          },
        },
      },
      defaultProps: {
        variant: "active",
      },
    }),
  },
})
