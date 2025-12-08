import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext/AuthProvider'
import { AnimeProvider } from './contexts/AnimeContext/AnimeProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimeProvider>
          <AppRoutes />
        </AnimeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
