import { View, TextInput, Text, FlatList, TouchableOpacity } from 'react-native'
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

  const chipStyle = {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 120,
    alignSelf: 'flex-start',
    overflow: 'hidden'
  } as const

  const chipTextStyle = {
    color: colors.primaryText,
    includeFontPadding: false,
    lineHeight: 18,
    flexShrink: 1,
    maxWidth: '100%'
  } as const

  const inputStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    color: colors.primaryText
  } as const

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
              style={[chipStyle, selected ? { borderColor: colors.accentPurple } : null]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={chipTextStyle}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        }}
      />

      <View style={{ height: 12 }} />
      <TextInput
        placeholder="Nome do medicamento"
        placeholderTextColor={colors.secondaryText}
        value={name}
        onChangeText={setName}
        style={inputStyle}
      />
      <View style={{ height: 8 }} />
      <TextInput
        placeholder="Dosagem (opcional)"
        placeholderTextColor={colors.secondaryText}
        value={dosage}
        onChangeText={setDosage}
        style={inputStyle}
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
        placeholderTextColor={colors.secondaryText}
        value={intervalHours}
        onChangeText={setIntervalHours}
        keyboardType="number-pad"
        style={inputStyle}
      />
      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: colors.primaryText,
          paddingVertical: 12,
          borderRadius: 10,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#FFF', fontSize: 16 }}>Salvar</Text>
      </TouchableOpacity>
    </ScreenContainer>
  )
}
