import { View, TextInput, Button, Text } from 'react-native'
import { useState } from 'react'
import { createMedication } from '../services/MedicationService'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'

export default function AddMedicationScreen() {
  const [name, setName] = useState('')
  const navigation = useNavigation()

  async function handleSave() {
    await createMedication({
      pet_id: 1,
      name,
      start_date: new Date().toISOString(),
      next_dose_date: new Date().toISOString()
    })

    navigation.goBack()
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Ionicons name="medkit-outline" size={20} color={colors.accentPurple} style={{ marginRight: 8 }} />
        <Text style={typography.subtitle}>Novo medicamento</Text>
      </View>
      <TextInput
        placeholder="Nome do medicamento"
        value={name}
        onChangeText={setName}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  )
}
