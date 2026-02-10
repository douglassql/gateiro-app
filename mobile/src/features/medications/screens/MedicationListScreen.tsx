import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useMedications } from "../hooks/useMedications";
import { usePets } from "@/features/pets/hooks/usePets";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { MedicationRepository } from "@/database/repositories/MedicationRepository";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/theme/colors";
import FAB from "@/components/FAB";
import ScreenContainer from "@/components/ScreenContainer";

export default function MedicationListScreen() {
  const { medications, reload } = useMedications();
  const { pets } = usePets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenContainer variant="list">
      <FlatList
        data={medications}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 14,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card,
              marginBottom: 12,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="medkit-outline" size={18} color={colors.accentPurple} style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 16, color: colors.primaryText }} numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
              {item.next_dose_date ? (
                <Text style={{ color: colors.secondaryText, fontSize: 12 }}>
                  {new Date(item.next_dose_date).toLocaleDateString("pt-BR")}
                </Text>
              ) : null}
            </View>

            {(() => {
              const pet = pets.find(p => p.id === item.pet_id);
              return pet ? (
                <Text style={{ color: colors.secondaryText, marginTop: 6 }}>Pet: {pet.name}</Text>
              ) : null;
            })()}

            {item.dosage ? (
              <Text style={{ color: colors.secondaryText, marginTop: 6 }}>Dosagem: {item.dosage}</Text>
            ) : null}

            <View style={{ flexDirection: "row", marginTop: 12 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditMedication", { id: item.id! })}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderRadius: 8,
                  marginRight: 8,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.primaryText }}>Editar</Text>
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
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.primaryText }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <FAB onPress={() => navigation.navigate("AddMedication")} />
    </ScreenContainer>
  );
}
