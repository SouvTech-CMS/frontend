import { axiosClient } from "api/axiosClient"
import { AuthToken } from "type/auth"

export const signIn = async (
  username: string,
  password: string
): Promise<AuthToken> => {
  const { data: token } = await axiosClient.postForm("/auth/sign_in", {
    username,
    password,
  })
  return token
}
