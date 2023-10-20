import {
  addDomainRequest,
  applyCertRequest,
  getCertsListRequest,
  modifyCertTargetRequest,
} from "@/api"
import { Certs } from "@/entity/types"
import { DOMAIN_REGEX, EMAIL_REGEX, TARGET_REGEX } from "@/utils/reg"
import { SelectChangeEvent } from "@mui/material/Select/SelectInput"
import { SxProps, Theme } from "@mui/material/styles"
import { TableCellProps } from "@mui/material/TableCell/TableCell"
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react"

export interface ValidStatus {
  domainError: boolean
  emailError: boolean
  targetError: boolean
}

export enum ProtocolType {
  http = "http://",
  https = "https://",
}

export const PAGE_SIZE = 10
export const DOMAIN_ROW_MAX_WIDTH = 500
export const OPERATION_ROW_WIDTH = 500
export const tableCellConfig: {
  name: string
  alignPosition: TableCellProps["align"]
  styles?: SxProps<Theme>
}[] = [
  {
    name: "Domain",
    alignPosition: "left",
    styles: { maxWidth: DOMAIN_ROW_MAX_WIDTH },
  },
  {
    name: "Server",
    alignPosition: "left",
  },
  {
    name: "Status",
    alignPosition: "center",
  },
  {
    name: "Create Time",
    alignPosition: "center",
  },
  {
    name: "Expired On",
    alignPosition: "center",
  },
  {
    name: "Operation",
    alignPosition: "center",
    styles: { width: OPERATION_ROW_WIDTH },
  },
]

export const useAction = () => {
  const currentPage = useRef<number>(1)
  const [finishInit, setFinishInit] = useState<boolean>(false)
  const [certsData, setCertsData] = useState<{
    certsList: Certs[]
    total: number
  }>({
    certsList: [],
    total: 0,
  })

  const totalPage = useMemo(() => {
    return Math.ceil(certsData.total / PAGE_SIZE)
  }, [certsData.total])

  const onPageChange = (_: ChangeEvent<unknown> | null, value: number) => {
    if (currentPage.current === value) return
    currentPage.current = value
    getCertsList()
  }

  const getCertsList = async () => {
    const { success, data, msg } = await getCertsListRequest({
      page: currentPage.current,
      size: PAGE_SIZE,
    })
    if (success && data) {
      setCertsData({
        certsList: data?.certs ?? [],
        total: data?.total,
      })
    } else {
      msg &&
        globalThis.$toast.onOpen({
          text: msg,
          type: "error",
        })
    }
  }

  // TODO: 待对接
  const onApplyCert = async (id: number) => {
    await applyCertRequest(id)
  }

  const init = async () => {
    await getCertsList()
    setFinishInit(true)
  }

  useEffect(() => {
    init()
  }, [])

  return {
    currentPage,
    certsData,
    finishInit,
    totalPage,
    getCertsList,
    onPageChange,
    onApplyCert,
  }
}

export const useBindDomain = ({
  getCertsList,
}: {
  getCertsList: () => Promise<void>
}) => {
  const bindingData = useRef<{ domain: string; email: string; target: string }>(
    {
      domain: "",
      email: "",
      target: "",
    }
  )
  const [targetCurrentProtocol, setTargetCurrentProtocol] =
    useState<ProtocolType>(ProtocolType.https)
  const [openBindingDialog, setOpenBindingDialog] = useState<boolean>(false)
  const [validStatus, setValidStatus] = useState<ValidStatus>({
    domainError: false,
    emailError: false,
    targetError: false,
  })

  const onOpenBindingDialog = () => {
    setOpenBindingDialog(true)
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    bindingData.current.email = e.target.value
  }

  const handleDomain = (e: ChangeEvent<HTMLInputElement>) => {
    bindingData.current.domain = e.target.value
  }

  const handleTarget = (e: ChangeEvent<HTMLInputElement>) => {
    bindingData.current.target = e.target.value
  }

  const onChangeProtocol = (e: SelectChangeEvent<ProtocolType>) => {
    setTargetCurrentProtocol(e.target.value as ProtocolType)
  }

  const onSubmit = async () => {
    const domainPass = DOMAIN_REGEX.test(bindingData.current.domain)
    const targetPass = TARGET_REGEX.test(bindingData.current.target)
    const emailPass = EMAIL_REGEX.test(bindingData.current.email)
    setValidStatus({
      domainError: !domainPass,
      emailError: !emailPass,
      targetError: !targetPass,
    })
    if (domainPass && targetPass && emailPass) {
      const { success, msg } = await addDomainRequest({
        domain: bindingData.current.domain,
        target: `${targetCurrentProtocol}${bindingData.current.target}`,
        email: bindingData.current.email,
      })
      if (success) {
        getCertsList()
        setOpenBindingDialog(false)
      } else {
        msg &&
          globalThis.$toast.onOpen({
            text: msg,
            type: "error",
          })
      }
    }
  }

  const onClose = () => {
    setOpenBindingDialog(false)
    setValidStatus({
      domainError: false,
      emailError: false,
      targetError: false,
    })
  }

  return {
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
  }
}

export const useEditDomain = ({
  getCertsList,
}: {
  getCertsList: () => Promise<void>
}) => {
  const [currentEditCert, setCurrentEditCert] = useState<Certs | null>(null)
  const [openEditDrawer, setOpenEditDrawer] = useState<boolean>(false)

  const onOpenEditDrawer = (cert: Certs) => {
    setCurrentEditCert(cert)
    setOpenEditDrawer(true)
  }

  const onChangeTarget = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentEditCert((val) => {
      if (val) {
        return {
          ...val,
          target: e.target.value,
        }
      }
      return null
    })
  }

  const onSubmit = async ({ id, target }: { id?: number; target?: string }) => {
    if (!id || !target) return
    const reg = /^(https?:\/\/)(www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/
    const targetPass = reg.test(target)
    if (!targetPass) {
      globalThis.$toast.onOpen({
        type: "error",
        text: 'Server invalid! "http://" or "https://" necessary',
      })
      return
    }
    setCurrentEditCert(null)
    setOpenEditDrawer(false)
    await modifyCertTargetRequest({ id, target })
    getCertsList()
  }

  const onCancel = () => {
    setCurrentEditCert(null)
    setOpenEditDrawer(false)
  }

  return {
    currentEditCert,
    openEditDrawer,
    onOpenEditDrawer,
    onSubmit,
    onChangeTarget,
    onCancel,
  }
}
