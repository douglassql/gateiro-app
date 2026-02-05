import { View, TextInput, Button, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MedicationRepository } from '@/database/repositories/MedicationRepository'

type RouteParams = {
  id: number
}

export default function EditMedicationScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { id } = (route.params as unknown as RouteParams)

  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [startDate, setStartDate] = useState('')
  const [nextDoseDate, setNextDoseDate] = useState('')
  const [intervalHours, setIntervalHours] = useState('')
  const [petId, setPetId] = useState<number | null>(null)

  useEffect(() => {
    const med = MedicationRepository.findById(id)
    if (med) {
      setName(med.name)
      setDosage(med.dosage ?? '')
      setStartDate(med.start_date)
      setNextDoseDate(med.next_dose_date)
      setIntervalHours(med.interval_hours != null ? String(med.interval_hours) : '')
      setPetId(med.pet_id)
    }
  }, [id])

  function handleSave() {
    if (!petId || !name) return
    MedicationRepository.update({
      id,
      pet_id: petId,
      name,
      dosage: dosage || undefined,
      start_date: startDate,
      next_dose_date: nextDoseDate,
      interval_hours: intervalHours ? Number(intervalHours) : undefined
    })
    navigation.goBack()
  }

  return (
    <View>
      <Text style={{ marginBottom: 8 }}>Editar medicamento</Text>
      <TextInput
        placeholder="Nome"
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
      <TextInput
        placeholder="Data de início (ISO)"
        value={startDate}
        onChangeText={setStartDate}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Próxima dose (ISO)"
        value={nextDoseDate}
        onChangeText={setNextDoseDate}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Intervalo em horas (opcional)"
        value={intervalHours}
        onChangeText={setIntervalHours}
        keyboardType="number-pad"
      />
      <View style={{ height: 12 }} />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  )
}
