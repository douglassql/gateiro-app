import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { usePets } from '../hooks/usePets'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { PetRepository } from '@/database/repositories/PetRepository'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'
import FAB from '@/components/FAB'

export default function PetsListScreen() {
  const { pets, reload } = usePets()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('PetDetail', { id: item.id! })} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="paw-outline" size={18} color={colors.accentPurple} style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 16 }}>{item.name}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditPet', { id: item.id! })}
                style={{ padding: 6, borderWidth: 1, borderRadius: 6, marginRight: 8 }}
              >
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PetDetail', { id: item.id! })}
                style={{ padding: 6, borderWidth: 1, borderRadius: 6, marginRight: 8 }}
              >
                <Text>Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Excluir pet',
                    'Tem certeza que deseja excluir este registro?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Excluir',
                        style: 'destructive',
                        onPress: () => {
                          PetRepository.deleteById(item.id as number)
                          ;(reload as () => void)()
                        }
                      }
                    ]
                  )
                }}
                style={{ padding: 6, borderWidth: 1, borderRadius: 6 }}
              >
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <FAB onPress={() => navigation.navigate('AddPet')} />
    </View>
  )
}
