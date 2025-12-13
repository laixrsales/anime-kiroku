import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import theme from './theme/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <App />
    </ChakraProvider>
  </StrictMode>,
)
