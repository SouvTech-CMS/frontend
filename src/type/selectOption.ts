import { ReactNode } from "react"

export type SelectOption = {
  value: number
  label: string | ReactNode
}

export type SelectStringOption<T = string> = {
  value: T
  label: T | ReactNode
}
