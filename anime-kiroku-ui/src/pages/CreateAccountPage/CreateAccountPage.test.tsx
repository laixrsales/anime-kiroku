import { render, screen, fireEvent } from '@testing-library/react'
import CreateAccountPage from './CreateAccountPage'

describe('CreateAccountPage', () => {
  test('renders correctly', () => {
    render(<CreateAccountPage />)

    expect(screen.getByText('Create Account')).toBeInTheDocument()

    expect(screen.getByLabelText('Full name')).toBeInTheDocument()
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument()
  })

  test('shows errors when submitting empty fields', () => {
    render(<CreateAccountPage />)

    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }))

    const requiredErrors = screen.getAllByText('Required')
    expect(requiredErrors.length).toBeGreaterThanOrEqual(1)

    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  test('shows password mismatch error', () => {
    render(<CreateAccountPage />)

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '123' },
    })

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: '456' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }))

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
  })

  test('does not show errors with valid input', () => {
    render(<CreateAccountPage />)

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'johndoe' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '123456' },
    })
    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }))

    expect(screen.queryByText('Required')).not.toBeInTheDocument()
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument()
    expect(screen.queryByText('Passwords do not match')).not.toBeInTheDocument()
  })
})
