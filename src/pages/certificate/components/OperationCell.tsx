import { Certs } from "@/entity/types"
import EditIcon from "@mui/icons-material/Edit"
import FileUpload from "@mui/icons-material/FileUpload"
import PlaylistAddSharpIcon from "@mui/icons-material/PlaylistAddSharp"
import Refresh from "@mui/icons-material/Refresh"
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton"
import { FC } from "react"
import { OPERATION_ROW_WIDTH } from "../hooks"
import StyledTableCell from "./StyledTableCell"

const OperationCell: FC<{
  cert: Certs
  onApplyCert: (id: number) => Promise<void>
  onOpenEditDrawer: (cert: Certs) => void
}> = ({ cert, onApplyCert, onOpenEditDrawer }) => {
  return (
    <StyledTableCell
      component="th"
      scope="row"
      align="center"
      width={OPERATION_ROW_WIDTH}
      sx={{
        display: "flex",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {cert.expire <= 0 && (
        <LoadingButton
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
          size="small"
          onClick={() => {}}
          endIcon={<Refresh />}
          loading={false}
          loadingPosition="end"
          variant="contained"
        >
          renew
        </LoadingButton>
      )}
      <LoadingButton
        size="small"
        onClick={() => {}}
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
        <p>edit</p>
      </LoadingButton>
    </StyledTableCell>
  )
}

export default OperationCell
