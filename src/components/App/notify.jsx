import React, { useEffect, useRef } from 'react'
import notifyStore from '@/stores/notify.store'
import { Toast } from 'primereact/toast'

export default function Notify() {
  const toast = useRef()
  const noti = notifyStore((state) => state.noti)

  const show = (type, message) => {
    toast.current.show({
      severity: type,
      detail: message,
    })
  }

  useEffect(() => {
    if (noti.id) {
      show(noti.type, noti.message)
    }
  }, [noti])

  return <Toast ref={toast} position="top-right" />
}
