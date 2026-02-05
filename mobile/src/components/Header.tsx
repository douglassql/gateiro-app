import { View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'

type Props = {
  icon: keyof typeof Ionicons.glyphMap
  title: string
}

export default function Header({ icon, title }: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
      <Ionicons name={icon} size={22} color={colors.accentPurple} style={{ marginRight: 8 }} />
      <Text style={typography.subtitle}>{title}</Text>
    </View>
  )
}
