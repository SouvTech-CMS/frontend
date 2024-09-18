import { ReactNode } from "react"

export type SelectOption = {
  value: number
  label: string | ReactNode
}

export type SelectStringOption = {
  value: string
  label: string | ReactNode
}
