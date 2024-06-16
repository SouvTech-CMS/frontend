import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react"
import { PASSWORD_REGEX } from "constant/validations"
import { AuthContext } from "context/auth"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const Auth = () => {
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [usernameError, setUsernameError] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>()
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isSubmitBtnDisabled = !username || !password || isError || isLoading

  const fromPage =
    (location.state as { from: { pathname: string } })?.from?.pathname || "/"

  const validateUsername = (username: string) => {
    if (username.length < 5) {
      setUsernameError("Логин должен содержать минимум 5 символов")
      setIsError(true)
      return
    }

    setUsernameError("")
    setIsError(false)
  }

  const validatePassword = (password: string) => {
    if (password.length < 5) {
      setPasswordError("Пароль должен содержать минимум 8 символов")
      setIsError(true)
      return
    }

    if (!PASSWORD_REGEX.test(password)) {
      setPasswordError("Пароль должен содержать буквы разных регистров и цифры")
      setIsError(true)
      return
    }

    setPasswordError("")
    setIsError(false)
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value.trim()

    validateUsername(username)
    setUsername(username)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value.trim()

    validatePassword(password)
    setPassword(password)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (username && password && !isError) {
      try {
        await signIn(username, password)

        navigate(fromPage, { replace: true })
      } catch (e) {
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
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Введите Ваш логин"
                  value={username}
                  onChange={handleUsernameChange}
                  isDisabled={isLoading}
                />
                {usernameError && <Text color="red">{usernameError}</Text>}
              </FormControl>

              {/* Password input */}
              <FormControl id="password">
                <FormLabel>Пароль</FormLabel>
                <Input
                  type="password"
                  placeholder="Введите Ваш пароль"
                  value={password}
                  onChange={handlePasswordChange}
                  isDisabled={isLoading}
                />
                {passwordError && <Text color="red">{passwordError}</Text>}
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
