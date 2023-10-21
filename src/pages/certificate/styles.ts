import { ellipsis } from "@/styles/base"
import { CSSObject } from "@emotion/react"
import { CSSProperties } from "react"

export const domainCell: CSSObject = {
  ...ellipsis(),
  width: "fit-content",
  maxWidth: "100%",
}

export const helpTextStyles: CSSProperties = {
  marginTop: 0,
}
