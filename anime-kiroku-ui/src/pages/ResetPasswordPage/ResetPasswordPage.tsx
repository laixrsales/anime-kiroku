import { useCallback, useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  useToast,
  Box,
  Text,
} from '@chakra-ui/react'

import SimplePage from '../../components/SimplePage/SimplePage'
import { StyledInput } from '../../components/SimplePage/SimplePage.styles'
import { useNavigation } from '../../hooks/useNavigation'
import { useAuth } from '../../hooks/useAuth'

export default function ResetPasswordPage() {
  const navigation = useNavigation()
  const { resetPassword, isLoading } = useAuth()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = useCallback(() => {
    if (!email.includes('@')) {
      setError('Invalid email')
      return false
    }

    setError('')
    return true
  }, [email])

  const handleSubmit = useCallback(async () => {
    if (!validate()) return

    try {
      await resetPassword(email)
      setIsSubmitted(true)

      toast({
        title: 'Success',
        description: 'An email has been sent to your inbox!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: `It was not possible to send you the email: ${error}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }, [email, resetPassword, toast, validate])

  const handleBackToLogin = useCallback(() => {
    navigation.goToLogin()
  }, [navigation])

  if (isSubmitted) {
    return (
      <SimplePage
        title="E-mail sent!"
        buttonTitle="Back to login"
        description="Verify your inbox and follow the instructions. The link will expire in 1 hour."
        onClick={handleBackToLogin}
      >
        <VStack spacing={6} width="100%" textAlign="center">
          <Box>
            <Text fontSize="md" color="gray.600">
              We sent an e-mail to <strong>{email}</strong> and now you can
              reset your password.
            </Text>
          </Box>
        </VStack>
      </SimplePage>
    )
  }

  const field = (
    <VStack spacing={4} width="100%">
      <FormControl isInvalid={!!error}>
        <FormLabel>Email</FormLabel>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          disabled={isLoading}
          placeholder="seu@email.com"
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </VStack>
  )

  return (
    <SimplePage
      title="Reset Password"
      description="A link will be sent to your email address to reset your password"
      buttonTitle={isLoading ? 'Loading...' : 'Send e-mail '}
      onClick={handleSubmit}
    >
      {field}
    </SimplePage>
  )
}
