import { Text } from "@chakra-ui/react"
import { AxiosError } from "axios"
import { Bounce, ToastOptions, toast } from "react-toastify"

const toastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  transition: Bounce,
  closeButton: true,
}

export const notify = (text: string, type: "error" | "success") => {
  const content = <Text fontWeight="bold">{text}</Text>

  switch (type) {
    case "error":
      toast.error(content, toastOptions)
      break
    case "success":
      toast.success(content, toastOptions)
      break
    default:
      toast(content, toastOptions)
      break
  }
}

export const notifyApiError = (error: AxiosError) => {
  const responseData = error.response?.data as { detail?: string }

  if (responseData?.detail) {
    notify(responseData.detail, "error")
  }
}
