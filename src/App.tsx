import { HashRouter } from "react-router-dom"
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
          <RenderRoutes />
        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App
