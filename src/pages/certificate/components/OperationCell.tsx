import { Certs } from "@/entity/types"
import EditIcon from "@mui/icons-material/Edit"
import FileUpload from "@mui/icons-material/FileUpload"
import PlaylistAddSharpIcon from "@mui/icons-material/PlaylistAddSharp"
import Refresh from "@mui/icons-material/Refresh"
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton"
import { useTheme } from "@mui/material/styles"
import { FC } from "react"
import { OPERATION_ROW_WIDTH } from "../hooks"
import StyledTableCell from "./StyledTableCell"

const OperationCell: FC<{
  cert: Certs
  onApplyCert: (id: number) => Promise<void>
  onRenewCert: (id: number) => Promise<void>
  onOpenUploadDialog: (id: number) => void
  onOpenEditDrawer: (cert: Certs) => void
}> = ({
  cert,
  onApplyCert,
  onRenewCert,
  onOpenUploadDialog,
  onOpenEditDrawer,
}) => {
  const theme = useTheme()
  return (
    <StyledTableCell
      component="th"
      scope="row"
      align="center"
      width={OPERATION_ROW_WIDTH}
    >
      <div
        css={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(2),
        }}
      >
        {cert.expire <= 0 && (
          <LoadingButton
            sx={{ minWidth: theme.spacing(12) }}
            size="small"
            onClick={() => onApplyCert(cert.id)}
            endIcon={<PlaylistAddSharpIcon />}
            loading={false}
            loadingPosition="end"
            variant="contained"
          >
            apply
          </LoadingButton>
        )}
        {cert.expire > 0 && (
          <LoadingButton
            sx={{ minWidth: theme.spacing(12) }}
            size="small"
            onClick={() => onRenewCert(cert.id)}
            endIcon={<Refresh />}
            loading={false}
            loadingPosition="end"
            variant="contained"
          >
            renew
          </LoadingButton>
        )}
        <LoadingButton
          sx={{ minWidth: theme.spacing(12) }}
          size="small"
          onClick={() => onOpenUploadDialog(cert.id)}
          endIcon={<FileUpload />}
          loading={false}
          loadingPosition="end"
          variant="contained"
        >
          upload
        </LoadingButton>
        <LoadingButton
          size="small"
          onClick={() => onOpenEditDrawer(cert)}
          endIcon={<EditIcon />}
          loading={false}
          loadingPosition="end"
          variant="contained"
        >
          edit
        </LoadingButton>
      </div>
    </StyledTableCell>
  )
}

export default OperationCell
