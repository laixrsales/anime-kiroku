import Header from './components/Header/Header'
import type { HeaderItem } from './components'
import Footer from './components/Footer/Footer'

function App() {
  const headerNav: HeaderItem[] = [
    { label: 'Novidades', href: '/novidades' },
    { label: 'Populares', href: '/populares' },
    { label: 'Simulcast', href: '/simulcast' },
    {
      label: 'Categorias',
      children: [
        { label: 'Ação', href: '/categorias/acao' },
        { label: 'Romance', href: '/categorias/romance' },
        { label: 'Comédia', href: '/categorias/comedia' },
        { label: 'Drama', href: '/categorias/drama' },
      ],
    },
    { label: 'Jogos', href: '/jogos' },
    {
      label: 'Notícias',
      children: [
        { label: 'Últimas', href: '/noticias' },
        { label: 'Eventos', href: '/noticias/eventos' },
      ],
    },
  ]

  return (
    <>
      <Header items={headerNav} showLogo />
      <Footer />
    </>
  )
}

export default App
