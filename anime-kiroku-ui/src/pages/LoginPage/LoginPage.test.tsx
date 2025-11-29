import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('shows validation errors when fields are invalid', () => {
    render(<LoginPage />)

    const button = screen.getByRole('button', { name: 'Sign in' })
    fireEvent.click(button)

    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('accepts valid input and does not show errors', () => {
    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'user@example.com' },
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '12345' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument()
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument()
  })
})
