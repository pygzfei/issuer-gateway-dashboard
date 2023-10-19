import Pagination from "@mui/material/Pagination/Pagination"
import { ChangeEvent, FC } from "react"

const PaginationBar: FC<{
  currentPage: number
  totalPage: number
  onPageChange: (_: ChangeEvent<unknown> | null, value: number) => void
}> = ({ currentPage, totalPage, onPageChange }) => {
  return (
    <Pagination
      sx={{ mt: "auto", ml: "auto" }}
      count={totalPage}
      page={currentPage}
      onChange={onPageChange}
    />
  )
}

export default PaginationBar
