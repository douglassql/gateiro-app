import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useFoodStock } from '../hooks/useFoodStock'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { FoodStockRepository } from '@/database/repositories/FoodStockRepository'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'
import FAB from '@/components/FAB'
import ScreenContainer from '@/components/ScreenContainer'

export default function FoodStockListScreen() {
  const { items, reload } = useFoodStock()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  function formatDate(d?: string) {
    if (!d) return undefined
    const date = new Date(d)
    return isNaN(date.getTime()) ? d : date.toLocaleDateString('pt-BR')
  }

  return (
    <ScreenContainer variant="list">
      <FlatList
        data={items}
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
                  backgroundColor: colors.accentOrange,
                  marginRight: 10
                }}
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}>
                    <Ionicons
                      name="restaurant-outline"
                      size={18}
                      color={colors.accentOrange}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={{ fontSize: 16, color: colors.primaryText }} numberOfLines={1}>
                      {item.brand}
                    </Text>
                  </View>
                  {item.estimated_end ? (
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
                        Termino: {formatDate(item.estimated_end)}
                      </Text>
                    </View>
                  ) : null}
                </View>

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
                    Quantidade: {item.quantity_current} / {item.quantity_initial ?? '-'}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 14 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EditFoodStock', { id: item.id! })}
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
                    onPress={() => {
                      Alert.alert(
                        'Excluir estoque',
                        'Tem certeza que deseja excluir este registro?',
                        [
                          { text: 'Cancelar', style: 'cancel' },
                          {
                            text: 'Excluir',
                            style: 'destructive',
                            onPress: () => {
                              FoodStockRepository.deleteById(item.id as number)
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
      <FAB onPress={() => navigation.navigate('AddFoodStock')} />
    </ScreenContainer>
  )
}
