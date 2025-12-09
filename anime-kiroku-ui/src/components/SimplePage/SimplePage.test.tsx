import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import SimplePage from './SimplePage'
import { MemoryRouter } from 'react-router-dom'

describe('SimplePage', () => {
  function renderWithRouter(ui: React.ReactNode) {
    return render(<MemoryRouter>{ui}</MemoryRouter>)
  }

  it('renders title, children and button', () => {
    const fn = vi.fn()

    renderWithRouter(
      <SimplePage title="Login" buttonTitle="Sign in" onClick={fn}>
        <p>Child content</p>
      </SimplePage>,
    )

    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Child content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('calls onClick when button is clicked', () => {
    const fn = vi.fn()

    renderWithRouter(
      <SimplePage title="Login" buttonTitle="Sign in" onClick={fn}>
        <p>Child content</p>
      </SimplePage>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(fn).toHaveBeenCalled()
  })
})
