import { View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native'
import { usePets } from '../hooks/usePets'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { PetRepository } from '@/database/repositories/PetRepository'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'
import FAB from '@/components/FAB'
import ScreenContainer from '@/components/ScreenContainer'
import { useCallback } from 'react'

export default function PetsListScreen() {
  const { pets, reload } = usePets()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useFocusEffect(
    useCallback(() => {
      reload()
    }, [reload])
  )

  return (
    <ScreenContainer variant="list">
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('PetDetail', { id: item.id! })} style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.photo_uri ? (
                <Image
                  source={{ uri: item.photo_uri }}
                  style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
                />
              ) : (
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8
                  }}
                >
                  <Text style={{ color: colors.primaryText }}>{item.name.charAt(0).toUpperCase()}</Text>
                </View>
              )}
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
    </ScreenContainer>
  )
}
