import { useEffect, useRef, useCallback } from 'react'
import { useAuth } from './useAuth'
import { useNotifications } from './useNotifications'

let socketInstance = null

export const useSocket = () => {
  const { accessToken, isAuthenticated } = useAuth()
  const { addNotification } = useNotifications()
  const socketRef = useRef(null)

  useEffect(() => {
    if (!isAuthenticated || !accessToken || socketInstance) {
      return
    }

    const initializeSocket = async () => {
      try {
        const { io } = await import('socket.io-client')

        socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
          auth: {
            token: accessToken,
          },
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
        })

        socketRef.current = socketInstance

        socketInstance.on('connect', () => {
          console.log('Socket connected')
        })

        socketInstance.on('disconnect', () => {
          console.log('Socket disconnected')
        })

        socketInstance.on('notification:new', (notification) => {
          addNotification(notification)
        })

        socketInstance.on('connect_error', (error) => {
          console.error('Socket connection error:', error)
        })
      } catch (error) {
        console.error('Failed to initialize socket:', error)
      }
    }

    initializeSocket()

    return () => {
      if (socketInstance && socketInstance.connected) {
        socketInstance.disconnect()
        socketInstance = null
        socketRef.current = null
      }
    }
  }, [isAuthenticated, accessToken, addNotification])

  const emit = useCallback((event, data) => {
    if (socketInstance && socketInstance.connected) {
      socketInstance.emit(event, data)
    }
  }, [])

  const on = useCallback((event, callback) => {
    if (socketInstance) {
      socketInstance.on(event, callback)
    }

    return () => {
      if (socketInstance) {
        socketInstance.off(event, callback)
      }
    }
  }, [])

  return {
    socket: socketInstance,
    emit,
    on,
    isConnected: socketInstance?.connected || false,
  }
}
