import { $httpNoAuth } from '@/composable/useHttp'

export default function useRegisterAPI() {
  const register = async (payload) => {
    const res = await $httpNoAuth.post('/auth/register', payload)
    return res.data
  }

  return {
    register,
  }
}
