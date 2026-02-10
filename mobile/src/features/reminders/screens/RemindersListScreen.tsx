import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, RootTabParamList } from '@/navigation/types'
import { useReminders } from '../hooks/useReminders'
import { ReminderRepository } from '@/database/repositories/ReminderRepository'
import { reminderTypeLabels } from '@/database/models/Reminder'
import FAB from '@/components/FAB'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'
import { usePets } from '@/features/pets/hooks/usePets'
import ScreenContainer from '@/components/ScreenContainer'
import { useEffect, useMemo, useState } from 'react'

export default function RemindersListScreen() {
  const { reminders, reload } = useReminders()
  const { pets } = usePets()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<RouteProp<RootTabParamList, 'Reminders'>>()
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)

  useEffect(() => {
    if (route.params?.petId != null) {
      setSelectedPetId(route.params.petId)
    }
  }, [route.params?.petId])

  const filteredReminders = useMemo(() => {
    if (!selectedPetId) return reminders
    return reminders.filter(r => r.pet_id === selectedPetId)
  }, [reminders, selectedPetId])

  return (
    <ScreenContainer variant="list">
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TouchableOpacity
          onPress={() => setSelectedPetId(null)}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: selectedPetId === null ? colors.accentPurple : colors.border,
            marginRight: 6
          }}
        >
          <Text style={{ color: colors.primaryText }}>Todos</Text>
        </TouchableOpacity>
        <FlatList
          data={pets}
          keyExtractor={(item) => String(item.id)}
          horizontal
          renderItem={({ item }) => {
            const selected = selectedPetId === item.id
            return (
              <TouchableOpacity
                onPress={() => setSelectedPetId(item.id as number)}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: selected ? colors.accentPurple : colors.border,
                  marginRight: 6
                }}
              >
                <Text style={{ color: colors.primaryText }}>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={filteredReminders}
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
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}>
                    <Ionicons name="notifications-outline" size={18} color={colors.accentPurple} style={{ marginRight: 8 }} />
                    <Text style={{ fontSize: 16, color: colors.primaryText }} numberOfLines={1}>
                      {item.title || reminderTypeLabels[item.type]}
                    </Text>
                  </View>
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
                      {new Date(item.datetime).toLocaleString('pt-BR')}
                    </Text>
                  </View>
                </View>

                {(() => {
                  const pet = pets.find(p => p.id === item.pet_id)
                  return pet ? (
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
                      <Text style={{ color: colors.secondaryText, fontSize: 12 }}>Pet: {pet.name}</Text>
                    </View>
                  ) : null
                })()}

                <View style={{ flexDirection: 'row', marginTop: 14 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditReminder', { id: item.id! })}
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
                    'Excluir lembrete',
                    'Tem certeza que deseja excluir este registro?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Excluir',
                        style: 'destructive',
                        onPress: () => {
                          ReminderRepository.deleteById(item.id as number)
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
      <FAB onPress={() => navigation.navigate('AddReminder')} />
    </ScreenContainer>
  )
}
