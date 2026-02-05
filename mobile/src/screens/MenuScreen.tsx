import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import DecorBackground from '@/components/DecorBackground'
import CardButton from '@/components/CardButton'

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

export default function MenuScreen() {
  const navigation = useNavigation<NavigationProps>()

  return (
    <DecorBackground>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, color: '#3C2C2C', textAlign: 'center', marginVertical: 16 }}>
          Eu quero:
        </Text>

        <View style={{ gap: 12 }}>
          <CardButton
            emoji="🐱"
            title="Ver meus gatos"
            subtitle="Listar e editar informações"
            onPress={() => navigation.navigate('Pets')}
          />
          <CardButton
            emoji="🛡️"
            title="Gerenciar vacinas"
            subtitle="Registrar e acompanhar próximas doses"
            onPress={() => navigation.navigate('Vaccines')}
          />
          <CardButton
            emoji="💊"
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
            backgroundColor: '#F6EFEA',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#C9B5AF',
            paddingVertical: 10,
            paddingHorizontal: 16
          }}>
            <Text style={{ color: '#3C2C2C' }}>🏠 Home</Text>
            <Text style={{ color: '#3C2C2C' }}>🐱 Pets</Text>
            <Text style={{ color: '#3C2C2C' }}>💊 Remédios</Text>
            <Text style={{ color: '#3C2C2C' }}>⚙️ Config</Text>
          </View>
        </View>
      </View>
    </DecorBackground>
  )
}
