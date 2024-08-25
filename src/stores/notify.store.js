import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

const notifyStore = create((set) => ({
  noti: [],
  addNoti: (type, message = '') =>
    set({ noti: { id: uuidv4(), type, message } }),
  removeNoti: (id) =>
    set((state) => {
      return { noti: state.noti.filter((n) => n.id !== id) }
    }),

  success: (message) => notifyStore.getState().addNoti('success', message),
  info: (message) => notifyStore.getState().addNoti('info', message),
  warn: (message) => notifyStore.getState().addNoti('warn', message),
  error: (message) => notifyStore.getState().addNoti('error', message),
}))

export default notifyStore
