import { HashRouter } from "react-router-dom"
import CustomThemeProvider from "./components/themeProvider"
import GlobalToast from "./components/toast/index"
import { AuthProvider } from "./context/authProvider"
import RenderRoutes from "./router"
import { ResetCss } from "./styles/ResetCss"

function App() {
  return (
    <>
      <ResetCss />
      <GlobalToast />
      <HashRouter>
        <AuthProvider>
          <CustomThemeProvider>
            <RenderRoutes />
          </CustomThemeProvider>
        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App
