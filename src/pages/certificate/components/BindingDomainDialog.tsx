import Button from "@mui/material/Button/Button"
import Dialog from "@mui/material/Dialog/Dialog"
import DialogActions from "@mui/material/DialogActions/DialogActions"
import DialogContent from "@mui/material/DialogContent/DialogContent"
import FormControl from "@mui/material/FormControl/FormControl"
import FormHelperText from "@mui/material/FormHelperText/FormHelperText"
import Grid from "@mui/material/Grid/Grid"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select/Select"
import Stack from "@mui/material/Stack/Stack"
import TextField from "@mui/material/TextField/TextField"
import Typography from "@mui/material/Typography/Typography"
import { ChangeEvent, FC } from "react"
import { ProtocolType, ValidStatus } from "../hooks"
import * as styles from "../styles"

const BindingDomainDialog: FC<{
  open: boolean
  validStatus: ValidStatus
  currentProtocol: ProtocolType
  handleDomain: (e: ChangeEvent<HTMLInputElement>) => void
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void
  handleTarget: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeProtocol: (e: SelectChangeEvent<ProtocolType>) => void
  onConfirm: () => void
  onClose: () => void
}> = ({
  open,
  validStatus,
  currentProtocol,
  handleDomain,
  handleEmail,
  handleTarget,
  onChangeProtocol,
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog open={open} scroll={"paper"} maxWidth="sm" fullWidth>
      <DialogContent>
        <FormControl fullWidth>
          <Stack spacing={2} component="form">
            <Typography component="p">Add Domain:</Typography>
            <TextField
              label="Domain"
              variant="outlined"
              fullWidth
              required
              onChange={handleDomain}
            />
            {validStatus.domainError && (
              <FormHelperText style={styles.helpTextStyles} error>
                *Domain error
              </FormHelperText>
            )}

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              onChange={handleEmail}
            />

            {validStatus.emailError && (
              <FormHelperText style={styles.helpTextStyles} error>
                *Email error
              </FormHelperText>
            )}
            <Grid container display={"flex"} gap={2} flexWrap="nowrap">
              <Grid item>
                <Select value={currentProtocol} onChange={onChangeProtocol}>
                  <MenuItem value={ProtocolType.http}>http://</MenuItem>
                  <MenuItem value={ProtocolType.https}>https://</MenuItem>
                </Select>
              </Grid>
              <Grid item width={"100%"}>
                <TextField
                  label="Target"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleTarget}
                />
              </Grid>
            </Grid>

            {validStatus.targetError && (
              <FormHelperText style={styles.helpTextStyles} error>
                *Target error
              </FormHelperText>
            )}
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default BindingDomainDialog
