import { Text, TouchableOpacity, View } from 'react-native'

type Props = {
  title: string
  subtitle?: string
  emoji?: string
  onPress: () => void
}

export default function CardButton({ title, subtitle, emoji, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 16,
        borderWidth: 1,
        borderColor: '#C9B5AF',
        borderRadius: 16,
        backgroundColor: '#F6EFEA'
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {emoji ? <Text style={{ fontSize: 24, marginRight: 12 }}>{emoji}</Text> : null}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, color: '#3C2C2C' }}>{title}</Text>
          {subtitle ? (
            <Text style={{ fontSize: 12, color: '#6B5A5A', marginTop: 4 }}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  )
}
