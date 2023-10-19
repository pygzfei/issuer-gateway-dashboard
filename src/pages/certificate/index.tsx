import PlaylistAddSharpIcon from "@mui/icons-material/PlaylistAddSharp"
import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box/Box"
import Typography from "@mui/material/Typography/Typography"
import { FC } from "react"
import BindingDomainDialog from "./components/BindingDomainDialog"
import DataTable from "./components/DataTable"
import DeleteDialog from "./components/DeleteDialog"
import Pagination from "./components/Pagination"
import { useAction, useBindDomain } from "./hooks"

const Certificate: FC = () => {
  const {
    certsData,
    finishInit,
    currentPage,
    openDeleteDialog,
    deleteDialogData,
    getCertsList,
    onDeleteItem,
    onConfirmDelete,
    onCancelDelete,
    onPageChange,
    onApplyCert,
  } = useAction()

  const {
    openBindingDialog,
    validStatus,
    targetCurrentProtocol,
    onOpenBindingDialog,
    handleEmail,
    handleDomain,
    handleTarget,
    onChangeProtocol,
    onSubmit,
    onClose,
  } = useBindDomain({ getCertsList })

  return (
    <Box minHeight="100%" display="flex" flexDirection="column">
      <Typography
        mb={1.5}
        display="flex"
        justifyContent="flex-end"
        component="div"
      >
        <LoadingButton
          size="small"
          onClick={onOpenBindingDialog}
          endIcon={<PlaylistAddSharpIcon />}
          loading={false}
          loadingPosition="end"
          variant="contained"
        >
          Add Domain
        </LoadingButton>
      </Typography>
      <DataTable
        finishInit={finishInit}
        certsList={certsData.certsList}
        total={certsData.total}
        onApplyCert={onApplyCert}
        onDeleteItem={onDeleteItem}
      />
      <Pagination
        page={currentPage.current}
        total={certsData.total}
        onPageChange={onPageChange}
      />

      <BindingDomainDialog
        open={openBindingDialog}
        validStatus={validStatus}
        currentProtocol={targetCurrentProtocol}
        handleEmail={handleEmail}
        handleDomain={handleDomain}
        handleTarget={handleTarget}
        onConfirm={onSubmit}
        onChangeProtocol={onChangeProtocol}
        onClose={onClose}
      />
      <DeleteDialog
        open={openDeleteDialog}
        title={deleteDialogData.current.title}
        content={deleteDialogData.current.content}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </Box>
  )
}

export default Certificate
