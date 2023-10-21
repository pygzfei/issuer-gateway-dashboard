import { uploadCertRequest } from "@/api"
import { ChangeEvent, useEffect, useState } from "react"

interface UploadData {
  certificate: {
    name: string
    value: string
  }
  privateKey: {
    name: string
    value: string
  }
  issuerCertificate: {
    name: string
    value: string
  }
}

export enum UploadCertificateDataType {
  certificate = "certificate",
  privateKey = "privateKey",
  issuerCertificate = "issuerCertificate",
}

export const useAction = ({
  open,
  certId,
  afterUploadCallback,
}: {
  open: boolean
  certId: number
  afterUploadCallback: (success: boolean) => void
}) => {
  const [uploadData, setUploadData] = useState<UploadData>({
    certificate: {
      name: "",
      value: "",
    },
    privateKey: {
      name: "",
      value: "",
    },
    issuerCertificate: {
      name: "",
      value: "",
    },
  })

  const onChangeUploadData = (
    e: ChangeEvent<HTMLInputElement>,
    type: UploadCertificateDataType
  ) => {
    const selectedFile = e.target?.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = function (e) {
        setUploadData((v) => {
          if (typeof e?.target?.result !== "string") {
            globalThis.$toast.onOpen({
              text: "Failed",
              type: "error",
            })
            return v
          }
          return {
            ...v,
            [UploadCertificateDataType[type]]: {
              name: selectedFile.name,
              value: e?.target?.result ?? "",
            },
          }
        })
      }
      reader.readAsText(selectedFile)
    } else {
      globalThis.$toast.onOpen({
        text: "Failed",
        type: "error",
      })
    }
  }

  const clearIssuerCertificate = () => {
    setUploadData((v) => ({
      ...v,
      issuerCertificate: {
        name: "",
        value: "",
      },
    }))
  }

  const onSubmit = async () => {
    if (!uploadData.certificate.value || !uploadData.privateKey.value) {
      globalThis.$toast.onOpen({
        type: "warning",
        text: "Certificate or private key are necessary",
      })
      return
    }

    const { success, msg } = await uploadCertRequest({
      id: certId,
      certificate: uploadData.certificate.value,
      privateKey: uploadData.privateKey.value,
      issuerCertificate: uploadData.issuerCertificate.value,
    })
    if (!success) {
      msg &&
        globalThis.$toast.onOpen({
          type: "error",
          text: msg,
        })
    }

    afterUploadCallback(success)
  }

  useEffect(() => {
    if (open) {
      setUploadData({
        certificate: {
          name: "",
          value: "",
        },
        privateKey: {
          name: "",
          value: "",
        },
        issuerCertificate: {
          name: "",
          value: "",
        },
      })
    }
  }, [open])

  return {
    uploadData,
    onChangeUploadData,
    clearIssuerCertificate,
    onSubmit,
  }
}
