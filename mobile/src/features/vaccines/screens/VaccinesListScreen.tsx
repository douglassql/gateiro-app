import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useVaccines } from '../hooks/useVaccines'
import { usePets } from '@/features/pets/hooks/usePets'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { VaccineRepository } from '@/database/repositories/VaccineRepository'

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
    <View>
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
      />

      <FlatList
        data={(selectedPetId
          ? vaccines.filter(v => v.pet_id === selectedPetId)
          : vaccines
        )
          .slice()
          .sort((a, b) => {
            const ad = parseDateSafe(a.next_date)
            const bd = parseDateSafe(b.next_date)
            if (ad && bd) {
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
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16 }}>🛡️ {item.name}</Text>
            {(() => {
              const pet = pets.find(p => p.id === item.pet_id)
              return pet ? <Text style={{ color: '#333' }}>Pet: {pet.name}</Text> : null
            })()}
            {item.next_date ? (
              <Text style={{ color: '#555' }}>Próxima: {formatDate(item.next_date)}</Text>
            ) : null}
            {item.notes ? (
              <Text style={{ color: '#777' }}>Notas: {item.notes}</Text>
            ) : null}
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditVaccine', { id: item.id! })}
                style={{ padding: 6, borderWidth: 1, borderRadius: 6, marginRight: 8 }}
              >
                <Text>Editar</Text>
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
                style={{ padding: 6, borderWidth: 1, borderRadius: 6 }}
              >
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}
