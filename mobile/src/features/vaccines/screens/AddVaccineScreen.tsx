import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { VaccineRepository } from '@/database/repositories/VaccineRepository'
import { useNavigation } from '@react-navigation/native'
import { usePets } from '@/features/pets/hooks/usePets'
import Ionicons from '@expo/vector-icons/Ionicons'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'

export default function AddVaccineScreen() {
  const [name, setName] = useState('')
  const [nextDate, setNextDate] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const navigation = useNavigation()
  const { pets } = usePets()

  function handleSave() {
    if (!selectedPetId || !name) return

    VaccineRepository.create({
      pet_id: selectedPetId,
      name,
      date: new Date().toISOString(),
      next_date: nextDate || undefined,
      notes: notes || undefined
    })
    navigation.goBack()
  }

  return (
    <ScreenContainer variant="form">
      <Header icon="shield-checkmark-outline" title="Nova vacina" />

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
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => setNextDate(new Date().toISOString())}
          style={{ padding: 8, borderWidth: 1, borderRadius: 6, marginRight: 8 }}
        >
          <Text>Hoje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const d = new Date()
            d.setDate(d.getDate() + 1)
            setNextDate(d.toISOString())
          }}
          style={{ padding: 8, borderWidth: 1, borderRadius: 6, marginRight: 8 }}
        >
          <Text>Amanhã</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const d = new Date()
            d.setDate(d.getDate() + 30)
            setNextDate(d.toISOString())
          }}
          style={{ padding: 8, borderWidth: 1, borderRadius: 6 }}
        >
          <Text>+30 dias</Text>
        </TouchableOpacity>
      </View>

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
