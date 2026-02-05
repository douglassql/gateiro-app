import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { colors } from '@/theme/colors'
import { typography } from '@/theme/typography'
import ScreenContainer from '@/components/ScreenContainer'

type NavigationProps =
  NativeStackNavigationProp<RootStackParamList>

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>()

  return (
    <ScreenContainer variant="home">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <View style={{ width: 240, height: 240, borderRadius: 120, overflow: 'hidden', borderWidth: 6, borderColor: '#FFF', marginBottom: 24 }}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1592790331635-35b079a277f1?q=80&w=600&auto=format&fit=crop' }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        <Text style={typography.titleLarge}>Gateiro App</Text>
        <Text style={[typography.body, { textAlign: 'center', marginTop: 8, marginHorizontal: 24 }]}>
          Organize vacinas, medicamentos e cuidados dos seus gatos com uma interface simples.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Menu')}
          style={{
            marginTop: 24,
            backgroundColor: colors.primaryText,
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 12
          }}
        >
          <Text style={{ color: '#FFF', fontSize: 16 }}>Vamos começar</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  )
}
