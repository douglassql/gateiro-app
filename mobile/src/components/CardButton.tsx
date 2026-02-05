import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'

type Props = {
  title: string
  subtitle?: string
  iconName?: string
  onPress: () => void
}

export default function CardButton({ title, subtitle, iconName, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,
        backgroundColor: colors.card
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {iconName ? <Ionicons name={iconName as any} size={24} color={colors.accentPurple} style={{ marginRight: 12 }} /> : null}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, color: colors.primaryText }}>{title}</Text>
          {subtitle ? (
            <Text style={{ fontSize: 12, color: colors.secondaryText, marginTop: 4 }}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  )
}
