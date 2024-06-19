// const EMAIL_REGEX = /^\S+@\S+\.\S+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export const isUsernameValid = (username: string) => {
  if (username.length < 5) {
    return false
  }

  return true
}

export const isPasswordValid = (password: string) => {
  if (password.length < 8) {
    return false
  }

  if (!PASSWORD_REGEX.test(password)) {
    return false
  }

  return true
}
