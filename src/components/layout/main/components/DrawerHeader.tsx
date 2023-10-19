import { styled } from "@mui/material/styles"
import { FC, memo } from "react"

export const DrawerHeaderContainer = memo(
  styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below top bar
    ...theme.mixins.toolbar,
  }))
)

const DrawerHeader: FC = () => <DrawerHeaderContainer></DrawerHeaderContainer>

export default DrawerHeader
