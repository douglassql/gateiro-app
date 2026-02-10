import { Text, View } from 'react-native'
import ScreenContainer from '@/components/ScreenContainer'
import { colors } from '@/theme/colors'

export default function ContentScreen() {
  return (
    <ScreenContainer variant="list">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: colors.primaryText }}>Conteudo em breve</Text>
        <Text style={{ marginTop: 8, color: colors.secondaryText }}>
          Esta area vai reunir dicas e FAQ.
        </Text>
      </View>
    </ScreenContainer>
  )
}
