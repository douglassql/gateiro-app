import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { createMedication } from '../services/MedicationService'
import { useNavigation } from '@react-navigation/native'
import { usePets } from '@/features/pets/hooks/usePets'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import DateField from '@/components/DateField'

export default function AddMedicationScreen() {
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [startDate, setStartDate] = useState('')
  const [nextDoseDate, setNextDoseDate] = useState('')
  const [intervalHours, setIntervalHours] = useState('')
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const { pets } = usePets()
  const navigation = useNavigation()

  async function handleSave() {
    if (!selectedPetId || !name || !startDate || !nextDoseDate) return
    await createMedication({
      pet_id: selectedPetId,
      name,
      dosage: dosage || undefined,
      start_date: startDate,
      next_dose_date: nextDoseDate,
      interval_hours: intervalHours ? Number(intervalHours) : undefined
    })

    navigation.goBack()
  }

  return (
    <ScreenContainer variant="form">
      <Header icon="medkit-outline" title="Novo medicamento" />
      <Text style={[typography.body, { marginBottom: 8 }]}>Selecione o pet:</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        horizontal
        renderItem={({ item }) => {
          const selected = selectedPetId === item.id
          return (
            <TouchableOpacity
              onPress={() => setSelectedPetId(item.id!)}
              style={{
                padding: 8,
                marginRight: 8,
                borderWidth: 1,
                borderColor: selected ? colors.accentPurple : colors.border,
                borderRadius: 6
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
      />

      <View style={{ height: 12 }} />
      <TextInput
        placeholder="Nome do medicamento"
        value={name}
        onChangeText={setName}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Dosagem (opcional)"
        value={dosage}
        onChangeText={setDosage}
      />
      <View style={{ height: 8 }} />
      <DateField
        label="Data de inicio"
        value={startDate}
        onChange={setStartDate}
      />
      <View style={{ height: 8 }} />
      <DateField
        label="Proxima dose"
        value={nextDoseDate}
        onChange={setNextDoseDate}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Intervalo em horas (opcional)"
        value={intervalHours}
        onChangeText={setIntervalHours}
        keyboardType="number-pad"
      />
      <Button title="Salvar" onPress={handleSave} />
    </ScreenContainer>
  )
}
