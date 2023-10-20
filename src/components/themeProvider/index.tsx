import { createTheme, ThemeProvider } from "@mui/material/styles"
import { FC, ReactNode } from "react"

const theme = createTheme({
  palette: {
    success: {
      main: "#29c840",
    },
    warning: {
      main: "#febc2f",
    },
    error: {
      main: "#ff5f57",
    },
  },
})

const CustomThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default CustomThemeProvider
