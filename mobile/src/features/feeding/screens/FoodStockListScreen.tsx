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
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="restaurant-outline" size={18} color={colors.accentOrange} style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 16, flexShrink: 1 }} numberOfLines={1}>
                {item.brand}
              </Text>
            </View>
            <Text style={{ color: colors.secondaryText }}>
              Quantidade: {item.quantity_current} / {item.quantity_initial ?? '-'}
            </Text>
            {item.estimated_end ? (
              <Text style={{ color: colors.secondaryText }}>Termino: {formatDate(item.estimated_end)}</Text>
            ) : null}
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditFoodStock', { id: item.id! })}
                style={{ padding: 6, borderWidth: 1, borderRadius: 6, marginRight: 8 }}
              >
                <Text>Editar</Text>
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
                style={{ padding: 6, borderWidth: 1, borderRadius: 6 }}
              >
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <FAB onPress={() => navigation.navigate('AddFoodStock')} />
    </ScreenContainer>
  )
}
