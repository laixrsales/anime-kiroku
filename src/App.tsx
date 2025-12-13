import { BrowserRouter } from 'react-router-dom'
import { AnimeProvider } from './contexts/AnimeContext/AnimeProvider'
import { AuthProvider } from './contexts/AuthContext/AuthProvider'
import { ReviewProvider } from './contexts/ReviewContext/ReviewProvider'
import AppRoutes from './routes/AppRoutes'

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
