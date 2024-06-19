import { Text } from "@chakra-ui/react"
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
  switch (type) {
    case "error":
      toast.error(<Text fontWeight="bold">{text}</Text>, toastOptions)
      break
    case "success":
      toast.success(<Text fontWeight="bold">{text}</Text>, toastOptions)
      break
    default:
      toast(<Text fontWeight="bold">{text}</Text>, toastOptions)
      break
  }
}
