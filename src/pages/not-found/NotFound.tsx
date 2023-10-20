import notFoundImage from "@/assets/images/404.jpg"
import Box from "@mui/material/Box/Box"
import Stack from "@mui/material/Stack/Stack"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography/Typography"
import Grid from "@mui/system/Unstable_Grid"
import { FC } from "react"
import { Link } from "react-router-dom"
import * as styles from "./styles"

const NotFound: FC = () => {
  const theme = useTheme()
  return (
    <Grid container minHeight="100vh">
      <Stack
        alignItems="center"
        mt={theme.spacing(5)}
        gap={theme.spacing(2)}
        width="100%"
      >
        <Typography component="h1" variant="h1">
          404 not found...
        </Typography>
        <Box css={styles.imgWrapper}>
          <img
            src={notFoundImage}
            alt="Page not found..."
            css={styles.notFoundImage}
          />
        </Box>
        <Link to="/" replace css={styles.goBackButton}>
          Go Back
        </Link>
      </Stack>
    </Grid>
  )
}

export default NotFound
