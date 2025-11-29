import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
} from '@chakra-ui/react'

import SimplePage from '../../components/SimplePage/SimplePage'
import { StyledInput } from '../../components/SimplePage/SimplePage.styles'

export default function CreateAccountPage() {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errors, setErrors] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  function validate() {
    const newErrors = {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }

    let ok = true

    if (!fullName.trim()) {
      newErrors.fullName = 'Required'
      ok = false
    }

    if (!username.trim()) {
      newErrors.username = 'Required'
      ok = false
    }

    if (!email.includes('@')) {
      newErrors.email = 'Invalid email'
      ok = false
    }

    if (!password.trim()) {
      newErrors.password = 'Required'
      ok = false
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match'
      ok = false
    }

    setErrors(newErrors)
    return ok
  }

  function handleSubmit() {
    if (!validate()) return

    console.log('Conta criada! Pronto para chamar API...')
  }

  const fields = (
    <VStack spacing={4} width="100%">
      <FormControl isInvalid={!!errors.fullName}>
        <FormLabel>Full name</FormLabel>
        <StyledInput
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <FormErrorMessage>{errors.fullName}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.username}>
        <FormLabel>Username</FormLabel>
        <StyledInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormErrorMessage>{errors.username}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>

      <HStack spacing={4} width="100%">
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <StyledInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirm password</FormLabel>
          <StyledInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
        </FormControl>
      </HStack>
    </VStack>
  )

  return (
    <SimplePage
      title="Create Account"
      buttonTitle="Sign up"
      onClick={handleSubmit}
    >
      {fields}
    </SimplePage>
  )
}
