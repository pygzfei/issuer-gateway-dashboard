import VisuallyHiddenInput from "@/components/VisuallyHiddenInput"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import Button from "@mui/material/Button/Button"
import Dialog from "@mui/material/Dialog/Dialog"
import DialogActions from "@mui/material/DialogActions/DialogActions"
import DialogContent from "@mui/material/DialogContent/DialogContent"
import FormControl from "@mui/material/FormControl/FormControl"
import FormHelperText from "@mui/material/FormHelperText/FormHelperText"
import Stack from "@mui/material/Stack/Stack"
import useTheme from "@mui/material/styles/useTheme"
import TextField from "@mui/material/TextField/TextField"
import Typography from "@mui/material/Typography/Typography"
import { FC } from "react"
import * as styles from "../../styles"
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
  const { uploadData, onChangeUploadData, onSubmit } = useAction({
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
            <section css={{ display: "flex", gap: theme.spacing(2) }}>
              <TextField
                value={uploadData.certificate.name}
                label="Certificate"
                variant="outlined"
                fullWidth
                required
                disabled
              />
              <Button variant="contained" component="label">
                <CloudUploadIcon />
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) =>
                    onChangeUploadData(e, UploadCertificateDataType.certificate)
                  }
                />
              </Button>
            </section>
            {false && (
              <FormHelperText style={styles.helpTextStyles} error>
                *certificate necessary
              </FormHelperText>
            )}

            <section css={{ display: "flex", gap: theme.spacing(2) }}>
              <TextField
                value={uploadData.privateKey.name}
                label="Private key"
                variant="outlined"
                fullWidth
                required
                disabled
              />
              <Button variant="contained" component="label">
                <CloudUploadIcon />
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) =>
                    onChangeUploadData(e, UploadCertificateDataType.privateKey)
                  }
                />
              </Button>
            </section>

            {false && (
              <FormHelperText style={styles.helpTextStyles} error>
                *private key necessary
              </FormHelperText>
            )}

            <section css={{ display: "flex", gap: theme.spacing(2) }}>
              <TextField
                value={uploadData.issuerCertificate.name}
                label="Issuer Certificate"
                variant="outlined"
                fullWidth
                disabled
              />
              <Button variant="contained" component="label">
                <CloudUploadIcon />
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
            </section>
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>Confirm</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
