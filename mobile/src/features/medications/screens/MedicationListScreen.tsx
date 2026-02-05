import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useMedications } from "../hooks/useMedications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { MedicationRepository } from "@/database/repositories/MedicationRepository";

export default function MedicationListScreen() {
  const { medications, reload } = useMedications();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditMedication", { id: item.id! })}
                style={{ padding: 6, borderWidth: 1, borderRadius: 6, marginRight: 8 }}
              >
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Excluir medicamento",
                    "Tem certeza que deseja excluir este registro?",
                    [
                      { text: "Cancelar", style: "cancel" },
                      {
                        text: "Excluir",
                        style: "destructive",
                        onPress: () => {
                          MedicationRepository.deleteById(item.id as number);
                          (reload as () => void)();
                        },
                      },
                    ]
                  );
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
  );
}
