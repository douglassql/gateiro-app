import { View, Text, FlatList } from 'react-native'
import { useVaccines } from '../hooks/useVaccines'
import { usePets } from '@/features/pets/hooks/usePets'

export default function VaccinesListScreen() {
  const { vaccines } = useVaccines()
  const { pets } = usePets()

  return (
    <View>
      <FlatList
        data={vaccines}
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
