import { loginRequest } from "@/api"
import { useAuth } from "@/hooks"
import { StorageKeys } from "@/utils/storage"
import { ChangeEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { storage } from "../../utils/storage/index"

export const useLogIn = () => {
  const navigate = useNavigate()
  const { onSetAuth } = useAuth()
  const [showHelpText, setShowHelpText] = useState<boolean>(false)
  const loginInfo = useRef<{ account: string; password: string }>({
    account: "",
    password: "",
  })

  const onChangeAccount = (e: ChangeEvent<HTMLInputElement>) => {
    loginInfo.current.account = e.target.value
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    loginInfo.current.password = e.target.value
  }

  const onLogin = async () => {
    if (!loginInfo.current.account || !loginInfo.current.password) {
      setShowHelpText(true)
      return
    }
    const { success, data, msg } = await loginRequest({
      name: loginInfo.current.account,
      pass: loginInfo.current.password,
    })
    if (success && data) {
      storage.set(StorageKeys.TOKEN, data.token)
      onSetAuth(true)
      navigate("/")
    } else {
      msg &&
        globalThis.$toast.onOpen({
          text: msg,
          type: "error",
        })
    }
  }

  return { showHelpText, onLogin, onChangeAccount, onChangePassword }
}

export const useLoginWithSecret = () => {
  const { onSetAuth } = useAuth()
  const navigate = useNavigate()
  const [showHelpText, setShowHelpText] = useState<boolean>(false)
  const secret = useRef<string>("")

  const onChangeSecret = (e: ChangeEvent<HTMLInputElement>) => {
    secret.current = e.target.value
  }

  const onLogin = async () => {
    if (!secret.current) {
      setShowHelpText(true)
      return
    }
    storage.set(StorageKeys.TOKEN, secret.current)
    onSetAuth(true)
    navigate("/")
  }

  return {
    showHelpText,
    onChangeSecret,
    onLogin,
  }
}
