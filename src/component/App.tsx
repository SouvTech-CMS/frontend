import { ChakraProvider } from "@chakra-ui/react"
import { AppRouter } from "component/Router"

export const App = () => {
  return (
    <ChakraProvider>
      <AppRouter />
    </ChakraProvider>
  )
}
