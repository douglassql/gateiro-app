import { View, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { createMedication } from '../services/MedicationService'

export default function AddMedicationScreen() {
  const [name, setName] = useState('')

  async function handleSave() {
    await createMedication({
      pet_id: 1,
      name,
      start_date: new Date().toISOString(),
      next_dose_date: new Date().toISOString()
    })
  }

  return (
    <View>
      <TextInput
        placeholder="Nome do medicamento"
        value={name}
        onChangeText={setName}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  )
}
