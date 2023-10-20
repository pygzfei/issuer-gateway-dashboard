import PlaylistAddSharpIcon from "@mui/icons-material/PlaylistAddSharp"
import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box/Box"
import Typography from "@mui/material/Typography/Typography"
import { FC } from "react"
import BindingDomainDialog from "./components/BindingDomainDialog"
import DataTable from "./components/DataTable"
import EditDrawer from "./components/EditDrawer"
import PaginationBar from "./components/Pagination"
import { useAction, useBindDomain, useEditDomain } from "./hooks"

const Certificate: FC = () => {
  const {
    certsData,
    finishInit,
    currentPage,
    totalPage,
    getCertsList,
    onPageChange,
    onApplyCert,
    onRenewCert,
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

  const {
    openEditDrawer,
    currentEditCert,
    onOpenEditDrawer,
    onChangeTarget,
    onCancel,
    onSubmit: onSubmitEditDomain,
  } = useEditDomain({
    getCertsList,
  })

  return (
    <Box display="flex" flexDirection="column" flex={1}>
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
        onRenewCert={onRenewCert}
        onOpenEditDrawer={onOpenEditDrawer}
      />
      {!!totalPage && (
        <PaginationBar
          currentPage={currentPage.current}
          totalPage={totalPage}
          onPageChange={onPageChange}
        />
      )}

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

      <EditDrawer
        cert={currentEditCert}
        open={openEditDrawer}
        onChangeTarget={onChangeTarget}
        onSubmit={onSubmitEditDomain}
        onClose={onCancel}
      />
    </Box>
  )
}

export default Certificate
