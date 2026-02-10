import { Text, View } from 'react-native'
import ScreenContainer from '@/components/ScreenContainer'
import { colors } from '@/theme/colors'

export default function SettingsScreen() {
  return (
    <ScreenContainer variant="list">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: colors.primaryText }}>Configuracoes</Text>
        <Text style={{ marginTop: 8, color: colors.secondaryText }}>
          Preferencias do app serao adicionadas aqui.
        </Text>
      </View>
    </ScreenContainer>
  )
}
