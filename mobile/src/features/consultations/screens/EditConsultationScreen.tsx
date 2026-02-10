import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { ConsultationRepository } from '@/database/repositories/ConsultationRepository'
import { useNavigation, useRoute } from '@react-navigation/native'
import { usePets } from '@/features/pets/hooks/usePets'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'

type RouteParams = {
  id: number
}

export default function EditConsultationScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { pets } = usePets()
  const { id } = (route.params as unknown as RouteParams)

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)

  useEffect(() => {
    const item = ConsultationRepository.findById(id)
    if (item) {
      setSelectedPetId(item.pet_id)
      setTitle(item.title)
      setDate(item.date)
      setNotes(item.notes ?? '')
    }
  }, [id])

  function handleSave() {
    if (!selectedPetId || !title || !date) return

    ConsultationRepository.update({
      id,
      pet_id: selectedPetId,
      title,
      date,
      notes: notes || undefined
    })
    navigation.goBack()
  }

  return (
    <ScreenContainer variant="form">
      <Header icon="calendar-outline" title="Editar consulta" />

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

      <TextInput
        placeholder="Data (ISO)"
        value={date}
        onChangeText={setDate}
        autoCapitalize="none"
        autoCorrect={false}
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
