import { View, TextInput, Button, Text } from 'react-native'
import { useState } from 'react'
import { PetRepository } from '@/database/repositories/PetRepository'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'

export default function AddPetScreen() {
  const [name, setName] = useState('')
  const navigation = useNavigation()

  function handleSave() {
    PetRepository.create({
      name,
      birth_date: new Date().toISOString()
    })
    navigation.goBack()
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Ionicons name="paw-outline" size={20} color={colors.accentPurple} style={{ marginRight: 8 }} />
        <Text style={typography.subtitle}>Novo pet</Text>
      </View>
      <TextInput
        placeholder="Nome do pet"
        value={name}
        onChangeText={setName}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  )
}
