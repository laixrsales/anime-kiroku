import { Button, useColorMode } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export function ThemeToggle() {
  const { t } = useTranslation()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? t('dark-mode') : t('light-mode')}
    </Button>
  )
}
