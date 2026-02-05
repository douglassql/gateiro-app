import { TextStyle } from 'react-native'
import { colors } from './colors'

export const typography: Record<string, TextStyle> = {
  titleLarge: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.primaryText
  },
  titleMedium: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.primaryText
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondaryText
  },
  body: {
    fontSize: 14,
    color: colors.primaryText
  },
  caption: {
    fontSize: 12,
    color: colors.secondaryText
  }
}
