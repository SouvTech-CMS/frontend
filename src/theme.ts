import {
  theme as baseTheme,
  defineStyleConfig,
  extendTheme,
  Theme,
  useTheme,
} from "@chakra-ui/react"

import "@fontsource-variable/dm-sans"

export const appTheme = extendTheme({
  colors: {
    // bodyText: "#1B254B",
    bodyText: "#1D3557",
    hint: baseTheme.colors.gray["400"],
    sidebar: baseTheme.colors.white,
    appLayout: baseTheme.colors.gray["100"],
    thinBorder: baseTheme.colors.gray["200"],
    auth: {
      base: baseTheme.colors.white,
      card: baseTheme.colors.gray["200"],
    },
    modal: {
      base: baseTheme.colors.gray["100"],
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
      "div, p, h1, h2, h3, h4, h5, h6": {
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
            bgColor: baseTheme.colors.blue["800"],
            color: baseTheme.colors.white,
            _disabled: {
              bgColor: baseTheme.colors.gray["400"],
              color: "bodyText",
            },
          },
          _disabled: {
            bgColor: "bodyText",
            color: baseTheme.colors.white,
          },
        },
        secondary: {
          bgColor: baseTheme.colors.gray["200"],
          color: "bodyText",
          _hover: {
            bgColor: baseTheme.colors.gray["300"],
            color: "bodyText",
          },
        },
        success: {
          bgColor: baseTheme.colors.green["500"],
          color: baseTheme.colors.white,
          _hover: {
            bgColor: baseTheme.colors.green["600"],
            color: baseTheme.colors.white,
          },
        },
        warning: {
          bgColor: baseTheme.colors.yellow["500"],
          color: baseTheme.colors.white,
          _hover: {
            bgColor: baseTheme.colors.yellow["600"],
            color: baseTheme.colors.white,
          },
        },
        danger: {
          bgColor: baseTheme.colors.red["500"],
          color: baseTheme.colors.white,
          _hover: {
            bgColor: baseTheme.colors.red["600"],
            color: baseTheme.colors.white,
          },
        },
        newCard: {
          bgColor: baseTheme.colors.white,
          _hover: {
            bgColor: baseTheme.colors.gray["300"],
          },
        },
      },
      defaultProps: {
        variant: "active",
      },
    }),
  },
})

export const useCustomTheme = (): Theme => {
  const theme = useTheme() as Theme
  return theme
}
