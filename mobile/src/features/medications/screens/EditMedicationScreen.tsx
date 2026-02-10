import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MedicationRepository } from '@/database/repositories/MedicationRepository'
import { usePets } from '@/features/pets/hooks/usePets'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import DateField from '@/components/DateField'

type RouteParams = {
  id: number
}

export default function EditMedicationScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { id } = (route.params as unknown as RouteParams)
  const { pets } = usePets()

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
    <ScreenContainer variant="form">
      <Header icon="medkit-outline" title="Editar medicamento" />
      <Text style={[typography.body, { marginBottom: 8 }]}>Selecione o pet:</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => String(item.id)}
        horizontal
        renderItem={({ item }) => {
          const selected = petId === item.id
          return (
            <TouchableOpacity
              onPress={() => setPetId(item.id!)}
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
      <View style={{ height: 12 }} />
      <Button title="Salvar" onPress={handleSave} />
    </ScreenContainer>
  )
}
