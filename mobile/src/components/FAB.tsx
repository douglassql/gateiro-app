import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'

type Props = {
  onPress: () => void
}

export default function FAB({ onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.accentPurple,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4
      }}
    >
      <Ionicons name="add" size={24} color="#fff" />
    </TouchableOpacity>
  )
}
