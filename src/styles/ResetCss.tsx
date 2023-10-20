import { css, Global } from "@emotion/react"
import { FC } from "react"
import normalizeCss from "./normalize"

export const ResetCss: FC = () => {
  return (
    <Global
      styles={css`
        ${normalizeCss.styles}
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        html,
        body,
        #root {
          min-height: 100vh;
          min-width: 1300px;
        }
      `}
    />
  )
}
