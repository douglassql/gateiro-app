import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useVaccines } from '../hooks/useVaccines'
import { usePets } from '@/features/pets/hooks/usePets'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { VaccineRepository } from '@/database/repositories/VaccineRepository'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'
import FAB from '@/components/FAB'
import ScreenContainer from '@/components/ScreenContainer'

type NavigationProps =
  NativeStackNavigationProp<RootStackParamList>

export default function VaccinesListScreen() {
  const { vaccines, reload } = useVaccines()
  const { pets } = usePets()
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const navigation = useNavigation<NavigationProps>()

  function parseDateSafe(d?: string) {
    if (!d) return null
    const date = new Date(d)
    return isNaN(date.getTime()) ? null : date
  }

  function formatDate(d?: string) {
    const date = parseDateSafe(d)
    return date ? date.toLocaleDateString('pt-BR') : d
  }

  return (
    <ScreenContainer variant="list">
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        horizontal
        renderItem={({ item }) => {
          const selected = selectedPetId === item.id
          return (
            <TouchableOpacity
              onPress={() =>
                setSelectedPetId(selected ? null : (item.id as number))
              }
              style={{
                padding: 8,
                marginRight: 8,
                borderWidth: 1,
                borderColor: selected ? '#007AFF' : '#ccc',
                borderRadius: 6
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
        style={{ marginBottom: 12 }}
              return pet ? (
                <View
                  style={{
                    marginTop: 8,
                    alignSelf: 'flex-start',
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderRadius: 12,
                    backgroundColor: '#FFF',
                    borderWidth: 1,
                    borderColor: colors.border
                  }}
                >
                  <Text style={{ color: colors.secondaryText, fontSize: 12 }}>Pet: {pet.name}</Text>
                </View>
              ) : null
        data={(selectedPetId
          ? vaccines.filter(v => v.pet_id === selectedPetId)
          : vaccines
              <Text style={{ color: colors.secondaryText, marginTop: 10 }} numberOfLines={2}>
          .slice()
          .sort((a, b) => {
            const ad = parseDateSafe(a.next_date)
            const bd = parseDateSafe(b.next_date)
            <View style={{ flexDirection: 'row', marginTop: 14 }}>
              const diff = ad.getTime() - bd.getTime()
              if (diff !== 0) return diff
              return a.name.localeCompare(b.name)
            }
            if (ad && !bd) return -1
            if (!ad && bd) return 1
            return a.name.localeCompare(b.name)
          })}
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="shield-checkmark-outline" size={18} color={colors.accentPurple} style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 16, color: colors.primaryText }} numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
              {item.next_date ? (
                <Text style={{ color: colors.secondaryText, fontSize: 12 }}>{formatDate(item.next_date)}</Text>
              ) : null}
            </View>

            {(() => {
              const pet = pets.find(p => p.id === item.pet_id)
              return pet ? (
                <Text style={{ color: colors.secondaryText, marginTop: 6 }}>Pet: {pet.name}</Text>
              ) : null
            })()}

            {item.notes ? (
              <Text style={{ color: colors.secondaryText, marginTop: 6 }} numberOfLines={2}>
                Notas: {item.notes}
              </Text>
            ) : null}

            <View style={{ flexDirection: 'row', marginTop: 12 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditVaccine', { id: item.id! })}
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
                    'Excluir vacina',
                    'Tem certeza que deseja excluir este registro?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Excluir',
                        style: 'destructive',
                        onPress: () => {
                          VaccineRepository.deleteById(item.id as number)
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
        )}
      />
      <FAB onPress={() => navigation.navigate('AddVaccine')} />
    </ScreenContainer>
  )
}
