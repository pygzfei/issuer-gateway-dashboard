import DrawerHeader from "@/components/layout/main/components/DrawerHeader"
import { Certs } from "@/entity/types"
import { formatDateTime } from "@/utils/time"
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton"
import Box from "@mui/material/Box/Box"
import Drawer from "@mui/material/Drawer/Drawer"
import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography/Typography"
import { ChangeEvent, FC, useMemo } from "react"
import { ProtocolType } from "../hooks"

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
  startAdornment?: string
  onchange?: (e: ChangeEvent<HTMLInputElement>) => void
}> = ({ name, value = "", disabled, startAdornment, onchange }) => {
  return (
    <section>
      <Typography component="p">{name}</Typography>
      <OutlinedInput
        startAdornment={
          startAdornment && (
            <InputAdornment position="start" sx={{ mr: "10px" }}>
              {startAdornment}
            </InputAdornment>
          )
        }
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
  const targetProtocolType = useMemo(() => {
    return cert?.target.includes(ProtocolType.http)
      ? ProtocolType.http
      : ProtocolType.https
  }, [cert?.target])
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
            startAdornment={targetProtocolType}
            onchange={onChangeTarget}
          />
          <DrawerItem
            name="Create Time:"
            disabled
            value={formatDateTime(cert?.created_at ?? 0 * 1000, "yyyy-MM-dd")}
          />

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
