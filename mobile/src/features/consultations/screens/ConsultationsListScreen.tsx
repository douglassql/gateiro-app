import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useConsultations } from '../hooks/useConsultations'
import { usePets } from '@/features/pets/hooks/usePets'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { ConsultationRepository } from '@/database/repositories/ConsultationRepository'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '@/theme/colors'
import FAB from '@/components/FAB'
import ScreenContainer from '@/components/ScreenContainer'

export default function ConsultationsListScreen() {
  const { consultations, reload } = useConsultations()
  const { pets } = usePets()
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

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
        horizontal
        renderItem={({ item }) => {
          const selected = selectedPetId === item.id
          return (
            <TouchableOpacity
              onPress={() => setSelectedPetId(selected ? null : (item.id as number))}
              style={{
                padding: 8,
                marginRight: 8,
                borderWidth: 1,
                borderColor: selected ? colors.accentPurple : colors.border,
                borderRadius: 6
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
        style={{ marginBottom: 12 }}
      />

      <FlatList
        data={selectedPetId ? consultations.filter(c => c.pet_id === selectedPetId) : consultations}
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
                <Ionicons name="calendar-outline" size={18} color={colors.accentPurple} style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 16, color: colors.primaryText }} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
              <Text style={{ color: colors.secondaryText, fontSize: 12 }}>{formatDate(item.date)}</Text>
            </View>

            {(() => {
              const pet = pets.find(p => p.id === item.pet_id)
              return pet ? (
                <Text style={{ color: colors.secondaryText, marginTop: 6 }}>
                  Pet: {pet.name}
                </Text>
              ) : null
            })()}

            {item.notes ? (
              <Text style={{ color: colors.secondaryText, marginTop: 6 }} numberOfLines={2}>
                Notas: {item.notes}
              </Text>
            ) : null}

            <View style={{ flexDirection: 'row', marginTop: 12 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditConsultation', { id: item.id! })}
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
                    'Excluir consulta',
                    'Tem certeza que deseja excluir este registro?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Excluir',
                        style: 'destructive',
                        onPress: () => {
                          ConsultationRepository.deleteById(item.id as number)
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
      <FAB onPress={() => navigation.navigate('AddConsultation')} />
    </ScreenContainer>
  )
}
