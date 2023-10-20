import { singleLineEllipsis } from "@/styles/base"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { styled, useTheme } from "@mui/material/styles"
import { typographyClasses } from "@mui/material/Typography"
import { FC, memo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SideBarTag } from ".."

const StyledListItemText = styled(ListItemText)(() => ({
  [`.${typographyClasses.root}`]: { ...singleLineEllipsis },
}))

const SideBar: FC<{
  tags: SideBarTag[]
}> = memo(({ tags }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const onSelect = (path: string) => {
    if (path === location.pathname) return
    navigate(path)
  }

  return (
    <List>
      <ListItem disablePadding sx={{ display: "block" }}>
        {tags.map((tag) => (
          <ListItemButton
            onClick={() => onSelect(tag.path)}
            key={tag.path}
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
              backgroundColor:
                location.pathname === tag.path ? theme.palette.grey[200] : "",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
              }}
            >
              {tag.icon}
            </ListItemIcon>
            <StyledListItemText primary={tag.name} />
          </ListItemButton>
        ))}
      </ListItem>
    </List>
  )
})

export default SideBar
