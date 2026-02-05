import { View, TextInput, Button, Text } from 'react-native'
import { useState } from 'react'
import { createMedication } from '../services/MedicationService'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'

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
    <ScreenContainer variant="form">
      <Header icon="medkit-outline" title="Novo medicamento" />
      <TextInput
        placeholder="Nome do medicamento"
        value={name}
        onChangeText={setName}
      />
      <Button title="Salvar" onPress={handleSave} />
    </ScreenContainer>
  )
}
