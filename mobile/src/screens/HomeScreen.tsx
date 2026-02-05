import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'

type NavigationProps =
  NativeStackNavigationProp<RootStackParamList>

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProps>()

  return (
    <View style={{ flex: 1, backgroundColor: '#EBD9D4', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <View style={{ position: 'absolute', top: -40, left: -30, width: 160, height: 160, borderRadius: 80, backgroundColor: '#F0A25F', opacity: 0.7 }} />
      <View style={{ position: 'absolute', bottom: -60, right: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: '#B68BBC', opacity: 0.5 }} />
      <View style={{ position: 'absolute', top: 100, right: -60, width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderColor: '#D7C2BD', opacity: 0.6 }} />

      <View style={{ width: 240, height: 240, borderRadius: 120, overflow: 'hidden', borderWidth: 6, borderColor: '#FFF', marginBottom: 24 }}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1592790331635-35b079a277f1?q=80&w=600&auto=format&fit=crop' }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>

      <Text style={{ fontSize: 28, fontWeight: '600', color: '#3C2C2C' }}>Gateiro App</Text>
      <Text style={{ fontSize: 14, color: '#5A4A4A', textAlign: 'center', marginTop: 8, marginHorizontal: 24 }}>
        Organize vacinas, medicamentos e cuidados dos seus gatos com uma interface simples.
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Menu')}
        style={{
          marginTop: 24,
          backgroundColor: '#3C2C2C',
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12
        }}
      >
        <Text style={{ color: '#FFF', fontSize: 16 }}>Vamos começar</Text>
      </TouchableOpacity>
    </View>
  )
}
