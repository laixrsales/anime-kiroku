import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react'

import SimplePage from '../../components/SimplePage/SimplePage'
import { StyledInput } from '../../components/SimplePage/SimplePage.styles'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function validate() {
    if (!email.includes('@')) {
      setError('Invalid email')
      return false
    }

    setError('')
    return true
  }

  function handleSubmit() {
    if (!validate()) return

    console.log('Reset link enviado! Pronto para chamar API...')
  }

  const field = (
    <VStack spacing={4} width="100%">
      <FormControl isInvalid={!!error}>
        <FormLabel>Email</FormLabel>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </VStack>
  )

  return (
    <SimplePage
      title="Reset Password"
      description="A link will be sent to your email address to reset your password."
      buttonTitle="Send email"
      onClick={handleSubmit}
    >
      {field}
    </SimplePage>
  )
}
