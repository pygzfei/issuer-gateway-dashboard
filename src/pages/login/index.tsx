import Grid from "@mui/material/Grid"
import { FC } from "react"
import { LoginBoxWithSecret } from "./components/LoginBoxWithSecret"
import LoginRouterGuard from "./components/LoginRouterGuard"

const Login: FC = () => {
  return (
    <LoginRouterGuard>
      <Grid container minHeight="100vh">
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            minHeight="100%"
            p={10}
          >
            {/* <LoginBox /> */}
            <LoginBoxWithSecret />
          </Grid>
        </Grid>
      </Grid>
    </LoginRouterGuard>
  )
}

export default Login
