import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { VaccineRepository } from '@/database/repositories/VaccineRepository'
import { useNavigation, useRoute } from '@react-navigation/native'
import { usePets } from '@/features/pets/hooks/usePets'
import Ionicons from '@expo/vector-icons/Ionicons'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'

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

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Ionicons name="shield-checkmark-outline" size={20} color={colors.accentPurple} style={{ marginRight: 8 }} />
        <Text style={typography.subtitle}>Editar vacina</Text>
      </View>

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
        placeholder="Nome da vacina"
        value={name}
        onChangeText={setName}
      />

      <View style={{ height: 8 }} />

      <TextInput
        placeholder="Próxima data (ISO opcional)"
        value={nextDate}
        onChangeText={setNextDate}
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
    </View>
  )
}
