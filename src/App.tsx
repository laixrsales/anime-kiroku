import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext/AuthProvider'
import { AnimeProvider } from './contexts/AnimeContext/AnimeProvider'
import { ReviewProvider } from './contexts/ReviewContext/ReviewProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimeProvider>
          <ReviewProvider>
            <AppRoutes />
          </ReviewProvider>
        </AnimeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
