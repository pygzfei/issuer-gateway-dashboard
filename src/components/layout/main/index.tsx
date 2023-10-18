import { EmotionJSX } from "@emotion/react/types/jsx-namespace"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import { FC } from "react"
import { Outlet } from "react-router-dom"
import Drawer from "./components/Drawer"
import DrawerHeader, { DrawerHeaderContainer } from "./components/DrawerHeader"
import SideBar from "./components/SideBar"
import TopBar from "./components/TopBar"

export interface SideBarTag {
  name: string
  path: string
  icon: EmotionJSX.Element
}

export const DRAWER_WIDTH = 240
const tags: SideBarTag[] = [
  {
    name: "Certificate",
    path: "/certificate",
    icon: <InboxIcon />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <InboxIcon />,
  },
]

const MainLayout: FC = () => {
  return (
    <Box display="flex">
      <TopBar />
      <Drawer variant="permanent">
        <DrawerHeader />
        <Divider />
        <SideBar tags={tags} />
      </Drawer>
      <Box component="main" display="flex" flexDirection="column" flexGrow={1}>
        <DrawerHeaderContainer />
        <Box flex={1} p={3} minHeight="100%">
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
