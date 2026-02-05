import { View, Text, FlatList } from 'react-native'
import { useVaccines } from '../hooks/useVaccines'

export default function VaccinesListScreen() {
  const { vaccines } = useVaccines()

  return (
    <View>
      <FlatList
        data={vaccines}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16 }}>🛡️ {item.name}</Text>
          </View>
        )}
      />
    </View>
  )
}
