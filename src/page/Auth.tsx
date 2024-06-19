import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react"
import { AxiosError } from "axios"
import { AuthContext } from "context/auth"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { notify } from "util/toasts"

export const Auth = () => {
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isSubmitBtnDisabled = !username || !password || isError || isLoading

  const fromPage =
    (location.state as { from: { pathname: string } })?.from?.pathname || "/"

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value.trim()
    setUsername(username)
    setIsError(false)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value.trim()
    setPassword(password)
    setIsError(false)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (username && password && !isError) {
      try {
        await signIn(username, password)

        navigate(fromPage, { replace: true })
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 401) {
            notify("Неправильный логин или пароль", "error")
          }
        }

        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Flex h="full" w="full" bgColor="gray.200" justify="center" align="center">
      <Card borderRadius={30} w="xl">
        <Flex
          direction="column"
          justify="center"
          align="center"
          p={10}
          gap={10}
        >
          <Flex direction="column" alignItems="center" gap={10}>
            {/* TODO: add logo image here */}

            <Text textAlign="center" fontSize="2xl" fontWeight="bold">
              Авторизация
            </Text>
          </Flex>

          <form
            onSubmit={handleSubmit}
            style={{ height: "100%", width: "100%" }}
          >
            <Flex direction="column" gap={5}>
              {/* Username input */}
              <FormControl>
                <FormLabel>Логин</FormLabel>
                <Input
                  type="text"
                  placeholder="Введите Ваш логин"
                  value={username}
                  onChange={handleUsernameChange}
                  isDisabled={isLoading}
                />
              </FormControl>

              {/* Password input */}
              <FormControl>
                <FormLabel>Пароль</FormLabel>
                <Input
                  type="password"
                  placeholder="Введите Ваш пароль"
                  value={password}
                  onChange={handlePasswordChange}
                  isDisabled={isLoading}
                />
              </FormControl>

              <Button
                w="full"
                size="md"
                colorScheme="blue"
                type="submit"
                isDisabled={isSubmitBtnDisabled}
                isLoading={isLoading}
              >
                Войти
              </Button>
            </Flex>
          </form>
        </Flex>
      </Card>
    </Flex>
  )
}
