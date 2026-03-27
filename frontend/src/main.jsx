import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AppRouter } from '@/routes/AppRouter'
import '@/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AppRouter />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1E293B',
          color: '#F1F5F9',
          border: '1px solid #334155',
        },
        success: {
          style: {
            background: '#10B981',
            color: '#F1F5F9',
          },
        },
        error: {
          style: {
            background: '#EF4444',
            color: '#F1F5F9',
          },
        },
      }}
    />
  </QueryClientProvider>
)
