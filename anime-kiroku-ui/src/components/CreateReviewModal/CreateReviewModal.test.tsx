import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CreateReviewModal from './CreateReviewModal'
import { ChakraProvider } from '@chakra-ui/react'

const renderWithChakra = (component: React.ReactNode) => {
  return render(<ChakraProvider>{component}</ChakraProvider>)
}

describe('CreateReviewModal', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSubmit: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render modal when isOpen is true', () => {
    renderWithChakra(<CreateReviewModal {...mockProps} />)

    expect(screen.getByText('Leave a Review')).toBeInTheDocument()
    expect(screen.getByText('How was your experience?')).toBeInTheDocument()
  })

  it('should not render modal when isOpen is false', () => {
    renderWithChakra(<CreateReviewModal {...mockProps} isOpen={false} />)

    expect(screen.queryByText('Leave a Review')).toBeNull()
  })
})
