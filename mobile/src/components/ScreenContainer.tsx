import { ReactNode } from 'react'
import { View } from 'react-native'
import DecorBackground from './DecorBackground'

type Props = {
  children: ReactNode
  variant?: 'home' | 'menu' | 'list' | 'form' | 'detail'
}

export default function ScreenContainer({ children, variant = 'home' }: Props) {
  return (
    <DecorBackground variant={variant}>
      <View style={{ flex: 1, padding: 16 }}>
        {children}
      </View>
    </DecorBackground>
  )
}
