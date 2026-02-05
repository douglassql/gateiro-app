import { View, Text, FlatList } from "react-native";
import { useMedications } from "../hooks/useMedications";

export default function MedicationListScreen() {
  const { medications } = useMedications();

  return (
    <View>
      <FlatList
        data={medications}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontSize: 16 }}>💊 {item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
