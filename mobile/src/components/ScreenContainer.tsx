import { ReactNode } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DecorBackground from './DecorBackground'

type Props = {
  children: ReactNode
  variant?: 'home' | 'menu' | 'list' | 'form' | 'detail'
}

export default function ScreenContainer({ children, variant = 'home' }: Props) {
  return (
    <DecorBackground variant={variant}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <View style={{ flex: 1, padding: 16 }}>
          {children}
        </View>
      </SafeAreaView>
    </DecorBackground>
  )
}
