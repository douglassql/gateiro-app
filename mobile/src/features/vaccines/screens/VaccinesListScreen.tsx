import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useVaccines } from '../hooks/useVaccines'
import { usePets } from '@/features/pets/hooks/usePets'
import { useState } from 'react'

export default function VaccinesListScreen() {
  const { vaccines } = useVaccines()
  const { pets } = usePets()
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)

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
        data={
          selectedPetId
            ? vaccines.filter(v => v.pet_id === selectedPetId)
            : vaccines
        }
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16 }}>🛡️ {item.name}</Text>
            {(() => {
              const pet = pets.find(p => p.id === item.pet_id)
              return pet ? <Text style={{ color: '#333' }}>Pet: {pet.name}</Text> : null
            })()}
            {item.next_date ? (
              <Text style={{ color: '#555' }}>Próxima: {item.next_date}</Text>
            ) : null}
            {item.notes ? (
              <Text style={{ color: '#777' }}>{item.notes}</Text>
            ) : null}
          </View>
        )}
      />
    </View>
  )
}
