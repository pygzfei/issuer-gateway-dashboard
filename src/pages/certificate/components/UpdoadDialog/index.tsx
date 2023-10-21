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
import { FC } from "react"
import { UploadCertificateDataType, useAction } from "./hooks"

interface UploadDialogProps {
  open: boolean
  certId: number
  onClose: () => void
  afterUploadCallback: (success: boolean) => void
}

export const UploadDialog: FC<UploadDialogProps> = ({
  open,
  certId,
  onClose,
  afterUploadCallback,
}) => {
  const theme = useTheme()
  const { uploadData, onChangeUploadData, clearIssuerCertificate, onSubmit } =
    useAction({
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
            <section
              css={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button variant="outlined" component="label" size="small">
                <CloudUploadIcon fontSize="small" />
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) =>
                    onChangeUploadData(e, UploadCertificateDataType.certificate)
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
                {uploadData.certificate.name || "Certificate*"}
              </Typography>
            </section>

            <section css={{ display: "flex" }}>
              <Button variant="outlined" component="label" size="small">
                <CloudUploadIcon fontSize="small" />
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) =>
                    onChangeUploadData(e, UploadCertificateDataType.privateKey)
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
                {uploadData.privateKey.name || "Private key*"}
              </Typography>
            </section>

            <section
              css={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button variant="outlined" component="label" size="small">
                <CloudUploadIcon fontSize="small" />
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) =>
                    onChangeUploadData(
                      e,
                      UploadCertificateDataType.issuerCertificate
                    )
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
                {uploadData.issuerCertificate.name || "Issuer certificate"}
              </Typography>
              {!!uploadData.issuerCertificate.value && (
                <IconButton
                  size="small"
                  sx={{ color: theme.palette.text.disabled }}
                  onClick={clearIssuerCertificate}
                >
                  <CancelRoundedIcon fontSize="small" />
                </IconButton>
              )}
            </section>
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSubmit}>
          Confirm
        </Button>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
