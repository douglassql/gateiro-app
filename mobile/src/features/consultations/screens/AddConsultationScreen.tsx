import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { ConsultationRepository } from '@/database/repositories/ConsultationRepository'
import { useNavigation } from '@react-navigation/native'
import { usePets } from '@/features/pets/hooks/usePets'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'
import DateField from '@/components/DateField'

export default function AddConsultationScreen() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const navigation = useNavigation()
  const { pets } = usePets()

  function handleSave() {
    if (!selectedPetId || !title || !date) return

    ConsultationRepository.create({
      pet_id: selectedPetId,
      title,
      date,
      notes: notes || undefined
    })
    navigation.goBack()
  }

  return (
    <ScreenContainer variant="form">
      <Header icon="calendar-outline" title="Nova consulta" />

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
        placeholder="Titulo da consulta"
        value={title}
        onChangeText={setTitle}
      />

      <View style={{ height: 8 }} />

      <DateField
        label="Data"
        value={date}
        onChange={setDate}
      />

      <View style={{ height: 8 }} />

      <TextInput
        placeholder="Notas (opcional)"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      <View style={{ height: 12 }} />
      <Button title="Salvar" onPress={handleSave} />
    </ScreenContainer>
  )
}
