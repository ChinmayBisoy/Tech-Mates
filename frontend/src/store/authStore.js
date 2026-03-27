import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        _hasHydrated: false,

        setHydrated: () => set({ _hasHydrated: true }),

        setAuth: (user, accessToken) => {
          set({ user, accessToken, _hasHydrated: true })
        },

        updateUser: (updates) => {
          set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
          }))
        },

        logout: () => {
          set({ user: null, accessToken: null })
        },

        clearAuth: () => {
          set({ user: null, accessToken: null })
        },

        isAuthenticated: () => {
          const state = useAuthStore.getState()
          return state.user !== null && state.accessToken !== null
        },
      }),
      {
        name: 'techmates-auth',
        onRehydrateStorage: () => (state) => {
          // Mark as hydrated after localStorage is loaded
          state?.setHydrated()
        },
      }
    )
  )
)
