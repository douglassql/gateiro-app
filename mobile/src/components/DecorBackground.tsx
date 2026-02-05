import { View } from 'react-native'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant?: 'home' | 'menu' | 'list' | 'form' | 'detail'
}

export default function DecorBackground({ children, variant = 'home' }: Props) {
  const shapes = {
    home: [
      { style: { position: 'absolute', top: -40, left: -30, width: 160, height: 160, borderRadius: 80, backgroundColor: '#F0A25F', opacity: 0.7 } },
      { style: { position: 'absolute', bottom: -60, right: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: '#B68BBC', opacity: 0.5 } },
      { style: { position: 'absolute', top: 100, right: -60, width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderColor: '#D7C2BD', opacity: 0.6 } }
    ],
    menu: [
      { style: { position: 'absolute', top: -30, right: -20, width: 140, height: 140, borderRadius: 70, backgroundColor: '#B68BBC', opacity: 0.5 } },
      { style: { position: 'absolute', bottom: -50, left: -30, width: 200, height: 200, borderRadius: 100, backgroundColor: '#F0A25F', opacity: 0.6 } },
      { style: { position: 'absolute', top: 180, left: -40, width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderColor: '#D7C2BD', opacity: 0.6 } }
    ],
    list: [
      { style: { position: 'absolute', top: -25, left: -25, width: 120, height: 120, borderRadius: 60, backgroundColor: '#F0A25F', opacity: 0.6 } },
      { style: { position: 'absolute', bottom: -40, right: -30, width: 180, height: 180, borderRadius: 90, backgroundColor: '#B68BBC', opacity: 0.5 } }
    ],
    form: [
      { style: { position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: 80, backgroundColor: '#B68BBC', opacity: 0.45 } },
      { style: { position: 'absolute', bottom: -50, left: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: '#F0A25F', opacity: 0.5 } }
    ],
    detail: [
      { style: { position: 'absolute', top: -40, left: -40, width: 180, height: 180, borderRadius: 90, backgroundColor: '#B68BBC', opacity: 0.5 } },
      { style: { position: 'absolute', bottom: -60, right: -60, width: 240, height: 240, borderRadius: 120, backgroundColor: '#F0A25F', opacity: 0.6 } },
      { style: { position: 'absolute', top: 150, right: -50, width: 160, height: 160, borderRadius: 80, borderWidth: 1, borderColor: '#D7C2BD', opacity: 0.6 } }
    ]
  } as const

  return (
    <View style={{ flex: 1, backgroundColor: '#EBD9D4' }}>
      {shapes[variant].map((s, idx) => (
        <View key={idx} style={s.style} />
      ))}
      {children}
    </View>
  )
}
