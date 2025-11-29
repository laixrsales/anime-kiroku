import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
  VStack,
  HStack,
} from '@chakra-ui/react'

import SimplePage from '../../components/SimplePage/SimplePage'

import { StyledInput } from '../../components/SimplePage/SimplePage.styles'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })

  function validate() {
    const newErrors = { email: '', password: '' }
    let ok = true

    if (!email.includes('@')) {
      newErrors.email = 'Invalid email'
      ok = false
    }

    if (!password) {
      newErrors.password = 'Password is required'
      ok = false
    }

    setErrors(newErrors)
    return ok
  }

  function handleLogin() {
    if (!validate()) return

    console.log('Login validado! Pronto para chamar API...')
  }

  const formFields = (
    <VStack spacing={4} width="100%">
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>

      <HStack justify="space-between" width="100%" pt={2}>
        <Link href="/forgot-password" fontSize="sm">
          Forgot password?
        </Link>
        <Link href="/create-account" fontSize="sm">
          Create account
        </Link>
      </HStack>
    </VStack>
  )

  return (
    <SimplePage title="Login" buttonTitle="Sign in" onClick={handleLogin}>
      {formFields}
    </SimplePage>
  )
}
