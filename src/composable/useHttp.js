import axios from 'axios'
import { BASE_URL } from '@/constants'
import notifyStore from '@/stores/notify.store'

const $httpNoAuth = axios.create({
  baseURL: BASE_URL,
})

$httpNoAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorNoti = notifyStore.getState().error
    errorNoti(error.response.data.message)
    return Promise.reject(error)
  }
)

export { $httpNoAuth }
