import { Certs } from "@/entity/types"
import { formatDateTime } from "@/utils/time"
import CircleIcon from "@mui/icons-material/Circle"
import Paper from "@mui/material/Paper/Paper"
import { useTheme } from "@mui/material/styles"
import Table from "@mui/material/Table/Table"
import TableBody from "@mui/material/TableBody/TableBody"
import TableContainer from "@mui/material/TableContainer/TableContainer"
import TableHead from "@mui/material/TableHead/TableHead"
import TableRow from "@mui/material/TableRow/TableRow"
import Tooltip from "@mui/material/Tooltip/Tooltip"
import { FC, useMemo } from "react"
import { DOMAIN_ROW_MAX_WIDTH, tableCellConfig } from "../hooks"
import * as styles from "../styles"
import OperationCell from "./OperationCell"
import StyledTableCell from "./StyledTableCell"
import StyledTableRow from "./StyledTableRow"
import TableSkeleton from "./TableSkeleton"

const StatusSign: FC<{ expire: number }> = ({ expire }) => {
  const theme = useTheme()
  const signInfo = useMemo(() => {
    const timestamp = expire * 1000
    const now = Date.now()
    const leftDay = Math.ceil((timestamp - now) / (24 * 60 * 60 * 1000))
    if (!timestamp) {
      return {
        message: "No certificate",
        color: theme.palette.text.disabled,
      }
    }
    if (timestamp < now) {
      return {
        message: "certificate expired",
        color: theme.palette.error.main,
      }
    }
    if (timestamp - now <= 10 * 24 * 60 * 60 * 1000) {
      return {
        message: `certificate will be expired in ${leftDay} day(s)`,
        color: theme.palette.warning.main,
      }
    }
    return {
      message: "Normal",
      color: theme.palette.success.main,
    }
  }, [
    expire,
    theme.palette.error.main,
    theme.palette.success.main,
    theme.palette.text.disabled,
    theme.palette.warning.main,
  ])

  return (
    <Tooltip title={signInfo.message} placement="top-start">
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircleIcon sx={{ fontSize: "16px", color: signInfo.color }} />
      </div>
    </Tooltip>
  )
}

const DataTableBody: FC<{
  finishInit: boolean
  certsList: Certs[]
  total: number
  onApplyCert: (id: number) => Promise<void>
  onRenewCert: (id: number) => Promise<void>
  onOpenEditDrawer: (cert: Certs) => void
}> = ({
  finishInit,
  certsList,
  total,
  onApplyCert,
  onRenewCert,
  onOpenEditDrawer,
}) => {
  if (!finishInit) {
    return <TableSkeleton />
  }
  return (
    <TableBody>
      {total ? (
        certsList.map((cert) => (
          <StyledTableRow key={cert.id}>
            <StyledTableCell
              component="th"
              scope="row"
              sx={{ maxWidth: DOMAIN_ROW_MAX_WIDTH, overflow: "hidden" }}
            >
              <Tooltip title={cert.domain} placement="top-start">
                <p css={styles.domainCell}>{cert.domain}</p>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" align="left">
              {cert.target}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" align="center">
              <StatusSign expire={cert.expire} />
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" align="center">
              {`${formatDateTime(cert.created_at * 1000, "yyyy-MM-dd")}`}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" align="center">
              {!!cert.expire &&
                `${formatDateTime(cert.expire * 1000, "yyyy-MM-dd")}`}
            </StyledTableCell>
            <OperationCell
              cert={cert}
              onApplyCert={onApplyCert}
              onRenewCert={onRenewCert}
              onOpenEditDrawer={onOpenEditDrawer}
            />
          </StyledTableRow>
        ))
      ) : (
        <TableRow>
          <StyledTableCell
            component="th"
            scope="row"
            align="center"
            colSpan={tableCellConfig.length}
          >
            No Data...
          </StyledTableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

const DataTable: FC<{
  finishInit: boolean
  certsList: Certs[]
  total: number
  onApplyCert: (id: number) => Promise<void>
  onRenewCert: (id: number) => Promise<void>
  onOpenEditDrawer: (cert: Certs) => void
}> = ({
  finishInit,
  certsList,
  total,
  onApplyCert,
  onRenewCert,
  onOpenEditDrawer,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {tableCellConfig.map((cell) => (
              <StyledTableCell
                key={cell.name}
                align={cell.alignPosition}
                sx={cell.styles}
              >
                {cell.name}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <DataTableBody
          finishInit={finishInit}
          certsList={certsList}
          total={total}
          onApplyCert={onApplyCert}
          onRenewCert={onRenewCert}
          onOpenEditDrawer={onOpenEditDrawer}
        />
      </Table>
    </TableContainer>
  )
}

export default DataTable
