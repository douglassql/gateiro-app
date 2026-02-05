import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import DecorBackground from '@/components/DecorBackground'
import CardButton from '@/components/CardButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

export default function MenuScreen() {
  const navigation = useNavigation<NavigationProps>()

  return (
    <DecorBackground>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, color: colors.primaryText, textAlign: 'center', marginVertical: 16 }}>
          Eu quero:
        </Text>

        <View style={{ gap: 12 }}>
          <CardButton
            iconName="paw-outline"
            title="Ver meus gatos"
            subtitle="Listar e editar informações"
            onPress={() => navigation.navigate('Pets')}
          />
          <CardButton
            iconName="shield-checkmark-outline"
            title="Gerenciar vacinas"
            subtitle="Registrar e acompanhar próximas doses"
            onPress={() => navigation.navigate('Vaccines')}
          />
          <CardButton
            iconName="medkit-outline"
            title="Gerenciar medicamentos"
            subtitle="Registrar e acompanhar próximos horários"
            onPress={() => navigation.navigate('Medications')}
          />
        </View>

        <View style={{
          position: 'absolute', bottom: 12, left: 0, right: 0,
          paddingHorizontal: 20
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: colors.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
            paddingVertical: 10,
            paddingHorizontal: 24
          }}>
            <Ionicons name="home-outline" size={22} color={colors.accentPurple} />
            <Ionicons name="paw-outline" size={22} color={colors.accentPurple} />
            <Ionicons name="medkit-outline" size={22} color={colors.accentPurple} />
            <Ionicons name="settings-outline" size={22} color={colors.accentPurple} />
          </View>
        </View>
      </View>
    </DecorBackground>
  )
}
