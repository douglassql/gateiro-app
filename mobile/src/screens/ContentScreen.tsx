import { Text, View } from 'react-native'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import CardButton from '@/components/CardButton'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'

export default function ContentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <ScreenContainer variant="list">
      <Header icon="book-outline" title="Conteudo" />
      <Text style={[typography.body, { marginBottom: 12 }]}>Explore conteudos e curiosidades.</Text>

      <CardButton
        iconName="paw-outline"
        title="Fatos de gatos"
        subtitle="Curiosidades rapidas e divertidas"
        onPress={() => navigation.navigate('CatFacts')}
      />

      <View
        style={{
          marginTop: 16,
          padding: 14,
          borderRadius: 14,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border
        }}
      >
        <Text style={{ fontSize: 16, color: colors.primaryText }}>Em breve</Text>
        <Text style={{ marginTop: 6, color: colors.secondaryText }}>
          Esta area vai reunir dicas e FAQ.
        </Text>
      </View>
    </ScreenContainer>
  )
}
