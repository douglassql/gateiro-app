import { View, Text, FlatList } from 'react-native'
import { usePets } from '../hooks/usePets'

export default function PetsListScreen() {
  const { pets } = usePets()

  return (
    <View>
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16 }}>🐱 {item.name}</Text>
          </View>
        )}
      />
    </View>
  )
}
