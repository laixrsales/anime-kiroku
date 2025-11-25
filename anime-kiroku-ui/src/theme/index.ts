import {
  extendTheme,
  type StyleFunctionProps,
  type ThemeConfig,
} from '@chakra-ui/react'
import { colors } from './colors'
import {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  shadows,
  spacing,
  transitions,
} from './tokens'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  space: spacing,
  radii,
  shadows,
  transition: transitions,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg:
          props.colorMode === 'dark'
            ? colors.background.dark
            : colors.background.light,
        color:
          props.colorMode === 'dark'
            ? colors.text.inverted
            : colors.text.primary,
      },
    }),
  },
})

export default theme
