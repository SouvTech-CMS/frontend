import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react"
import { AxiosError } from "axios"
import { Logo } from "component/Logo"
import { AuthContext } from "context/auth"
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  MouseEvent,
  useContext,
  useState,
} from "react"
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi"
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
    const username = e.target.value.replaceAll(" ", "").trim()
    setUsername(username)
    setIsError(false)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value.replaceAll(" ", "").trim()
    setPassword(password)
    setIsError(false)
  }

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible((prevIsVisible) => !prevIsVisible)
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (username && password && !isError) {
      try {
        await signIn(username, password)

        navigate(fromPage)
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
    <Flex
      h="full"
      w="full"
      bgColor="auth.base"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex h="full" w="50%" justifyContent="center" alignItems="center">
        {/* Sign In Form */}
        <Flex direction="column" gap={5}>
          <Flex w="full" justifyContent="flex-start">
            <Heading size="xl">Sign in</Heading>
          </Flex>

          <Flex direction="column" gap={5}>
            {/* Username Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiUser />
              </InputLeftElement>

              <Input
                type="text"
                placeholder="Login"
                value={username}
                onChange={handleUsernameChange}
                isDisabled={isLoading}
              />
            </InputGroup>

            {/* Password Input */}
            <InputGroup>
              <InputLeftElement color="gray">
                <FiLock />
              </InputLeftElement>

              <Input
                type={passwordInputType}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                isDisabled={isLoading}
              />

              {/* Password Visibility Btn */}
              <InputRightElement>
                <IconButton
                  aria-label="password-visibility"
                  variant="ghost"
                  colorScheme="gray"
                  color="bodyText"
                  icon={passwordVisibilityIcon}
                  onClick={handlePasswordVisibilityChange}
                  isDisabled={isLoading}
                />
              </InputRightElement>
            </InputGroup>

            {/* Sign In Btn */}
            <Button
              w="full"
              size="md"
              colorScheme="blue"
              type="submit"
              onClick={handleSubmit}
              isDisabled={isSubmitBtnDisabled}
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* Logo Card */}
      <Flex
        position="absolute"
        right={0}
        top={0}
        h="full"
        w="50%"
        bgColor="auth.card"
        justifyContent="center"
        alignItems="center"
        pb={20}
        borderBottomLeftRadius="50%"
      >
        <Logo imageSize="sm" textSize="2xl" gap={5} />
      </Flex>
    </Flex>
  )
}
