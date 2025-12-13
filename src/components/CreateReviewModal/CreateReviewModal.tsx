import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

import { FaStar, FaRegStar } from 'react-icons/fa'
import {
  ModalContainer,
  Title,
  Description,
  StarsRow,
  StarButton,
  ButtonsRow,
  PrimaryButton,
  SecondaryButton,
  GuidelinesBox,
  ErrorText,
  RatingLabel,
} from './CreateReviewModal.styles'

import type { CreateReviewModalProps } from './CreateReviewModal.types'

export default function CreateReviewModal({
  isOpen,
  onClose,
  onSubmit,
  initialRating = 0,
  initialReviewText = '',
  isLoading = false,
}: CreateReviewModalProps) {
  const [rating, setRating] = useState(initialRating)
  const [reviewText, setReviewText] = useState(initialReviewText)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()

  const convertTo5Star = (rating10: number): number => {
    return Math.round(rating10 / 2)
  }

  const convertTo10Star = (rating5: number): number => {
    return rating5 * 2
  }

  useEffect(() => {
    if (isOpen) {
      setRating(convertTo5Star(initialRating || 0))
      setReviewText(initialReviewText || '')
      setHoverRating(0)
      setError(null)
    }
  }, [isOpen, initialRating, initialReviewText])

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const handleRatingHover = (hoveredRating: number) => {
    setHoverRating(hoveredRating)
  }

  const handleRatingLeave = () => {
    setHoverRating(0)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= 2000) {
      setReviewText(text)
    }
  }

  const handleSubmit = async () => {
    try {
      setError(null)

      if (rating === 0) {
        setError('Please select a rating')
        return
      }

      if (reviewText.trim() && reviewText.length < 10) {
        setError('Review text must be at least 10 characters if provided')
        return
      }

      setIsSubmitting(true)
      const rating10 = convertTo10Star(rating)
      await onSubmit(rating10, reviewText.trim())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error submitting review:', err)
      setError(
        err.response?.data?.message ||
          'Failed to submit review. Please try again.',
      )
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
    } finally {
      setIsSubmitting(false)
      toast({
        title: 'Success',
        description: 'Your review was saved!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const renderStars = () => {
    const stars = []
    const displayRating = hoverRating || rating

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= displayRating

      stars.push(
        <StarButton
          key={i}
          type="button"
          data-filled={isFilled}
          onClick={() => handleRatingSelect(i)}
          onMouseEnter={() => handleRatingHover(i)}
          onMouseLeave={handleRatingLeave}
          aria-label={`Rate ${i} out of 5`}
          disabled={isSubmitting || isLoading}
        >
          {isFilled ? <FaStar /> : <FaRegStar />}
        </StarButton>,
      )
    }

    return stars
  }

  const getRatingDescription = () => {
    const currentRating = hoverRating || rating
    if (currentRating === 0) return 'Select a rating'

    const descriptions: Record<number, string> = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent',
    }

    return descriptions[currentRating]
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="lg">
      <ModalOverlay />

      <ModalContent bg="transparent" boxShadow="none">
        <ModalContainer>
          <ModalHeader>
            <Title>Leave a Review</Title>
          </ModalHeader>

          <ModalBody>
            <Description>How was your experience?</Description>

            <StarsRow>
              {renderStars()}
              <RatingLabel>{getRatingDescription()}</RatingLabel>
            </StarsRow>

            <GuidelinesBox>
              <p>• Be respectful</p>
              <p>• Avoid spoilers</p>
              <p>• Explain what you liked or disliked</p>
            </GuidelinesBox>

            <Textarea
              value={reviewText}
              onChange={handleTextChange}
              placeholder="Write your review..."
              color="var(--chakra-colors-text-inverted)"
              border="1px solid var(--chakra-colors-neutral-light)"
              _focus={{
                borderColor: 'var(--chakra-colors-secondary-default)',
                boxShadow: '0 0 0 1px var(--chakra-colors-secondary-default)',
              }}
            />

            {error && <ErrorText>{error}</ErrorText>}
          </ModalBody>

          <ModalFooter>
            <ButtonsRow>
              <PrimaryButton
                onClick={handleSubmit}
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Submit
              </PrimaryButton>

              <SecondaryButton onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </SecondaryButton>
            </ButtonsRow>
          </ModalFooter>
        </ModalContainer>
      </ModalContent>
    </Modal>
  )
}
