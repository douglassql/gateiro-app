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
import Chip from '@/components/Chip'

export default function PetsListScreen() {
  const { pets, reload } = usePets()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useFocusEffect(
    useCallback(() => {
      reload()
    }, [reload])
  )

  function formatDate(d?: string) {
    if (!d) return undefined
    const date = new Date(d)
    return isNaN(date.getTime()) ? d : date.toLocaleDateString('pt-BR')
  }

  return (
    <ScreenContainer variant="list">
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 14,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card,
              marginBottom: 12
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: 4,
                  borderRadius: 4,
                  backgroundColor: colors.accentPurple,
                  marginRight: 10
                }}
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PetDetail', { id: item.id! })}
                    style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}
                  >
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
                        <Ionicons name="paw-outline" size={16} color={colors.primaryText} />
                      </View>
                    )}
                    <Text style={{ fontSize: 16, color: colors.primaryText }} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  {item.birth_date ? (
                    <View
                      style={{
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        borderRadius: 12,
                        backgroundColor: '#FFF',
                        borderWidth: 1,
                        borderColor: colors.border
                      }}
                    >
                      <Text style={{ color: colors.secondaryText, fontSize: 12 }}>
                        Nascimento: {formatDate(item.birth_date)}
                      </Text>
                    </View>
                  ) : null}
                </View>

                {item.weight !== undefined && item.weight !== null ? (
                  <View
                    style={{
                      marginTop: 10,
                      alignSelf: 'flex-start',
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 12,
                      backgroundColor: '#FFF',
                      borderWidth: 1,
                      borderColor: colors.border
                    }}
                  >
                    <Text style={{ color: colors.secondaryText, fontSize: 12 }}>
                      Peso: {item.weight} kg
                    </Text>
                  </View>
                ) : null}

                {item.traits ? (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                    {item.traits
                      .split(/[,;]+/)
                      .map(t => t.trim())
                      .filter(Boolean)
                      .map((trait, index) => (
                        <Chip key={`${trait}-${index}`} label={trait} />
                      ))}
                  </View>
                ) : null}

                <View style={{ flexDirection: 'row', marginTop: 14 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EditPet', { id: item.id! })}
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderWidth: 1,
                      borderRadius: 8,
                      marginRight: 8,
                      borderColor: colors.border
                    }}
                  >
                    <Text style={{ color: colors.primaryText }}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PetDetail', { id: item.id! })}
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderWidth: 1,
                      borderRadius: 8,
                      marginRight: 8,
                      borderColor: colors.border
                    }}
                  >
                    <Text style={{ color: colors.primaryText }}>Perfil</Text>
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
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: colors.border
                    }}
                  >
                    <Text style={{ color: colors.primaryText }}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <FAB onPress={() => navigation.navigate('AddPet')} />
    </ScreenContainer>
  )
}
