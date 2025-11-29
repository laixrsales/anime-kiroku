import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { ChakraProvider } from '@chakra-ui/react'

function renderWithChakra(ui: React.ReactNode) {
  return render(<ChakraProvider>{ui}</ChakraProvider>)
}

const itemsMock = [
  { label: 'Home', href: '/' },
  {
    label: 'Categorias',
    children: [
      { label: 'Ação', href: '/acao' },
      { label: 'Drama', href: '/drama' },
    ],
  },
  { label: 'Top 100', href: '/top' },
]

describe('Header', () => {
  it('if showLogo, renders logo', () => {
    renderWithChakra(<Header items={itemsMock} showLogo={true} />)

    const imgs = screen.getAllByRole('img')
    expect(imgs[0]).toBeInTheDocument()
    expect(screen.getByText('AnimeKiroku')).toBeInTheDocument()
  })

  it('if not showLogo, do not render logo', () => {
    renderWithChakra(<Header items={itemsMock} showLogo={false} />)

    expect(screen.queryByText('AnimeKiroku')).not.toBeInTheDocument()
  })

  it('renders simple menu items', () => {
    renderWithChakra(<Header items={itemsMock} showLogo={false} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Top 100')).toBeInTheDocument()
  })

  it('renders dropdown menu', async () => {
    renderWithChakra(<Header items={itemsMock} showLogo={false} />)

    const categoriasButton = screen.getByText('Categorias')
    expect(categoriasButton).toBeInTheDocument()

    fireEvent.click(categoriasButton)

    expect(screen.getByText('Ação')).toBeInTheDocument()
    expect(screen.getByText('Drama')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    renderWithChakra(<Header items={itemsMock} showLogo={false} />)

    expect(screen.getByLabelText('Pesquisar')).toBeInTheDocument()
    expect(screen.getByLabelText('Favoritos')).toBeInTheDocument()
  })

  it('render user menu', () => {
    renderWithChakra(<Header items={itemsMock} showLogo={false} />)

    const avatar = screen.getByRole('img')
    fireEvent.click(avatar)

    expect(screen.getByText('Perfil')).toBeInTheDocument()
    expect(screen.getByText('Configurações')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
  })
})
