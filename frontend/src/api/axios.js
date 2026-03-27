import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

instance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return instance(originalRequest)
          })
          .catch(() => {
            useAuthStore.getState().clearAuth()
            window.location.href = '/login'
            return Promise.reject(error)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      return instance
        .post('/auth/refresh-token', {})
        .then((response) => {
          const { data } = response.data
          const newAccessToken = data.accessToken || data.token

          useAuthStore.getState().setAuth(useAuthStore.getState().user, newAccessToken)

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          processQueue(null, newAccessToken)

          return instance(originalRequest)
        })
        .catch((refreshError) => {
          processQueue(refreshError, null)
          useAuthStore.getState().clearAuth()
          window.location.href = '/login'
          return Promise.reject(refreshError)
        })
        .finally(() => {
          isRefreshing = false
        })
    }

    return Promise.reject(error)
  }
)

export default instance
