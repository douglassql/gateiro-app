import { View } from 'react-native'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function DecorBackground({ children }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: '#EBD9D4' }}>
      <View style={{ position: 'absolute', top: -40, left: -30, width: 160, height: 160, borderRadius: 80, backgroundColor: '#F0A25F', opacity: 0.7 }} />
      <View style={{ position: 'absolute', bottom: -60, right: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: '#B68BBC', opacity: 0.5 }} />
      <View style={{ position: 'absolute', top: 100, right: -60, width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderColor: '#D7C2BD', opacity: 0.6 }} />
      {children}
    </View>
  )
}
