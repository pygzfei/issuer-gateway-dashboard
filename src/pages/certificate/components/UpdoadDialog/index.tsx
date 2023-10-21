import VisuallyHiddenInput from "@/components/VisuallyHiddenInput"
import { ellipsis } from "@/styles/base"
import CancelRoundedIcon from "@mui/icons-material/CancelRounded"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import Button from "@mui/material/Button/Button"
import Dialog from "@mui/material/Dialog/Dialog"
import DialogActions from "@mui/material/DialogActions/DialogActions"
import DialogContent from "@mui/material/DialogContent/DialogContent"
import FormControl from "@mui/material/FormControl/FormControl"
import IconButton from "@mui/material/IconButton/IconButton"
import Stack from "@mui/material/Stack/Stack"
import useTheme from "@mui/material/styles/useTheme"
import Typography from "@mui/material/Typography/Typography"
import { ChangeEvent, FC, RefObject } from "react"
import { UploadCertificateDataType, useAction } from "./hooks"

interface UploadDialogProps {
  open: boolean
  certId: number
  onClose: () => void
  afterUploadCallback: (success: boolean) => void
}

interface UploadRowProps {
  fileName: string
  defaultFileName: string
  showClearButton: boolean
  inputRef?: RefObject<HTMLInputElement>
  onChangeUploadData: (
    e: ChangeEvent<HTMLInputElement>,
    type: UploadCertificateDataType
  ) => void
  clearCallback?: () => void
}

const UploadRow: FC<UploadRowProps> = ({
  fileName,
  defaultFileName,
  showClearButton,
  inputRef,
  onChangeUploadData,
  clearCallback,
}) => {
  const theme = useTheme()
  return (
    <section
      css={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button variant="outlined" component="label" size="small">
        <CloudUploadIcon fontSize="small" />
        <VisuallyHiddenInput
          ref={inputRef}
          type="file"
          onChange={(e) =>
            onChangeUploadData(e, UploadCertificateDataType.issuerCertificate)
          }
        />
      </Button>
      <Typography
        component="p"
        color={theme.palette.text.disabled}
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: theme.spacing(2),
          ...ellipsis(),
        }}
      >
        {fileName || defaultFileName}
      </Typography>
      {showClearButton && (
        <IconButton
          size="small"
          sx={{ color: theme.palette.text.disabled }}
          onClick={clearCallback}
        >
          <CancelRoundedIcon fontSize="small" />
        </IconButton>
      )}
    </section>
  )
}

export const UploadDialog: FC<UploadDialogProps> = ({
  open,
  certId,
  onClose,
  afterUploadCallback,
}) => {
  const {
    uploadData,
    issuerCertificateInputRef,
    onChangeUploadData,
    clearIssuerCertificate,
    onSubmit,
  } = useAction({
    open,
    certId,
    afterUploadCallback,
  })
  return (
    <Dialog open={open} scroll={"paper"} maxWidth="sm" fullWidth>
      <DialogContent>
        <FormControl fullWidth>
          <Stack spacing={2} component="form">
            <Typography component="p">Upload Certificate:</Typography>
            <UploadRow
              fileName={uploadData.certificate.name}
              defaultFileName="Certificate*"
              showClearButton={false}
              onChangeUploadData={(e) =>
                onChangeUploadData(e, UploadCertificateDataType.certificate)
              }
            />
            <UploadRow
              fileName={uploadData.privateKey.name}
              defaultFileName="Private key*"
              showClearButton={false}
              onChangeUploadData={(e) =>
                onChangeUploadData(e, UploadCertificateDataType.privateKey)
              }
            />
            <UploadRow
              fileName={uploadData.issuerCertificate.name}
              defaultFileName="Issuer certificate"
              showClearButton={!!uploadData.issuerCertificate.value}
              inputRef={issuerCertificateInputRef}
              onChangeUploadData={(e) =>
                onChangeUploadData(
                  e,
                  UploadCertificateDataType.issuerCertificate
                )
              }
              clearCallback={clearIssuerCertificate}
            />
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onSubmit}>
          Confirm
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
