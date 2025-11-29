import { render, screen, fireEvent } from '@testing-library/react'
import ResetPasswordPage from './ResetPasswordPage'

describe('ResetPasswordPage', () => {
  test('renders correctly', () => {
    render(<ResetPasswordPage />)

    expect(screen.getByText('Reset Password')).toBeInTheDocument()
    expect(
      screen.getByText(
        'A link will be sent to your email address to reset your password.',
      ),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Send email' }),
    ).toBeInTheDocument()
  })

  test('shows error on invalid email', () => {
    render(<ResetPasswordPage />)

    const input = screen.getByLabelText('Email')
    const button = screen.getByRole('button', { name: 'Send email' })

    fireEvent.change(input, { target: { value: 'invalidemail' } })
    fireEvent.click(button)

    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  test('does not show error when email is valid', () => {
    render(<ResetPasswordPage />)

    const input = screen.getByLabelText('Email')
    const button = screen.getByRole('button', { name: 'Send email' })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument()
  })
})
