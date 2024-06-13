import { Button, Card, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import { configuration } from "configuration"
import { EMAIL_REGEX, PASSWORD_REGEX } from "constant/validations"
import { AuthContext } from "context/auth"
import { ChangeEvent, FormEvent, useContext, useState } from "react"

export const Auth = () => {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [emailError, setEmailError] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>()
  const [isError, setIsError] = useState<boolean>(false)

  const isSubmitBtnDisabled = !email || !password || isError

  const validateEmail = (email: string) => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Введите корректный email")
      setIsError(true)
      return
    }

    setEmailError("")
    setIsError(false)
  }

  const validatePassword = (password: string) => {
    if (!configuration.isDevEnv) {
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
    }

    setPasswordError("")
    setIsError(false)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value

    if (email) {
      validateEmail(email)
      setEmail(email)
    }
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value

    if (password) {
      validatePassword(password)
      setPassword(password)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isError) {
      signIn()
    }
  }

  return (
    <Flex h="full" w="full" bgColor="gray.200" justify="center" align="center">
      <Card borderRadius={30} w="xl">
        <Flex direction="column" justify="center" align="center" p={10} gap={10}>
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            Авторизация
          </Text>

          <form onSubmit={handleSubmit} style={{ height: "100%", width: "100%" }}>
            <Flex direction="column" gap={5}>
              {/* Email input */}
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Введите Ваш email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && <Text color="red">{emailError}</Text>}
              </FormControl>

              {/* Password input */}
              <FormControl id="password">
                <FormLabel>Пароль</FormLabel>
                <Input
                  type="password"
                  placeholder="Введите Ваш пароль"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && <Text color="red">{passwordError}</Text>}
              </FormControl>

              <Button
                w="full"
                size="md"
                colorScheme="blue"
                type="submit"
                disabled={isSubmitBtnDisabled}
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
