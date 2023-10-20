import DrawerHeader from "@/components/layout/main/components/DrawerHeader"
import { Certs } from "@/entity/types"
import { formatDateTime } from "@/utils/time"
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton"
import Box from "@mui/material/Box/Box"
import Drawer from "@mui/material/Drawer/Drawer"
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography/Typography"
import { ChangeEvent, FC } from "react"

interface EditDrawerProps {
  cert: Certs | null
  open: boolean
  onChangeTarget: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: ({ id, target }: { id?: number; target?: string }) => Promise<void>
  onClose: () => void
}

const DrawerItem: FC<{
  name: string
  value?: string
  disabled?: boolean
  onchange?: (e: ChangeEvent<HTMLInputElement>) => void
}> = ({ name, value = "", disabled, onchange }) => {
  return (
    <section>
      <Typography component="p">{name}</Typography>
      <OutlinedInput
        value={value}
        placeholder="Domain"
        fullWidth
        disabled={disabled}
        onChange={onchange}
      />
    </section>
  )
}

const EditDrawer: FC<EditDrawerProps> = ({
  cert,
  open,
  onChangeTarget,
  onSubmit,
  onClose,
}) => {
  const theme = useTheme()
  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <DrawerHeader />
        <Box
          minWidth="350px"
          height="100%"
          padding={theme.spacing(2)}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <DrawerItem name="Domain:" value={cert?.domain} disabled />
          <DrawerItem
            name="Server:"
            value={cert?.target}
            onchange={onChangeTarget}
          />
          <DrawerItem
            name="Create Time:"
            disabled
            value={formatDateTime(cert?.created_at ?? 0 * 1000, "yyyy-MM-dd")}
          />
          {!!cert?.expire && (
            <DrawerItem
              name="Expired On:"
              disabled
              value={formatDateTime(cert?.expire ?? 0 * 1000, "yyyy-MM-dd")}
            />
          )}

          <LoadingButton
            size="small"
            onClick={() => onSubmit({ id: cert?.id, target: cert?.target })}
            loading={false}
            variant="contained"
          >
            submit
          </LoadingButton>
        </Box>
      </Drawer>
    </>
  )
}

export default EditDrawer
