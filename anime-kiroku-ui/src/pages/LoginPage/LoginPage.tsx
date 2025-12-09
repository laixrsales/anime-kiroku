import { useCallback, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react'

import SimplePage from '../../components/SimplePage/SimplePage'
import { StyledInput } from '../../components/SimplePage/SimplePage.styles'
import { useNavigation } from '../../hooks/useNavigation'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../routes/routes'

export default function LoginPage() {
  const navigation = useNavigation()
  const { login, isLoading } = useAuth()
  const toast = useToast()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
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
      email: '',
      password: '',
    }

    let ok = true

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      ok = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
      ok = false
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      ok = false
    }

    setErrors(newErrors)
    return ok
  }, [formData])

  const handleLogin = useCallback(async () => {
    if (!validate()) return

    try {
      await login(formData.email, formData.password)

      const returnUrl = navigation.getReturnUrl()
      navigation.goTo(returnUrl)

      toast({
        title: 'Login successful!',
        description: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('Login error:', error)

      setFormData((prev) => ({ ...prev, password: '' }))

      let errorMessage = 'Login failed. Please try again.'

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (
        error?.message?.includes('credentials') ||
        error?.message?.includes('invalid')
      ) {
        errorMessage = 'Invalid email or password'
      } else if (error?.message?.includes('network')) {
        errorMessage = 'Network error. Please check your connection.'
      }

      toast({
        title: 'Login failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }, [formData, validate, login, navigation, toast])

  const formFields = (
    <VStack spacing={4} width="100%">
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <StyledInput
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleLogin()
          }}
          disabled={isLoading}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <StyledInput
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleLogin()
          }}
          disabled={isLoading}
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>

      <HStack justify="space-between" width="100%" pt={2}>
        <RouterLink to={ROUTES.RESET_PASSWORD}>
          <Link href="#" fontSize="sm" color="blue.500">
            Forgot password?
          </Link>
        </RouterLink>
        <RouterLink to={ROUTES.REGISTER}>
          <Link href="#" fontSize="sm" color="blue.500">
            Create account
          </Link>
        </RouterLink>
      </HStack>
    </VStack>
  )

  return (
    <SimplePage
      title="Sign In"
      buttonTitle={isLoading ? 'Signing in...' : 'Sign in'}
      onClick={handleLogin}
    >
      {formFields}
    </SimplePage>
  )
}
