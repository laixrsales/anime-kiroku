import { Link } from 'react-router-dom'
import { Box, Text, Button, VStack, HStack } from '@chakra-ui/react'
import { FiHome, FiArrowLeft } from 'react-icons/fi'
import PageBase from '../../components/PageBase/PageBase'
import { ROUTES } from '../../routes/routes'

import {
  NotFoundContainer,
  ErrorCode,
  ErrorTitle,
  ErrorDescription,
  ActionButtonsContainer,
  PrimaryActionButton,
  AnimationContainer,
  DotGrid,
  FloatingShape,
} from './NotFoundPage.styles'

export default function NotFoundPage() {
  return (
    <PageBase showHeaderLogo={true} showUserInfo={false}>
      <NotFoundContainer>
        <AnimationContainer>
          <FloatingShape
            style={{
              top: '10%',
              left: '10%',
              animationDelay: '0s',
            }}
          />
          <FloatingShape
            style={{
              top: '15%',
              right: '10%',
              animationDelay: '1s',
            }}
          />
          <FloatingShape
            style={{
              bottom: '10%',
              left: '15%',
              animationDelay: '2s',
            }}
          />
          <FloatingShape
            style={{
              bottom: '15%',
              right: '15%',
              animationDelay: '3s',
            }}
          />
          <DotGrid />
        </AnimationContainer>

        <VStack spacing={8} align="center" position="relative" zIndex={2}>
          <ErrorCode>404</ErrorCode>

          <ErrorTitle>Oops! Page Not Found</ErrorTitle>

          <ErrorDescription>
            The page you're looking for seems to have wandered off into the
            anime universe. It might have been moved, deleted, or never existed
            in the first place.
          </ErrorDescription>

          <ActionButtonsContainer>
            <Link to={ROUTES.LANDING}>
              <PrimaryActionButton leftIcon={<FiHome />}>
                Go to Homepage
              </PrimaryActionButton>
            </Link>

            <Button
              variant="ghost"
              color="neutral.light"
              leftIcon={<FiArrowLeft />}
              onClick={() => window.history.back()}
              _hover={{ color: 'text.inverted' }}
            >
              Go Back
            </Button>
          </ActionButtonsContainer>

          <Box mt={8} textAlign="center">
            <Text color="neutral.light" fontSize="sm">
              Still lost? Try these options:
            </Text>
            <HStack spacing={4} justify="center" mt={2}>
              <Link to={ROUTES.LOGIN}>
                <Text
                  color="secondary.default"
                  fontSize="sm"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Sign In
                </Text>
              </Link>
              <Text color="neutral.light">•</Text>
              <Link to={ROUTES.REGISTER}>
                <Text
                  color="secondary.default"
                  fontSize="sm"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Create Account
                </Text>
              </Link>
            </HStack>
          </Box>
        </VStack>
      </NotFoundContainer>
    </PageBase>
  )
}
