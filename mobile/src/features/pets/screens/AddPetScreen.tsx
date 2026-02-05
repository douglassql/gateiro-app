import { View, TextInput, Button, Text } from 'react-native'
import { useState } from 'react'
import { PetRepository } from '@/database/repositories/PetRepository'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { typography } from '@/theme/typography'
import { colors } from '@/theme/colors'
import ScreenContainer from '@/components/ScreenContainer'
import Header from '@/components/Header'

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
    <ScreenContainer variant="form">
      <Header icon="paw-outline" title="Novo pet" />
      <TextInput
        placeholder="Nome do pet"
        value={name}
        onChangeText={setName}
      />
      <Button title="Salvar" onPress={handleSave} />
    </ScreenContainer>
  )
}
