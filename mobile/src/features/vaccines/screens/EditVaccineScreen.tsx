import { View, TextInput, Text, FlatList, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { VaccineRepository } from '@/database/repositories/VaccineRepository'
import { useNavigation, useRoute } from '@react-navigation/native'
import { usePets } from '@/features/pets/hooks/usePets'
import Ionicons from '@expo/vector-icons/Ionicons'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import DateField from '@/components/DateField'

type RouteParams = {
  id: number
}

export default function EditVaccineScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { pets } = usePets()

  const { id } = (route.params as unknown as RouteParams)

  const [name, setName] = useState('')
  const [nextDate, setNextDate] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)

  useEffect(() => {
    const vac = VaccineRepository.findById(id)
    if (vac) {
      setName(vac.name)
      setNextDate(vac.next_date ?? '')
      setNotes(vac.notes ?? '')
      setSelectedPetId(vac.pet_id)
    }
  }, [id])

  function handleSave() {
    if (!selectedPetId || !name) return
    VaccineRepository.update({
      id,
      pet_id: selectedPetId,
      name,
      date: new Date().toISOString(),
      next_date: nextDate || undefined,
      notes: notes || undefined
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
      <Header icon="shield-checkmark-outline" title="Editar vacina" />

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
        placeholder="Nome da vacina"
        placeholderTextColor={colors.secondaryText}
        value={name}
        onChangeText={setName}
        style={inputStyle}
      />

      <View style={{ height: 8 }} />

      <DateField
        label="Proxima data (opcional)"
        value={nextDate}
        onChange={setNextDate}
      />

      <View style={{ height: 8 }} />

      <TextInput
        placeholder="Notas (opcional)"
        placeholderTextColor={colors.secondaryText}
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
        style={[inputStyle, { minHeight: 90 }]}
      />

      <View style={{ height: 12 }} />

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
