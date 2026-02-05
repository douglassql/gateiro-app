import { View, Text, FlatList } from 'react-native'
import { useMedications } from '../hooks/useMedications'

export default function MedicationListScreen() {
  const { medications } = useMedications()

  return (
    <View>
      <FlatList
        data={medications}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  )
}
