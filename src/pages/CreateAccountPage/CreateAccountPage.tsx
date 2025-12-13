import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
  useToast,
  Link,
  Text,
} from '@chakra-ui/react'
import { useState, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import SimplePage from '../../components/SimplePage/SimplePage'
import { StyledInput } from '../../components/SimplePage/SimplePage.styles'
import { useAuth } from '../../hooks/useAuth'
import { useNavigation } from '../../hooks/useNavigation'
import { ROUTES } from '../../routes/routes'

export default function CreateAccountPage() {
  const { register, isLoading } = useAuth()
  const navigation = useNavigation()
  const toast = useToast()

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [field]: '' }))
      }
    },
    [errors],
  )

  const validate = useCallback(() => {
    const newErrors = {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }

    let ok = true

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
      ok = false
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters'
      ok = false
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
      ok = false
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
      ok = false
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Use only letters, numbers and underscore (_)'
      ok = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      ok = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email'
      ok = false
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      ok = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      ok = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      ok = false
    }

    setErrors(newErrors)
    return ok
  }, [formData])

  const handleSubmit = useCallback(async () => {
    if (!validate()) return

    try {
      await register(formData.fullName, formData.email, formData.password)

      toast({
        title: 'Account created successfully!',
        description: `Welcome, ${formData.fullName}!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })

      navigation.goToDashboard()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error creating account:', error)

      let errorMessage = 'Failed to create account. Please try again.'

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.message?.includes('email')) {
        errorMessage = 'This email is already in use.'
      } else if (error?.message?.includes('username')) {
        errorMessage = 'This username is already taken.'
      }

      toast({
        title: 'Error creating account',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }, [formData, validate, register, toast, navigation])

  const fields = (
    <VStack spacing={4} width="100%">
      <FormControl isInvalid={!!errors.fullName}>
        <FormLabel>Full name</FormLabel>
        <StyledInput
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          disabled={isLoading}
        />
        <FormErrorMessage>{errors.fullName}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.username}>
        <FormLabel>Username</FormLabel>
        <StyledInput
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          disabled={isLoading}
        />
        <FormErrorMessage>{errors.username}</FormErrorMessage>
        {!errors.username && (
          <Text fontSize="xs" color="gray.500" mt={1}>
            Use only letters, numbers and _
          </Text>
        )}
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <StyledInput
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          disabled={isLoading}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>

      <HStack spacing={4} width="100%">
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <StyledInput
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit()
            }}
            disabled={isLoading}
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <StyledInput
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange('confirmPassword', e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit()
            }}
            disabled={isLoading}
          />
          <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
        </FormControl>
      </HStack>

      <HStack justify="center" width="100%" pt={4}>
        <RouterLink to={ROUTES.LOGIN}>
          <Link href="#" fontSize="sm" color="blue.500">
            Already have an account? Sign in
          </Link>
        </RouterLink>
      </HStack>
    </VStack>
  )

  return (
    <SimplePage
      title="Create Account"
      buttonTitle={isLoading ? 'Creating account...' : 'Sign up'}
      onClick={handleSubmit}
    >
      {fields}
    </SimplePage>
  )
}
