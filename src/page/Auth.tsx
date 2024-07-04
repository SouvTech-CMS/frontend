import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react"
import { AxiosError } from "axios"
import { AuthContext } from "context/auth"
import {
  ChangeEvent,
  FormEvent,
  HTMLInputTypeAttribute,
  useContext,
  useState,
} from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import { notify } from "util/toasts"

export const Auth = () => {
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const passwordInputType: HTMLInputTypeAttribute = isPasswordVisible
    ? "text"
    : "password"
  const passwordVisibilityIcon = isPasswordVisible ? <FiEyeOff /> : <FiEye />
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

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible((prevIsVisible) => !prevIsVisible)
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
            notify("Wrong login or password", "error")
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
              Sign in
            </Text>
          </Flex>

          <form
            onSubmit={handleSubmit}
            style={{ height: "100%", width: "100%" }}
          >
            <Flex direction="column" gap={5}>
              {/* Username Input */}
              <FormControl>
                <FormLabel>Login</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter login"
                  value={username}
                  onChange={handleUsernameChange}
                  isDisabled={isLoading}
                />
              </FormControl>

              {/* Password Input */}
              <FormControl>
                <FormLabel>Password</FormLabel>

                <InputGroup>
                  <Input
                    type={passwordInputType}
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    isDisabled={isLoading}
                  />

                  <InputRightElement>
                    <IconButton
                      aria-label="password-visibility"
                      variant="ghost"
                      colorScheme="gray"
                      icon={passwordVisibilityIcon}
                      onClick={handlePasswordVisibilityChange}
                      isDisabled={isLoading}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Sign In Btn */}
              <Button
                w="full"
                size="md"
                colorScheme="blue"
                type="submit"
                isDisabled={isSubmitBtnDisabled}
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </Flex>
          </form>
        </Flex>
      </Card>
    </Flex>
  )
}
