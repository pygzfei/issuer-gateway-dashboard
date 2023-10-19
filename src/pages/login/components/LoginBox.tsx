import Button from "@mui/material/Button/Button"
import FormControl from "@mui/material/FormControl/FormControl"
import FormHelperText from "@mui/material/FormHelperText/FormHelperText"
import Grid from "@mui/material/Grid/Grid"
import Stack from "@mui/material/Stack/Stack"
import TextField from "@mui/material/TextField/TextField"
import { FC } from "react"
import { useLogIn } from "../hooks"
import { helpTextStyles, loginBoxStyles } from "../styles"

export const LoginBox: FC = () => {
  const { showHelpText, onLogin, onChangeAccount, onChangePassword } =
    useLogIn()
  return (
    <>
      <Stack spacing={2} sx={loginBoxStyles}>
        <Grid item component="p" textAlign="center">
          Sign In
        </Grid>
        <FormControl sx={{ mt: 10 }}>
          <Stack spacing={2} component="form">
            <TextField label="Account" type="text" onChange={onChangeAccount} />
            <TextField
              label="Password"
              type="password"
              onChange={onChangePassword}
            />
            {showHelpText && (
              <FormHelperText style={helpTextStyles} error>
                *Enter your account and password
              </FormHelperText>
            )}
            <Button variant="contained" onClick={onLogin}>
              Sign In
            </Button>
          </Stack>
        </FormControl>
      </Stack>
    </>
  )
}
